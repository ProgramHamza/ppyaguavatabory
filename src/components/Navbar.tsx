import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, SunMedium, X } from "lucide-react";

const links = [
  { href: "#program", label: "Program" },
  { href: "#dennyplan", label: "Denný plán" },
  { href: "#terminy", label: "Termíny" },
  { href: "#prihlaska", label: "Prihláška" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("bc-theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("bc-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-primary text-primary-foreground text-[11px] tracking-[0.35em] uppercase py-2">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <span>Business Camp · Bratislava 2026</span>
          <span className="stamp px-4 py-1 text-[10px]">Limit 28 miest / turnus</span>
        </div>
      </div>
      <nav className="border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-white shadow-[0_12px_35px_rgba(10,23,50,0.08)]">
              <span className="font-display text-base text-primary">BC</span>
            </div>
            <div>
              <a href="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
                BusinessCamp
              </a>
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">11 – 15 · denné turnusy</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative pb-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-foreground transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-border/80 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Biznis tábor</span>
            <Button variant="hero" size="lg" className="rounded-full px-6">
              Rezervovať
            </Button>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden rounded-full border border-border/70 p-2 text-foreground"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background/95 lg:hidden">
            <div className="container space-y-4 py-6">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-muted-foreground">
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="w-full rounded-full border border-border/70 px-4 py-2 text-sm uppercase tracking-[0.35em] text-muted-foreground"
              >
                Prepnuť {theme === "dark" ? "svetlo" : "tmavo"}
              </button>
              <Button variant="hero" size="lg" className="w-full rounded-full">
                Rezervovať termín
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
