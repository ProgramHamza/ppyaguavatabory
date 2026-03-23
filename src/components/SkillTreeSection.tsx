import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BadgeDollarSign, Coins, Gavel, Scale } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import SectionTypingBackdrop from "./SectionTypingBackdrop";

const economyCards = [
  {
    icon: Coins,
    title: "Štartovací kapitál",
    desc: "Každý tím dostane 500 SC na Deň 1.",
  },
  {
    icon: BadgeDollarSign,
    title: "Materiálové náklady",
    desc: "Každá surovina má pevnú cenu v SC podľa cenníka.",
  },
  {
    icon: Gavel,
    title: "Sankcie & bonusy",
    desc: "Nesplnený event = pokuta 50 SC. Správna reakcia = bonus 80 SC.",
  },
  {
    icon: Scale,
    title: "Finálne skóre",
    desc: "SC zostatok × 0.4 + hodnotenie poroty × 0.6 = finálne poradie.",
  },
];

const coinDrops = [
  { left: "4%", delay: 0, drift: -16, duration: 1.7 },
  { left: "12%", delay: 0.08, drift: 14, duration: 1.9 },
  { left: "20%", delay: 0.16, drift: -12, duration: 2.05 },
  { left: "28%", delay: 0.24, drift: 18, duration: 1.85 },
  { left: "36%", delay: 0.32, drift: -10, duration: 2.2 },
  { left: "44%", delay: 0.4, drift: 14, duration: 1.95 },
  { left: "52%", delay: 0.48, drift: -18, duration: 2.1 },
  { left: "60%", delay: 0.56, drift: 16, duration: 1.75 },
  { left: "68%", delay: 0.64, drift: -14, duration: 2.15 },
  { left: "76%", delay: 0.72, drift: 12, duration: 1.9 },
  { left: "84%", delay: 0.8, drift: -15, duration: 2.05 },
  { left: "92%", delay: 0.88, drift: 10, duration: 1.8 },
];

const economyTypingItems = [
  { text: "StartCoin", className: "left-[6%] top-[14%]", opacity: 0.08, duration: 7.2, delay: 0.2 },
  { text: "Herná ekonomika", className: "right-[4%] top-[44%]", opacity: 0.07, duration: 8.1, delay: 0.8 },
  { text: "Rozpočet", className: "left-[18%] bottom-[6%]", opacity: 0.06, duration: 6.8, delay: 1.1 },
];

const floatingGameBits = [
  { id: "bit-1", left: "12%", top: "20%", symbol: "SC", duration: 7.8, delay: 0, opacity: 0.08 },
  { id: "bit-2", left: "82%", top: "22%", symbol: "▲", duration: 8.6, delay: 0.4, opacity: 0.06 },
  { id: "bit-3", left: "74%", top: "72%", symbol: "◆", duration: 7.1, delay: 1, opacity: 0.07 },
  { id: "bit-4", left: "24%", top: "78%", symbol: "●", duration: 8.2, delay: 0.7, opacity: 0.06 },
];

const StartCoin = () => {
  return (
    <svg viewBox="0 0 56 56" className="h-10 w-10 drop-shadow-[0_14px_30px_rgba(245,166,35,0.22)]" fill="none">
      <circle cx="28" cy="28" r="23" fill="rgba(245,166,35,0.22)" />
      <circle cx="28" cy="28" r="20" fill="#FFD580" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="14.5" fill="rgba(255,255,255,0.34)" stroke="rgba(255,255,255,0.45)" />
      <text x="28" y="31.5" fill="#8B4B00" fontFamily="inherit" fontSize="12" fontWeight="800" textAnchor="middle">
        SC
      </text>
    </svg>
  );
};

const HernaEkonomika = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const coinsVisible = useInView(sectionRef, { once: false, amount: 0.25 });

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(headingProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-24 lg:py-32" id="ekonomika">
      <SectionTypingBackdrop items={economyTypingItems} />

      {!prefersReducedMotion &&
        floatingGameBits.map((bit) => (
          <motion.span
            key={bit.id}
            aria-hidden="true"
            className="pointer-events-none absolute hidden text-sm font-bold text-primary/80 md:block"
            style={{ left: bit.left, top: bit.top, opacity: bit.opacity, willChange: "transform" }}
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0], x: [0, 6, 0] }}
            transition={{ duration: bit.duration, delay: bit.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {bit.symbol}
          </motion.span>
        ))}

      {!prefersReducedMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 h-40 overflow-hidden">
          {coinDrops.map((coin, index) => (
            <motion.div
              key={`${coin.left}-${index}`}
              className="absolute top-0"
              style={{ left: coin.left, willChange: coinsVisible ? "transform, opacity" : undefined }}
              initial={{ y: -60, opacity: 0, rotate: 0 }}
              animate={
                coinsVisible
                  ? {
                      y: [-60, 120, -60],
                      x: [0, coin.drift, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360, 720],
                    }
                  : { y: -60, x: 0, opacity: 0, rotate: 0 }
              }
              transition={{
                delay: coin.delay,
                duration: coin.duration,
                ease: [0.22, 1, 0.36, 1],
                repeat: coinsVisible ? Infinity : 0,
                repeatDelay: 0.35 + index * 0.03,
              }}
            >
              <StartCoin />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="container"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Herná ekonomika — StartCoiny (SC)</p>
          <motion.h2 ref={headingRef} style={{ y: headingY }} className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Skutočné rozhodnutia. Herné peniaze. Reálne lekcie.
          </motion.h2>
          <p className="mt-4 text-lg text-foreground/75">
            Deti sa učia financie cez prax. Každé rozhodnutie v tíme má okamžitý dopad na rozpočet, výsledok aj poradie.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {economyCards.map((item, index) => (
            <motion.article
              key={item.title}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.08, duration: prefersReducedMotion ? 0 : 0.45 }}
              viewport={{ once: true }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -8,
                      rotateX: 2,
                      rotateY: -2,
                      scale: 1.03,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }
              }
              style={{ transformPerspective: 800 }}
              className="glass-panel-soft rounded-[2rem] p-6 transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-foreground/75">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HernaEkonomika;
