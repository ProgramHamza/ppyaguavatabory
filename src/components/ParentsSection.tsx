import { motion } from "framer-motion";
import { MapPin, UtensilsCrossed, Clock3, ShieldCheck, HeartHandshake } from "lucide-react";

const parentInfo = [
  {
    icon: MapPin,
    label: "Lokalita",
    value: "Bratislava",
    detail: "Bezpečné prostredie s vlastným dvorom a moderným vybavením.",
  },
  {
    icon: UtensilsCrossed,
    label: "Strava",
    value: "3x denne",
    detail: "Zdravé menu, ovocný bar a pitný režim po celý deň.",
  },
  {
    icon: Clock3,
    label: "Čas",
    value: "08:00 - 17:00",
    detail: "Možnosť skoršieho príchodu a neskoršieho vyzdvihnutia.",
  },
  {
    icon: ShieldCheck,
    label: "Dozor",
    value: "Mentori + animátori",
    detail: "Každá skupina má 2 dospelých s certifikáciou.",
  },
  {
    icon: HeartHandshake,
    label: "Bezpečnosť",
    value: "Poistenie v cene",
    detail: "Zdravotník na mieste, kontaktná linka pre rodičov.",
  },
];

const ParentsSection = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32" id="parents">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Pre rodičov</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Všetko, čo potrebujete vedieť.
          </h2>
          <p className="mt-3 text-lg text-white/45">
            Biznis časť je seriózna, ale rovnako vážne berieme dohľad, stravu a komunikáciu s vami. Transparentnosť je pre nás priorita.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parentInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              style={{ transformPerspective: 800 }}
              className="glass-panel-soft rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                <item.icon className="h-5 w-5 text-white/60" />
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-white/30">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-white/40">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;
