import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useTheme } from "next-themes";

const ORB_COLORS = ["#F5A623", "#FFD580", "#FF8C00"] as const;
const PARTICLE_COUNT = 60;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const ORBS = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  size: randomBetween(200, 600),
  left: `${randomBetween(2, 82)}vw`,
  top: `${randomBetween(2, 76)}vh`,
  opacity: randomBetween(0.04, 0.08),
  color: ORB_COLORS[index % ORB_COLORS.length],
  driftX: (index % 2 === 0 ? 1 : -1) * randomBetween(24, 72),
  driftY: (index % 3 === 0 ? -1 : 1) * randomBetween(48, 128),
  duration: randomBetween(40, 80),
  delay: randomBetween(0, 20),
}));

const CLOUD_SPHERES = [
  {
    id: "cloud-1",
    left: "6vw",
    top: "16vh",
    width: "26vw",
    height: "32vh",
    startScale: 0.72,
    endScale: 1.42,
    shiftX: 4,
    shiftY: -8,
    rotateX: 16,
    rotateY: -12,
    opacity: 0.1,
  },
  {
    id: "cloud-2",
    left: "54vw",
    top: "8vh",
    width: "28vw",
    height: "34vh",
    startScale: 0.68,
    endScale: 1.56,
    shiftX: -5,
    shiftY: -10,
    rotateX: -14,
    rotateY: 18,
    opacity: 0.13,
  },
  {
    id: "cloud-3",
    left: "28vw",
    top: "42vh",
    width: "34vw",
    height: "38vh",
    startScale: 0.62,
    endScale: 1.68,
    shiftX: 3,
    shiftY: -14,
    rotateX: 12,
    rotateY: 10,
    opacity: 0.08,
  },
];

type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
};

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: 1 + Math.random() * 0.5,
  opacity: 0.12 + Math.random() * 0.18,
  velocityX: randomBetween(-0.08, 0.08),
  velocityY: randomBetween(-0.16, -0.05),
});

type CloudSphereProps = {
  config: (typeof CLOUD_SPHERES)[number];
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  isDark: boolean;
};

const CloudSphere = ({ config, scrollYProgress, prefersReducedMotion, isDark }: CloudSphereProps) => {
  const x = useTransform(scrollYProgress, [0, 0.38], ["0vw", `${config.shiftX}vw`]);
  const y = useTransform(scrollYProgress, [0, 0.38], ["0vh", `${config.shiftY}vh`]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.38],
    prefersReducedMotion ? [1, 1] : [config.startScale, config.endScale],
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.38], prefersReducedMotion ? [0, 0] : [0, config.rotateX]);
  const rotateY = useTransform(scrollYProgress, [0, 0.38], prefersReducedMotion ? [0, 0] : [0, config.rotateY]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.38],
    prefersReducedMotion
      ? [config.opacity, config.opacity, config.opacity]
      : [config.opacity * 0.5, config.opacity, config.opacity * 0.72],
  );

  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full"
      style={{
        left: config.left,
        top: config.top,
        width: config.width,
        height: config.height,
        x,
        y,
        scale,
        rotateX,
        rotateY,
        opacity,
        transformPerspective: 1400,
        filter: "blur(22px)",
        background:
          isDark
            ? "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.76), rgba(210,220,236,0.26) 32%, rgba(245,166,35,0.06) 56%, rgba(245,166,35,0.02) 70%, transparent 84%)"
            : "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96), rgba(255,240,223,0.5) 28%, rgba(255,213,128,0.18) 52%, rgba(245,166,35,0.08) 68%, transparent 82%)",
        willChange: prefersReducedMotion ? undefined : "transform, opacity",
      }}
    />
  );
};

export const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(window.innerWidth, window.innerHeight));

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      particles.forEach((particle) => {
        particle.x = Math.min(particle.x, width);
        particle.y = Math.min(particle.y, height);
      });
    };

    const renderFrame = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        context.fill();

        if (prefersReducedMotion) {
          return;
        }

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.y < -particle.radius) {
          particle.y = height + particle.radius;
          particle.x = Math.random() * width;
        }

        if (particle.x > width + particle.radius) {
          particle.x = -particle.radius;
        }

        if (particle.x < -particle.radius) {
          particle.x = width + particle.radius;
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    resizeCanvas();
    renderFrame();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,236,208,0.72),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(255,247,238,0.96))]"
        style={
          isDark
            ? {
                background:
                  "radial-gradient(circle at top, rgba(245,166,35,0.05), transparent 34%), linear-gradient(180deg, rgba(15,17,20,0.98), rgba(20,22,28,0.96))",
              }
            : undefined
        }
      />

      {CLOUD_SPHERES.map((config) => (
        <CloudSphere
          key={config.id}
          config={config}
          scrollYProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
          isDark={isDark}
        />
      ))}

      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            opacity: isDark ? orb.opacity * 0.42 : orb.opacity,
            backgroundColor: orb.color,
            filter: "blur(80px)",
            willChange: prefersReducedMotion ? undefined : "transform",
          }}
          animate={
            prefersReducedMotion
              ? { x: 0, y: 0 }
              : {
                  x: [-orb.driftX, orb.driftX],
                  y: [-orb.driftY, orb.driftY],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: orb.duration,
                  delay: orb.delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        />
      ))}

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
};

export default BackgroundCanvas;
