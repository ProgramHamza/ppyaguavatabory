import { useState } from "react";
import { Menu, X } from "lucide-react";
import ReservationModal from "./ReservationModal";

const links = [
  { href: "#program", label: "Program" },
  { href: "#dennyplan", label: "Denný plán" },
  { href: "#terminy", label: "Termíny" },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight text-white">
              BusinessCamp
            </a>

            <div className="hidden items-center gap-8 text-sm lg:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={() => setShowReservation(true)}
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Rezervovať miesto
              </button>
            </div>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 lg:hidden"
              aria-label="Prepnúť navigáciu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <div className="border-t border-white/[0.06] bg-black/90 backdrop-blur-xl lg:hidden">
              <div className="container space-y-3 py-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-white/60 transition hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowReservation(true);
                  }}
                  className="w-full rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Rezervovať miesto
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <ReservationModal open={showReservation} onClose={() => setShowReservation(false)} />
    </>
  );
};

export default Navbar;
