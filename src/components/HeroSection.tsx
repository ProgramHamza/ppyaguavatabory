import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ReservationModal from "./ReservationModal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const stats = [
  { value: "5 dní", label: "intenzívny program" },
  { value: "9–12", label: "rokov, ideálny vek" },
  { value: "max. 30", label: "detí na turnus" },
];

const trustBadges = [
  "Leto 2026 · Bratislava",
  "Pre deti 9–12 rokov",
  "Vlastný produkt za 5 dní",
];

const headlineLines = [
  [
    { word: "Váš", accent: false },
    { word: "syn.", accent: false },
    { word: "Vaša", accent: false },
    { word: "dcéra.", accent: false },
  ],
  [
    { word: "Vlastná", accent: true },
    { word: "firma", accent: true },
    { word: "za", accent: true },
    { word: "5", accent: true },
    { word: "dní.", accent: true },
  ],
];

const ghostTexts = [
  {
    text: "Vlastná firma",
    className: "left-[-2vw] top-[10vh]",
    opacity: 0.1,
    xRange: [-14, 10],
    yRange: [8, -10],
    rotateRange: [-4, 5],
    duration: 7.2,
    delay: 0,
  },
  {
    text: "Budúci CEO",
    className: "right-[-3vw] top-[32vh]",
    opacity: 0.08,
    xRange: [14, -8],
    yRange: [10, -8],
    rotateRange: [6, -4],
    duration: 6.8,
    delay: 0.9,
  },
  {
    text: "Predaj. Nápad. Výhra.",
    className: "left-[10vw] bottom-[8vh]",
    opacity: 0.06,
    xRange: [-8, 12],
    yRange: [10, -12],
    rotateRange: [-3, 4],
    duration: 8.1,
    delay: 1.4,
  },
];

const kiteFlights = [
  {
    id: "kite-1",
    color: "#F5A623",
    tail: "#FFD580",
    xRange: ["-14vw", "28vw", "104vw"],
    yRange: ["88vh", "70vh", "52vh"],
    rotateRange: [-12, 8, 18],
    scaleRange: [0.62, 0.78, 0.56],
    opacity: 0.14,
  },
  {
    id: "kite-2",
    color: "#FF8C00",
    tail: "#F8C25C",
    xRange: ["-8vw", "34vw", "102vw"],
    yRange: ["82vh", "62vh", "46vh"],
    rotateRange: [-8, 10, 22],
    scaleRange: [0.5, 0.66, 0.44],
    opacity: 0.1,
  },
  {
    id: "kite-3",
    color: "#FFD580",
    tail: "#F5A623",
    xRange: ["-10vw", "22vw", "96vw"],
    yRange: ["96vh", "76vh", "58vh"],
    rotateRange: [-10, 4, 14],
    scaleRange: [0.42, 0.54, 0.34],
    opacity: 0.08,
  },
];

const balloons = [
  { id: "balloon-1", left: "12%", hue: "#FFD580", delay: 0, sway: 18, duration: 16, opacity: 0.12, size: 54 },
  { id: "balloon-2", left: "72%", hue: "#F5A623", delay: 1.6, sway: -14, duration: 18, opacity: 0.09, size: 46 },
  { id: "balloon-3", left: "84%", hue: "#FF8C00", delay: 0.7, sway: 12, duration: 20, opacity: 0.08, size: 38 },
];

const birds = [
  { id: "bird-1", xRange: ["-8vw", "20vw", "52vw"], yRange: ["30vh", "18vh", "24vh"], rotateRange: [-8, 6, 12], opacity: 0.08 },
  { id: "bird-2", xRange: ["4vw", "34vw", "66vw"], yRange: ["40vh", "24vh", "18vh"], rotateRange: [-6, 4, 10], opacity: 0.07 },
  { id: "bird-3", xRange: ["-12vw", "18vw", "44vw"], yRange: ["52vh", "38vh", "30vh"], rotateRange: [-10, 2, 8], opacity: 0.06 },
];

const sparkOrbs = [
  { id: "spark-1", left: "16%", top: "22%", size: 8, duration: 5.2, delay: 0, opacity: 0.12 },
  { id: "spark-2", left: "30%", top: "68%", size: 6, duration: 6.4, delay: 1, opacity: 0.08 },
  { id: "spark-3", left: "76%", top: "28%", size: 7, duration: 5.8, delay: 0.7, opacity: 0.1 },
  { id: "spark-4", left: "86%", top: "62%", size: 5, duration: 6.8, delay: 1.2, opacity: 0.07 },
];

const confettiBits = [
  { id: "c-1", left: "4%", top: "-4%", color: "#F5A623", rotate: -18 },
  { id: "c-2", left: "18%", top: "12%", color: "#FFD580", rotate: 22 },
  { id: "c-3", left: "36%", top: "-10%", color: "#FF8C00", rotate: -28 },
  { id: "c-4", left: "58%", top: "10%", color: "#F8C25C", rotate: 16 },
  { id: "c-5", left: "76%", top: "-8%", color: "#F5A623", rotate: -12 },
  { id: "c-6", left: "90%", top: "8%", color: "#FFD580", rotate: 30 },
];

const scrollLines = [
  { id: "line-1", left: "8%", height: "42vh", opacity: 0.08 },
  { id: "line-2", left: "90%", height: "36vh", opacity: 0.06 },
];

const ColorRibbonWave = ({ scrollYProgress, prefersReducedMotion }: { scrollYProgress: MotionValue<number>; prefersReducedMotion: boolean }) => {
  const x = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0vw", "0vw"] : ["-8vw", "10vw"]);
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0vh", "0vh"] : ["6vh", "-8vh"]);
  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [10, 10] : [10, -8]);
  const scaleY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.85, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0.06, 0.06] : [0.04, 0.08]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-[-20vw] top-[18vh] h-36 w-[86vw] rounded-full blur-3xl"
      style={{
        x,
        y,
        rotate,
        scaleY,
        opacity,
        background:
          "linear-gradient(90deg, rgba(245,166,35,0), rgba(245,166,35,0.22) 18%, rgba(255,213,128,0.42) 48%, rgba(255,255,255,0.22) 72%, rgba(255,140,0,0))",
        willChange: prefersReducedMotion ? undefined : "transform, opacity",
      }}
    />
  );
};

const TypedGhostText = ({
  item,
  scrollYProgress,
  prefersReducedMotion,
}: {
  item: (typeof ghostTexts)[number];
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) => {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [`${item.xRange[0]}px`, `${item.xRange[0]}px`] : [`${item.xRange[0]}px`, `${item.xRange[1]}px`],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [`${item.yRange[0]}px`, `${item.yRange[0]}px`] : [`${item.yRange[0]}px`, `${item.yRange[1]}px`],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [item.rotateRange[0], item.rotateRange[0]] : [item.rotateRange[0], item.rotateRange[1]],
  );

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute hidden whitespace-nowrap uppercase leading-none md:block ${item.className}`}
      style={{ x, y, rotate, willChange: prefersReducedMotion ? undefined : "transform" }}
    >
      <span
        className="relative block text-[clamp(4rem,11vw,9rem)] font-black tracking-[-0.05em]"
        style={{ opacity: item.opacity, color: "transparent", WebkitTextStroke: "1px rgba(245,166,35,0.42)" }}
      >
        {item.text}
        <motion.span
          className="absolute inset-0 overflow-hidden text-foreground/95"
          style={{ WebkitTextStroke: "0px transparent" }}
          animate={
            prefersReducedMotion
              ? { width: "100%" }
              : { width: ["0%", "0%", "96%", "96%", "0%"] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: item.duration,
                  delay: item.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                  repeat: Infinity,
                  times: [0, 0.14, 0.62, 0.78, 1],
                }
          }
        >
          <span className="absolute inset-0 whitespace-nowrap">{item.text}</span>
          <motion.span
            className="absolute right-0 top-1/2 h-[82%] w-[2px] -translate-y-1/2 rounded-full bg-foreground/85"
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.2, 1, 0.4, 1] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.span>
      </span>
    </motion.div>
  );
};

const PaperKite = ({ className, fill, tail }: { className: string; fill: string; tail: string }) => {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M64 12 108 64 64 116 20 64 64 12Z" fill={fill} />
      <path d="M64 12 64 116M20 64 108 64" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 116c6 8 10 14 4 22-6 8 5 11 2 19-3 7-14 5-16 14" stroke={tail} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 6" />
    </svg>
  );
};

const OrigamiBird = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <path d="M8 56 46 36l14 12 18-22 34-14-28 30-2 24-22-12-22 8Z" fill="rgba(255,255,255,0.88)" />
      <path d="M46 36 60 48 78 26" stroke="rgba(245,166,35,0.72)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Balloon = ({ className, fill }: { className: string; fill: string }) => {
  return (
    <svg viewBox="0 0 80 120" className={className} fill="none">
      <ellipse cx="40" cy="34" rx="22" ry="28" fill={fill} />
      <path d="M40 62c3 6 5 9 0 14-5-5-3-8 0-14Z" fill={fill} />
      <path d="M40 76c-2 10 10 18 0 34" stroke="rgba(255,255,255,0.58)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

const HeroSection = () => {
  const [showReservation, setShowReservation] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.86, 1], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]);
  const confettiOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.55], prefersReducedMotion ? [0, 0, 0] : [0, 1, 0]);
  const confettiY = useTransform(scrollYProgress, [0.08, 0.55], prefersReducedMotion ? [0, 0] : [-8, 36]);

  return (
    <section ref={heroRef} className="relative z-10 flex min-h-screen items-center overflow-hidden pt-16" id="hero">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <ColorRibbonWave scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />

        {scrollLines.map((line, index) => (
          <motion.div
            key={line.id}
            className="absolute top-[-8vh] w-px"
            style={{
              left: line.left,
              height: line.height,
              opacity: line.opacity,
              background: "linear-gradient(180deg, rgba(245,166,35,0), rgba(245,166,35,0.55), rgba(255,255,255,0))",
              y: useTransform(
                scrollYProgress,
                [0, 1],
                prefersReducedMotion ? ["0vh", "0vh"] : [`${index * 2}vh`, `${18 - index * 3}vh`],
              ),
            }}
          />
        ))}

        {ghostTexts.map((item) => (
          <TypedGhostText key={item.text} item={item} scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />
        ))}

        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {kiteFlights.map((kite) => (
            <motion.div
              key={kite.id}
              className="absolute left-0 top-0"
              style={{
                x: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  prefersReducedMotion ? [kite.xRange[0], kite.xRange[0], kite.xRange[0]] : kite.xRange,
                ),
                y: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  prefersReducedMotion ? [kite.yRange[0], kite.yRange[0], kite.yRange[0]] : kite.yRange,
                ),
                rotate: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  prefersReducedMotion ? [kite.rotateRange[0], kite.rotateRange[0], kite.rotateRange[0]] : kite.rotateRange,
                ),
                scale: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  prefersReducedMotion ? [kite.scaleRange[0], kite.scaleRange[0], kite.scaleRange[0]] : kite.scaleRange,
                ),
                opacity: kite.opacity,
                willChange: prefersReducedMotion ? undefined : "transform",
              }}
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.6 + kite.opacity * 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <PaperKite className="h-32 w-32 sm:h-40 sm:w-40" fill={kite.color} tail={kite.tail} />
            </motion.div>
          ))}
        </div>

        {birds.map((bird) => (
          <motion.div
            key={bird.id}
            className="absolute left-0 top-0"
            style={{
              x: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                prefersReducedMotion ? [bird.xRange[0], bird.xRange[0], bird.xRange[0]] : bird.xRange,
              ),
              y: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                prefersReducedMotion ? [bird.yRange[0], bird.yRange[0], bird.yRange[0]] : bird.yRange,
              ),
              rotate: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                prefersReducedMotion ? [bird.rotateRange[0], bird.rotateRange[0], bird.rotateRange[0]] : bird.rotateRange,
              ),
              opacity: bird.opacity,
            }}
          >
            <OrigamiBird className="h-20 w-20 sm:h-24 sm:w-24" />
          </motion.div>
        ))}

        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute bottom-[-14vh]"
            style={{ left: balloon.left, opacity: balloon.opacity, willChange: prefersReducedMotion ? undefined : "transform" }}
            animate={
              prefersReducedMotion
                ? { y: 0, x: 0 }
                : { y: ["0vh", "-118vh"], x: [0, balloon.sway, -balloon.sway * 0.4] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: balloon.duration,
                    delay: balloon.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          >
            <Balloon className="drop-shadow-[0_12px_26px_rgba(245,166,35,0.08)]" fill={balloon.hue} />
          </motion.div>
        ))}

        {sparkOrbs.map((spark) => (
          <motion.span
            key={spark.id}
            className="absolute rounded-full bg-white"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              opacity: spark.opacity,
              boxShadow: "0 0 18px rgba(255,255,255,0.45)",
            }}
            animate={prefersReducedMotion ? { opacity: spark.opacity, scale: 1 } : { opacity: [0, spark.opacity, 0], scale: [0.6, 1.25, 0.7] }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: spark.duration, delay: spark.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10 py-24 lg:py-32">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary/70">Future Foudners Mini · Letný denný tábor</p>

          <h1 className="mt-8 text-[clamp(2.7rem,6vw,5.2rem)] font-bold leading-[0.98] tracking-tight text-foreground">
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className={`block ${lineIndex === 1 ? "mt-1" : ""}`}>
                {line.map((item, wordIndex) => {
                  const delay = (lineIndex * 4 + wordIndex) * 0.06;

                  return (
                    <span key={`${lineIndex}-${item.word}`} className="inline-block overflow-hidden pb-3 pr-3 align-top">
                      <motion.span
                        className={`inline-block ${item.accent ? "text-gradient" : ""}`}
                        initial={prefersReducedMotion ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : delay,
                          duration: prefersReducedMotion ? 0 : 0.72,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {item.word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: prefersReducedMotion ? 0 : 0.7 }}
          >
            Letný denný tábor v Bratislave, kde deti 9–12 rokov postavia reálny biznis - od nápadu až po prvý predaj.
            Žiadna teória. Merateľné výsledky.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.55, duration: prefersReducedMotion ? 0 : 0.7 }}
          >
            <button
              onClick={() => setShowReservation(true)}
              className="relative flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Rezervovať miesto
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#program"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-7 py-3.5 text-sm font-medium text-foreground/80 backdrop-blur-sm transition hover:bg-primary/15 hover:text-foreground"
            >
              Zobraziť program
            </a>
          </motion.div>

          <div className="pointer-events-none relative mt-5 h-10 max-w-[32rem]" aria-hidden="true">
            {confettiBits.map((bit, index) => (
              <motion.span
                key={bit.id}
                className="absolute block rounded-sm"
                style={{
                  left: bit.left,
                  top: bit.top,
                  width: index % 2 === 0 ? 10 : 7,
                  height: index % 2 === 0 ? 3 : 9,
                  backgroundColor: bit.color,
                  opacity: confettiOpacity,
                  y: confettiY,
                }}
                animate={prefersReducedMotion ? undefined : { x: [0, index % 2 === 0 ? 8 : -6, 0], rotate: [bit.rotate, bit.rotate + 24, bit.rotate - 12] }}
                transition={prefersReducedMotion ? undefined : { duration: 2.8 + index * 0.14, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.65, duration: prefersReducedMotion ? 0 : 0.8 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/66"
          >
            {trustBadges.map((badge, index) => (
              <span key={badge} className="inline-flex items-center gap-4">
                <span>{badge}</span>
                {index < trustBadges.length - 1 ? <span className="h-1 w-1 rounded-full bg-primary/40" /> : null}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.25 }}
          className="mt-16 grid gap-6 text-left sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: prefersReducedMotion ? 0 : 0.45 }}
              className="border-l border-primary/20 pl-4"
            >
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-foreground/46">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <ReservationModal open={showReservation} onClose={() => setShowReservation(false)} />
    </section>
  );
};

export default HeroSection;
