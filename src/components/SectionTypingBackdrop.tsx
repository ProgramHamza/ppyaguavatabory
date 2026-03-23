import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type TypingBackdropItem = {
  text: string;
  className: string;
  opacity?: number;
  duration?: number;
  delay?: number;
  sizeClassName?: string;
};

type SectionTypingBackdropProps = {
  items: TypingBackdropItem[];
  containerClassName?: string;
};

const SectionTypingBackdrop = ({ items, containerClassName = "" }: SectionTypingBackdropProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      {items.map((item) => (
        <motion.div
          key={item.text}
          className={`absolute hidden whitespace-nowrap uppercase leading-none md:block ${item.className}`}
          style={{ opacity: item.opacity ?? 0.08 }}
          animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: (item.duration ?? 7) + 1.8,
                  delay: item.delay ?? 0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <span
            className={`relative block font-black tracking-[-0.04em] text-[clamp(3.2rem,9vw,7.2rem)] ${item.sizeClassName ?? ""}`}
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(245,166,35,0.36)" }}
          >
            {item.text}
            <motion.span
              className="absolute inset-0 overflow-hidden text-foreground/90"
              style={{ WebkitTextStroke: "0 transparent" }}
              animate={
                prefersReducedMotion
                  ? { width: "100%" }
                  : { width: ["0%", "0%", "96%", "96%", "0%"] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: item.duration ?? 7,
                      delay: item.delay ?? 0,
                      ease: [0.25, 0.1, 0.25, 1],
                      repeat: Infinity,
                      times: [0, 0.12, 0.62, 0.8, 1],
                    }
              }
            >
              <span className="absolute inset-0 whitespace-nowrap">{item.text}</span>
              <motion.span
                className="absolute right-0 top-1/2 h-[82%] w-[2px] -translate-y-1/2 rounded-full bg-foreground/85"
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.2, 1, 0.45, 1] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionTypingBackdrop;
