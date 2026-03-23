import { useEffect, useState } from "react";
import { Menu, Moon, SunMedium, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

const links = [
  { href: "#program", label: "Program" },
  { href: "#partneri", label: "Partneri" },
  { href: "#o-nas", label: "O nás" },
  { href: "#kontakt", label: "Kontakt" },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-foreground shadow-[0_10px_30px_rgba(245,166,35,0.08)] backdrop-blur-xl transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
      aria-label={isDark ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim"}
    >
      <SunMedium
        className={`absolute h-4 w-4 transition-all duration-200 ${isDark ? "scale-0 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-200 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0"}`}
      />
    </button>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-lg tracking-tight text-foreground">
            <BrandMark className="h-9 w-9" letterClassName="text-xl" />
            <span className="leading-none">
              <span className="block font-medium">Future</span>
              <span className="block font-bold">Founders Mini</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              to="/prihlaska"
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Prihlásiť dieťa
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-lg p-2 text-foreground/80 transition hover:bg-primary/10"
              aria-label="Prepnúť navigáciu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border/80 bg-background/95 backdrop-blur-xl lg:hidden">
            <div className="container space-y-3 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-foreground/70 transition hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/prihlaska"
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Prihlásiť dieťa
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
