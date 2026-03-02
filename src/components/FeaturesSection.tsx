import { motion } from "framer-motion";
import { Lightbulb, PencilRuler, Megaphone, Gamepad2, Presentation } from "lucide-react";

const path = [
  {
    day: "Pondelok",
    icon: Lightbulb,
    title: "Ideácia · Hľadáme dieru na trhu",
    desc: "Zážitkové workshopy, design thinking, brainstorming s AI nástrojmi.",
    deliverable: "Napadový canvas",
  },
  {
    day: "Utorok",
    icon: PencilRuler,
    title: "Prototyping · Staviame niečo reálne",
    desc: "Figma, Canva, lepenka či 3D pero. Dôležitý je výsledok, nie materiál.",
    deliverable: "Funkčný prototyp",
  },
  {
    day: "Streda",
    icon: Megaphone,
    title: "Marketing & Sales · Ako presvedčiť svet",
    desc: "Nahrávame Reels, píšeme pitch, skúšame pricing hry.",
    deliverable: "Promo kampaň",
  },
  {
    day: "Štvrtok",
    icon: Gamepad2,
    title: "Scaling & Sport · Ekonomické hry v teréne",
    desc: "Outdoor simulácie, športové challenge, stratégia a teamwork.",
    deliverable: "Go-to-market hra",
  },
  {
    day: "Piatok",
    icon: Presentation,
    title: "Pitch Day · Prezentácia pred investormi",
    desc: "Reálny stage, rodičia a hostia. Feedback bez detských bodíkov.",
    deliverable: "Pitch deck",
  },
];

const FeaturesSection = () => {
  return (
    <section id="program" className="relative overflow-hidden bg-cloud py-24 lg:py-32">
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[40px] border border-border/60 bg-card/80 p-8 shadow-[0_35px_90px_rgba(12,18,36,0.12)]"
        >
          <div className="timeline-line" />
          <h2 className="mb-8 text-4xl font-display text-primary">The Path</h2>
          <div className="space-y-8">
            {path.map((item) => (
              <div key={item.day} className="relative pl-16">
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-[0.45em] text-slate">{item.day}</p>
                <h3 className="mt-1 font-display text-2xl text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-foreground/70">
                  Deliverable · {item.deliverable}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[40px] bg-[#0b132b] p-8 text-white shadow-[0_45px_120px_rgba(2,5,16,0.7)]"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">prečo to funguje</p>
          <h3 className="mt-3 text-4xl font-display">Mentori + gamifikácia = flow.</h3>
          <p className="mt-4 text-white/80">
            Každý deň končí checkpointom, ktorý hodnotia mentori ako v startupe. Popritom zbierame XP body za tímovú prácu,
            kreativitu a leadership.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-white/80">
            <li>• Dopoludnia deep-work na produktoch, popoludní šport alebo terénne hry.</li>
            <li>• Bez známok – len konštruktívny feedback, scoreboard a XP za "wow" momenty.</li>
            <li>• Rodičia dostávajú denné mikro reporty, takže vedia, čo dieťa práve stavia.</li>
          </ul>
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.4em] text-mint">bonus</p>
            <p className="mt-2 text-lg">Nočný "Demo Reel" – zostrihané momenty dňa priamo do vašej schránky.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
