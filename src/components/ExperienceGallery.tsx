import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import galleryOne from "@/assets/DSC01753.jpg";
import galleryTwo from "@/assets/IMG_6156.JPG";
import galleryThree from "@/assets/IMG_6207.JPG";
import galleryFour from "@/assets/P7100261.JPG";

const timeline = [
  {
    time: "08:30",
    title: "Ranný kick-off",
    desc: "Čo ideme stavať dnes? Mentori zadávajú denné misie a deti si plánujú úlohy.",
  },
  {
    time: "11:00",
    title: "Build & test blok",
    desc: "Prototypovanie, testovanie nápadov na rovesníkoch a spolupráca v tíme.",
  },
  {
    time: "14:00",
    title: "Terénne hry & šport",
    desc: "Ekonomické simulácie v meste, športové výzvy a zbieranie táborových mincí.",
  },
  {
    time: "16:30",
    title: "Demo circle",
    desc: "Každý tím prezentuje pokrok. Rodičia dostávajú mikro report a fotku dňa.",
  },
];

const gallery = [
  { src: galleryOne, label: "Tímová práca", meta: "Pondelok", span: "md:col-span-2 md:row-span-2" },
  { src: galleryTwo, label: "Terénne hry", meta: "Popoludnie", span: "" },
  { src: galleryThree, label: "Pitch tréning", meta: "Štvrtok", span: "" },
  { src: galleryFour, label: "Tímový retro", meta: "Piatok", span: "md:col-span-2" },
];

const ExperienceGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const galleryScale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const galleryY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const timelineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="dennyplan" className="relative z-10 py-24 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-2">
        <motion.div style={{ y: timelineY }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Denný priebeh</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Ako vyzerá deň v tábore.</h2>
            <p className="mt-4 max-w-xl text-lg text-white/45">
              Striedame prácu, testovanie a pohyb. Každý blok má jasný výstup — vy ako rodič vidíte výsledky cez denné reporty.
            </p>
          </motion.div>

          <div className="mt-8 space-y-3">
            {timeline.map((slot, index) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  x: 8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="glass-panel-soft flex gap-4 rounded-xl px-5 py-4"
              >
                <div className="text-2xl font-bold text-white/80">{slot.time}</div>
                <div>
                  <p className="text-sm font-medium text-white/70">{slot.title}</p>
                  <p className="text-sm text-white/40">{slot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ scale: galleryScale, y: galleryY }}
          className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-3"
        >
          {gallery.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotateY: 4,
                rotateX: -3,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              style={{ transformPerspective: 800 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">{item.meta}</p>
                <p className="text-lg font-semibold">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceGallery;
