import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const mailtoLink = `mailto:mimoriadni@gmail.com?subject=${encodeURIComponent(`Správa z webu – ${formData.name}`)}&body=${encodeURIComponent(`Meno: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="kontakt" className="relative z-10 py-24 lg:py-32">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Kontakt</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Máte otázku?</h2>
          <p className="mt-2 text-sm text-white/50">Napíšte nám a ozveme sa vám čo najskôr.</p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center py-8 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Check className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Správa odoslaná!</h3>
              <p className="mt-1 text-sm text-white/50">Ďakujeme, ozveme sa vám.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
                    Meno
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Ján Novák"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="jan@email.sk"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
                  Správa
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Vaša otázka alebo správa..."
                  className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Odoslať správu
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
