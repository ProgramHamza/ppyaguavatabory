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

    const mailtoLink = `mailto:mimoriadni@gmail.com?subject=${encodeURIComponent("Predbežná rezervácia – BusinessCamp")}&body=${encodeURIComponent(`Dobrý deň,\n\nmám záujem o predbežnú rezerváciu miesta v BusinessCampe.\n\nMôj e-mail: ${email}\n\nĎakujem.`)}`;
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
              className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Ďakujeme!</h3>
                <p className="mt-2 text-sm text-white/60">Vašu predbežnú rezerváciu sme zaznamenali. Ozveme sa vám čo najskôr.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-white">Predbežná rezervácia</h3>
                <p className="mt-2 text-sm text-white/50">
                  Zanechajte nám e-mail a my vás budeme kontaktovať s detailami o voľných miestach a termínoch.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="reservation-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Odoslať predbežnú rezerváciu
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-white/30">
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
