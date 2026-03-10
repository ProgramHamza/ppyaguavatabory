import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const mentors = [
  {
    name: "Nina Foldváry",
    role: "Product lead · VentureLab",
    power: "Prezentácia & príbeh",
    quote: "Deti učím, že dobrá prezentácia je len dobre rozpovedaný príbeh.",
    image:
      "https://images.pexels.com/photos/4063869/pexels-photo-4063869.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Tomáš Bielik",
    role: "Finančný analytik",
    power: "Financie & rozpočty",
    quote: "Rozpočty nemusia byť strašiak. Vysvetľujem ich na hrách so žetónmi.",
    image:
      "https://images.pexels.com/photos/7129708/pexels-photo-7129708.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Zara Mitrová",
    role: "Kreatívna stratégička",
    power: "Marketing & kreativita",
    quote: "Reklama nie je hlučná. Je to sľub, ktorý vieš splniť.",
    image:
      "https://images.pexels.com/photos/7898221/pexels-photo-7898221.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const MentorShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsScale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);
  const cardsY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);

  return (
    <section ref={sectionRef} className="relative z-10 py-24 lg:py-32" id="mentori">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Mentori</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Skúsení mentori z praxe.
          </h2>
          <p className="mt-3 text-lg text-white/45">
            Každá skupina má svojho mentora — profesionála, ktorý vaše dieťa prevedie celým týždňom. Nie učitelia, ale sprievodcovia.
          </p>
        </motion.div>

        <motion.div
          style={{ scale: cardsScale, y: cardsY }}
          className="grid gap-4 md:grid-cols-3"
        >
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                y: -12,
                rotateY: 4,
                rotateX: -3,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              style={{ transformPerspective: 1000 }}
              className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:border-white/20"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 rounded-lg bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  {mentor.power}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
                  {mentor.role}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">{mentor.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  &#8222;{mentor.quote}&#8220;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MentorShowcase;
