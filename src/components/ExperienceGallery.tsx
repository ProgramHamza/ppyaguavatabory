import { motion } from "framer-motion";
import galleryOne from "@/assets/DSC01753.jpg";
import galleryTwo from "@/assets/IMG_6156.JPG";
import galleryThree from "@/assets/IMG_6207.JPG";
import galleryFour from "@/assets/P7100261.JPG";

const timeline = [
  {
    time: "08:30",
    title: "Kick-off & AI briefing",
    desc: "Čo ideme stavať dnes? Mentori zadávajú súťažné misie a decká tvoria backlog.",
  },
  {
    time: "11:00",
    title: "Build + test blok",
    desc: "Prototypy vo Figme aj z kartónu, user testy na rovesníkoch.",
  },
  {
    time: "14:00",
    title: "Field quest alebo šport",
    desc: "Ekonomické hry v meste, športové výzvy so skórovaním XP za tímovosť.",
  },
  {
    time: "16:30",
    title: "Demo circle + report",
    desc: "Každý tím prezentuje progress. Posielame rodičom mikro report a fotku dňa.",
  },
];

const gallery = [
  { src: galleryOne, label: "Ideation lab", meta: "Pondelok", span: "md:col-span-2 md:row-span-2" },
  { src: galleryTwo, label: "XP scoreboard", meta: "Popoludňajšie questy", span: "" },
  { src: galleryThree, label: "Pitch coaching", meta: "Štvrtok", span: "" },
  { src: galleryFour, label: "Team retro", meta: "Piatok", span: "md:col-span-2" },
];

const ExperienceGallery = () => {
  return (
    <section id="dennyplan" className="bg-white py-24 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.45em] text-slate">Denný priebeh</p>
          <h2 className="mt-4 text-4xl font-display text-primary sm:text-5xl">Ako vyzerá BusinessCamp deň.</h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Striedame hlbokú prácu, testovanie a pohyb. Každý blok má jasný výstup a XP body, ktoré vidíš v appke.
          </p>
          <div className="mt-8 space-y-4">
            {timeline.map((slot) => (
              <div key={slot.time} className="flex gap-4 rounded-3xl border border-border/60 bg-cloud px-4 py-4">
                <div className="font-display text-3xl text-primary">{slot.time}</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate">{slot.title}</p>
                  <p className="text-sm text-muted-foreground">{slot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-3"
        >
          {gallery.map((item) => (
            <div key={item.label} className={`group relative overflow-hidden rounded-[32px] border border-border/70 ${item.span}`}>
              <img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs uppercase tracking-[0.45em] text-white/70">{item.meta}</p>
                <p className="font-display text-2xl">{item.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceGallery;
