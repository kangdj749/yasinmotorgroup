import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-3">
            Yasin Motor Group
          </h3>
          <p className="text-sm text-muted-foreground">
            Platform listing mobil bekas terpercaya.  
            DP ringan • Angsuran fleksibel • Proses cepat.
          </p>
        </div>

        {/* KONTAK */}
        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span>0812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span>admin@mobilbekas.id</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> <span>Bandung, Jawa Barat</span>
            </li>
          </ul>
        </div>

        {/* SOSIAL */}
        <div>
          <h4 className="font-semibold mb-3">Ikuti Kami</h4>
          <div className="flex gap-4">
            <a href="#" target="_blank">
              <Instagram size={20} />
            </a>
            <a href="#" target="_blank">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-10">
        © {new Date().getFullYear()} MobilBekas.id — All rights reserved.
      </p>
    </footer>
  );
}
