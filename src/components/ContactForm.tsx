import { FormEvent, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { contactEmail } from "@/lib/env";
import SectionTypingBackdrop from "./SectionTypingBackdrop";

const contactTypingItems = [
  { text: "Kontakt", className: "left-[6%] top-[18%]", opacity: 0.08, duration: 7.1, delay: 0.1 },
  { text: "Otázky", className: "right-[4%] top-[44%]", opacity: 0.07, duration: 8, delay: 0.8 },
  { text: "Napíšte nám", className: "left-[16%] bottom-[8%]", opacity: 0.06, duration: 7.7, delay: 1.4 },
];

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const mailtoLink =
      `mailto:${contactEmail}?subject=${encodeURIComponent("Otázka - Future Founders Mini")}` +
      `&body=${encodeURIComponent(`Meno: ${formData.name}\nEmail: ${formData.email}\n\nSpráva:\n${formData.message}\n`)}`;

    window.open(mailtoLink, "_self");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section id="kontakt" className="relative z-10 py-24 lg:py-32">
      <SectionTypingBackdrop items={contactTypingItems} />
      <div className="container max-w-3xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[2rem] p-8 md:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Kontakt</p>
          <motion.h2 ref={headingRef} style={{ y: headingY }} className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Napíšte nám, ak sa chcete opýtať viac.
          </motion.h2>
          <p className="mt-2 text-base text-foreground/75">
            Tento formulár je na otázky. Ak chcete dieťa prihlásiť, použite samostatnú{" "}
            <Link to="/prihlaska" className="font-semibold text-primary underline-offset-4 hover:underline">
              stránku prihlášky
            </Link>
            .
          </p>

          {submitted ? (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
              className="mt-8 flex flex-col items-center py-8 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Správa je pripravená</h3>
              <p className="mt-1 text-sm text-foreground/65">Otvorili sme váš e-mailový klient. Ozvite sa nám a radi odpovieme.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground/55">
                    Meno
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Jana Nováková"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground/55">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="rodic@email.sk"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground/55">
                  Správa
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Napíšte nám, čo vás zaujíma."
                  className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Poslať správu
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
