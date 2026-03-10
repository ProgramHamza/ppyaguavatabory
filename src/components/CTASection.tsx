import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock3, PhoneCall } from "lucide-react";
import ReservationModal from "./ReservationModal";

const commitments = [
  {
    icon: Shield,
    title: "Bezpečné prostredie",
    desc: "Mentori + animátori na 8 detí. Overené lokality.",
  },
  {
    icon: Clock3,
    title: "Rýchla odpoveď",
    desc: "Do 24 hodín vás kontaktujeme s detailami.",
  },
  {
    icon: PhoneCall,
    title: "Otvorená komunikácia",
    desc: "Denné reporty a číslo na koordinátora stále k dispozícii.",
  },
];

const CTASection = () => {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <section className="relative z-10 py-24 lg:py-32" id="prihlaska">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-10 md:p-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Prihlásenie</p>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              Pripravte vaše dieťa na budúcnosť.
            </h2>
            <p className="mt-4 text-lg text-white/45">
              Posledné voľné miesta na leto 2026. Zanechajte nám kontakt a my vám do 24 hodín zavoláme s detailami.
            </p>

            <button
              onClick={() => setShowReservation(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-white/90"
            >
              Predbežná rezervácia
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-[11px] uppercase tracking-widest text-white/25">
              Nezáväzné &middot; Odpovieme do 24 hodín
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {commitments.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                style={{ transformPerspective: 800 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center"
              >
                <item.icon className="mx-auto h-6 w-6 text-white/40" />
                <p className="mt-3 text-sm font-semibold text-white/70">{item.title}</p>
                <p className="mt-1 text-xs text-white/35">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ReservationModal open={showReservation} onClose={() => setShowReservation(false)} />
    </section>
  );
};

export default CTASection;
