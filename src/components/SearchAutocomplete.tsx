"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTrendingKeywords,
  saveSearchKeyword,
} from "@/lib/search/trending";

/* ================= TYPES ================= */
type CarLite = {
  id: string;
  title: string;
};

type Props = {
  cars: CarLite[];
};

/* ================= HELPERS ================= */
function extractKeywords(cars: CarLite[]): string[] {
  const set = new Set<string>();

  cars.forEach((c) => {
    const words = c.title.split(" ");

    // ambil kata ke-2 (model umum)
    if (words[1]) set.add(words[1]);

    // ambil 2 kata pertama (lebih spesifik)
    if (words[0] && words[1]) {
      set.add(`${words[0]} ${words[1]}`);
    }
  });

  return Array.from(set);
}



function highlight(text: string, query: string) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text;

  return (
    <>
      {text.slice(0, i)}
      <span className="font-semibold text-primary">
        {text.slice(i, i + query.length)}
      </span>
      {text.slice(i + query.length)}
    </>
  );
}

/* ================= COMPONENT ================= */
export default function SearchAutocomplete({ cars }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const [trending, setTrending] = useState<string[]>([]);  

  /* ================= KEYWORDS ================= */
  const keywords = useMemo(() => extractKeywords(cars), [cars]);

  /* ================= DEBOUNCE ================= */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(query);
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setTrending(getTrendingKeywords(5));
    }, []);

  /* ================= FILTER ================= */
  const suggestions = useMemo(() => {
    if (!debounced) return [];

    const q = debounced.toLowerCase();

    return keywords
      .filter((k) => k.toLowerCase().includes(q))
      .slice(0, 6); // max 6
  }, [debounced, keywords]);

  const popularKeywords = useMemo(() => {
    const freq: Record<string, number> = {};

    keywords.forEach((k) => {
        const key = k.toLowerCase();
        freq[key] = (freq[key] || 0) + 1;
    });

    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k]) => k);
    }, [keywords]);

  /* ================= NAVIGATE ================= */
  function goSearch(value: string) {
    if (!value) return;

    saveSearchKeyword(value); // ✅ simpan trending

    router.push(`/mobil/search?query=${encodeURIComponent(value)}&page=1`);
    setOpen(false);
    setActiveIndex(-1);
    }

  /* ================= KEYBOARD ================= */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0) {
        goSearch(suggestions[activeIndex]);
      } else {
        goSearch(query);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!inputRef.current) return;

      if (!inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* ================= RENDER ================= */
  return (
    <div className="relative">
      {/* INPUT */}
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Cari Avanza, Brio, HR-V..."
        className="
          w-full
          px-4 py-3
          rounded-2xl
          border border-border
          bg-background
          text-sm
          outline-none
          focus:ring-2 focus:ring-primary/20
          transition
        "
      />

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-card border border-border rounded-2xl shadow-lg overflow-hidden">

            {/* ================= EMPTY STATE ================= */}
            {!query && (
            <div className="p-4 space-y-4">

                {/* TRENDING */}
                {trending.length > 0 && (
                <div>
                    <p className="text-xs text-muted-foreground mb-2">
                    🔥 Sedang Dicari
                    </p>

                    <div className="flex flex-wrap gap-2">
                    {trending.map((item) => (
                        <button
                        key={item}
                        onClick={() => goSearch(item)}
                        className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary/10 transition"
                        >
                        {item}
                        </button>
                    ))}
                    </div>
                </div>
                )}

                {/* POPULAR */}
                <div>
                <p className="text-xs text-muted-foreground mb-2">
                    ⭐ Populer
                </p>

                <div className="flex flex-wrap gap-2">
                    {popularKeywords.map((item) => (
                    <button
                        key={item}
                        onClick={() => goSearch(item)}
                        className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary/10 transition"
                    >
                        {item}
                    </button>
                    ))}
                </div>
                </div>
            </div>
            )}

            {/* ================= SUGGESTION ================= */}
            {query && suggestions.map((item, i) => (
            <button
                key={item}
                onClick={() => goSearch(item)}
                className={`
                w-full text-left px-4 py-3 text-sm flex items-center gap-2
                ${i === activeIndex ? "bg-primary/10" : "hover:bg-muted"}
                `}
            >
                🔍 {highlight(item, query)}
            </button>
            ))}

            {/* ================= FULL SEARCH ================= */}
            {query && (
            <button
                onClick={() => goSearch(query)}
                className="w-full text-left px-4 py-3 text-sm border-t font-semibold text-primary hover:bg-muted"
            >
                Cari "{query}"
            </button>
            )}
        </div>
        )}
      
      
    </div>
  );
}