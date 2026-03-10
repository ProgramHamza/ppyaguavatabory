import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Sparkles, Calendar } from "lucide-react";
import ReservationModal from "./ReservationModal";

const stats = [
  { value: "5 dní", label: "intenzívny program" },
  { value: "28", label: "max. detí na turnus" },
  { value: "6", label: "skúsených mentorov" },
];

const HeroSection = () => {
  const [showReservation, setShowReservation] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative z-10 flex min-h-screen items-center pt-16" id="hero">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            BusinessCamp · Bratislava · Leto 2026
          </div>

          <h1 className="mt-8 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-white">
            Letný tábor, kde vaše dieťa
            <span className="text-gradient"> postaví vlastný biznis.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
            5-dňový program pre deti 11 – 15 rokov. Od nápadu k produktu, od prototypu k prezentácii pred rodičmi. Bez obrazoviek celý deň — reálna práca v tíme s mentormi z praxe.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => setShowReservation(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Rezervovať miesto
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#program"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/70 backdrop-blur-sm transition hover:bg-white/[0.08] hover:text-white"
            >
              Zobraziť program
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03, rotateX: 2, rotateY: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              style={{ transformPerspective: 800 }}
              className="glass-panel-soft rounded-2xl px-6 py-5"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/35">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-6 text-sm text-white/35"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Pre deti 11 – 15 rokov</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Júl 2026 · Bratislava</span>
          </div>
        </motion.div>
      </motion.div>

      <ReservationModal open={showReservation} onClose={() => setShowReservation(false)} />
    </section>
  );
};

export default HeroSection;
