import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

const ReservationModal = ({ open, onClose }: ReservationModalProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const mailtoLink = `mailto:mimoriadni@gmail.com?subject=${encodeURIComponent("Predbežná rezervácia - Future Foudners Mini")}&body=${encodeURIComponent(`Dobrý deň,\n\nmám záujem o predbežnú rezerváciu miesta v tábore Future Foudners Mini pre dieťa vo veku 8–14 rokov.\n\nMôj e-mail: ${email}\n\nĎakujem.`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative z-10 w-full max-w-md rounded-2xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-foreground/60 transition hover:bg-primary/10 hover:text-foreground"
              aria-label="Zatvoriť"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Ďakujeme!</h3>
                <p className="mt-2 text-sm text-foreground/70">Vašu predbežnú rezerváciu sme zaznamenali. Ozveme sa vám čo najskôr.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-foreground">Predbežná rezervácia</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Zanechajte nám e-mail a my vás budeme kontaktovať s detailami o voľných miestach v tábore Future Foudners Mini.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="reservation-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground/60">
                      Váš e-mail
                    </label>
                    <input
                      id="reservation-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rodic@email.sk"
                      className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Odoslať predbežnú rezerváciu
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-foreground/45">
                  Nezáväzné · Odpovieme do 24 hodín
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
