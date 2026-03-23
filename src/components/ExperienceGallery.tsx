import { type MouseEvent, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import SectionTypingBackdrop from "./SectionTypingBackdrop";

const awards = [
  {
    icon: "🏆",
    title: "Najlepší biznis",
    desc: "Najvyššie finálne skóre.",
  },
  {
    icon: "📣",
    title: "Najlepší marketing",
    desc: "Najsilnejšia značka a prezentácia.",
  },
  {
    icon: "🛠",
    title: "Najlepší produkt",
    desc: "Originalita, kvalita, feedback zákazníkov.",
  },
  {
    icon: "💰",
    title: "Najlepší zisk",
    desc: "Najvyšší SC zostatok po trhu.",
  },
  {
    icon: "👑",
    title: "Najlepší líder",
    desc: "Individuálne ocenenie pre CEO tímu.",
  },
  {
    icon: "✨",
    title: "Najkreatívnejší nápad",
    desc: "Garancie pre každý tím, nikto neodchádza bez titulu.",
  },
];

const awardsTypingItems = [
  { text: "Ocenenia", className: "left-[6%] top-[14%]", opacity: 0.08, duration: 7.4, delay: 0.2 },
  { text: "Výhra", className: "right-[8%] top-[46%]", opacity: 0.07, duration: 6.9, delay: 0.9 },
  { text: "Kreativita", className: "left-[16%] bottom-[8%]", opacity: 0.06, duration: 8.2, delay: 1.3 },
];

const springConfig = { stiffness: 220, damping: 20, mass: 0.8 };

type AwardTiltCardProps = {
  award: (typeof awards)[number];
  index: number;
  prefersReducedMotion: boolean;
};

const AwardTiltCard = ({ award, index, prefersReducedMotion }: AwardTiltCardProps) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shimmerX = useMotionValue(50);
  const shimmerY = useMotionValue(50);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const shimmer = useMotionTemplate`radial-gradient(circle at ${shimmerX}% ${shimmerY}%, rgba(245,166,35,0.28), rgba(255,213,128,0.16) 26%, transparent 58%)`;
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    rotateX.set((0.5 - relativeY) * 16);
    rotateY.set((relativeX - 0.5) * 16);
    shimmerX.set(relativeX * 100);
    shimmerY.set(relativeY * 100);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    shimmerX.set(50);
    shimmerY.set(50);
    setIsHovering(false);
  };

  const interactiveStyle: {
    rotateX?: MotionValue<number>;
    rotateY?: MotionValue<number>;
    transformPerspective: number;
    transformStyle: "preserve-3d";
    willChange?: string;
  } = prefersReducedMotion
    ? {
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }
    : {
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        willChange: isHovering ? "transform" : undefined,
      };

  return (
    <motion.article
      key={award.title}
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay: index * 0.08,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }
      }
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.02 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetTilt}
      onHoverStart={() => !prefersReducedMotion && setIsHovering(true)}
      onHoverEnd={resetTilt}
      style={interactiveStyle}
      className="glass-panel-soft group relative overflow-hidden rounded-[2rem] p-6 transition-all duration-300"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={prefersReducedMotion ? undefined : { backgroundImage: shimmer }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_42%,rgba(245,166,35,0.12))] opacity-70"
      />

      <div className="relative z-10" style={{ transform: "translateZ(18px)" }}>
        <div className="text-3xl">{award.icon}</div>
        <h3 className="mt-4 text-2xl font-semibold text-foreground">{award.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-foreground/75">{award.desc}</p>
      </div>
    </motion.article>
  );
};

const OceneniaSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(headingProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section className="relative z-10 py-24 lg:py-32" id="ocenenia">
      <SectionTypingBackdrop items={awardsTypingItems} />
      <motion.div
        className="container"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Ocenenia</p>
          <motion.h2 ref={headingRef} style={{ y: headingY }} className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Každý tím vyhráva niečo.
          </motion.h2>
          <p className="mt-4 text-lg text-foreground/75">
            Súťaž je férová, motivujúca a postavená tak, aby každé dieťa odchádzalo s úspechom, nie sklamaním.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <AwardTiltCard key={award.title} award={award} index={index} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OceneniaSection;
