import { motion } from "framer-motion";
import { Lightbulb, PencilRuler, Megaphone, Gamepad2, Presentation } from "lucide-react";

const path = [
  {
    day: "Pondelok",
    icon: Lightbulb,
    title: "Ideácia — hľadanie príležitostí",
    desc: "Zážitkové workshopy, design thinking a brainstorming s AI nástrojmi.",
    deliverable: "Nápadový canvas",
  },
  {
    day: "Utorok",
    icon: PencilRuler,
    title: "Prototyping — staviame niečo reálne",
    desc: "Figma, kartón alebo 3D pero. Dôležitý je výsledok, nie materiál.",
    deliverable: "Funkčný prototyp",
  },
  {
    day: "Streda",
    icon: Megaphone,
    title: "Marketing & predaj",
    desc: "Nahrávame Reels, píšeme príbeh značky, skúšame cenotvorbu.",
    deliverable: "Promo kampaň",
  },
  {
    day: "Štvrtok",
    icon: Gamepad2,
    title: "Terénne ekonomické hry",
    desc: "Outdoor simulácie, športové výzvy a strategická tímová práca.",
    deliverable: "Tímová hra",
  },
  {
    day: "Piatok",
    icon: Presentation,
    title: "Pitch Day — prezentácia pred rodičmi",
    desc: "Reálne pódium, rodičia a hostia. Konštruktívny feedback bez známok.",
    deliverable: "Pitch deck",
  },
];

const FeaturesSection = () => {
  return (
    <section id="program" className="relative z-10 py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Týždenný program</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            5 dní. Od nápadu k prezentácii.
          </h2>
          <p className="mt-4 text-lg text-white/45">
            Každý deň má jasný cieľ a výstup. Vaše dieťa sa učí cez prax — bez nudných prednášok.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {path.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              style={{ transformPerspective: 800 }}
              className="glass-panel-soft group rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                <item.icon className="h-5 w-5 text-white/60" />
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-white/30">{item.day}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{item.desc}</p>
              <div className="mt-4 inline-flex items-center rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/30">
                Výstup · {item.deliverable}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 glass-panel rounded-2xl p-8"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Prečo to funguje</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Mentori + prax = výsledky.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                Každý deň končí checkpointom, ktorý hodnotia mentori ako v reálnom startupe. Žiadne známky — len konštruktívny feedback a tímová energia.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-white/45">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                Dopoludnia deep-work na produktoch, popoludní šport alebo terénne hry.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                Každý účastník zbiera táborové mince za tímovú prácu, kreativitu a odvahu.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                Rodičia dostávajú denné mikro reporty — viete presne, čo vaše dieťa stavia.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
