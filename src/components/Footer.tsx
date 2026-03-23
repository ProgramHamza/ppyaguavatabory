import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/80 py-12">
      <div className="container grid gap-8 md:grid-cols-3 md:items-center">
        <div className="text-left">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10" letterClassName="text-xl" />
            <p className="text-lg font-semibold text-foreground">Future Founders Mini</p>
          </div>
          <p className="mt-2 text-sm text-foreground/65">Letný denný tábor · Bratislava · 2026</p>
        </div>

        <nav className="flex flex-wrap items-center justify-start gap-4 text-sm text-foreground/70 md:justify-center">
          <a href="#program" className="transition hover:text-foreground">
            Program
          </a>
          <a href="#partneri" className="transition hover:text-foreground">
            Partneri
          </a>
          <a href="#o-nas" className="transition hover:text-foreground">
            O nás
          </a>
          <a href="#kontakt" className="transition hover:text-foreground">
            Kontakt
          </a>
          <Link to="/prihlaska" className="transition hover:text-foreground">
            Prihláška
          </Link>
        </nav>

        <div className="text-left text-sm text-foreground/55 md:text-right">
          © 2026 Future Founders Mini. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
