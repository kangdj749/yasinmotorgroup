import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        mt-14
        border-t border-border
        bg-muted/40
      "
    >
      <div
        className="
          max-w-[1020px] mx-auto
          px-3 sm:px-5
          py-8 sm:py-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {/* BRAND */}
          <div className="space-y-2">
            <h3
              className="
                text-sm
                font-semibold
                text-primary
                tracking-tight
              "
            >
              Yasin Motor Group
            </h3>

            <p
              className="
                text-[12px]
                text-muted-foreground
                leading-snug
                max-w-xs
              "
            >
              Platform listing mobil bekas terpercaya.
              DP ringan • Angsuran fleksibel • Proses cepat.
            </p>
          </div>

          {/* KONTAK */}
          <div className="space-y-2">
            <h4
              className="
                text-xs
                font-semibold
                tracking-tight
              "
            >
              Kontak
            </h4>

            <ul className="space-y-1.5 text-[12px]">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>0823-7929-6878</span>
              </li>

              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>admin@yasinmotorgroup.com</span>
              </li>

              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Bandung, Jawa Barat</span>
              </li>
            </ul>
          </div>

          {/* SOSIAL */}
          <div className="space-y-2">
            <h4
              className="
                text-xs
                font-semibold
                tracking-tight
              "
            >
              Ikuti Kami
            </h4>

            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2
                  rounded-md
                  border border-border
                  text-muted-foreground
                  hover:text-primary
                  hover:border-primary/40
                  transition
                "
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2
                  rounded-md
                  border border-border
                  text-muted-foreground
                  hover:text-primary
                  hover:border-primary/40
                  transition
                "
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="
            mt-8
            pt-4
            border-t border-border
            text-center
          "
        >
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} YasinMotorGroup.com — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}