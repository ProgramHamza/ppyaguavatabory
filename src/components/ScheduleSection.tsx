import { motion } from "framer-motion";
import scheduleImg from "@/assets/IMG_5323.JPG";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Calendar, ArrowUpRight } from "lucide-react";

const turns = [
  { label: "Turnus A", dates: "30. jún – 4. júl", focus: "AI + marketing", slots: "Voľné miesta", price: 390 },
  { label: "Turnus B", dates: "7. – 11. júl", focus: "Produkt + predaj", slots: "Posledné 4 miesta", price: 410 },
  { label: "Turnus C", dates: "14. – 18. júl", focus: "Impact + pitch", slots: "Otvorené", price: 390 },
];

const facts = [
  { icon: Clock, label: "8:00 – 16:00" },
  { icon: MapPin, label: "Kampus Umelka · BA" },
  { icon: Users, label: "11 – 15 rokov" },
  { icon: Calendar, label: "Júl 2026" },
];

const extras = [
  "Denné stravovanie + ovocný bar",
  "Materiály, merch a AI licencie v cene",
  "Poistenie a sprievodný program pre rodičov v piatok",
];

const ScheduleSection = () => {
  return (
    <section id="terminy" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 scribble-grid opacity-70" aria-hidden />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-foreground/60">termíny & investícia</p>
            <h2 className="text-4xl font-display text-foreground sm:text-5xl">
              Vyber si týždeň a tím, ktorý ti sadne.
            </h2>
            <p className="text-lg text-foreground/70">
              Každý turnus držíme na max. 28 účastníkov. Cena obsahuje mentorov, techniku, výlety aj Pitch Day pre rodičov.
            </p>
          </div>

          <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(12,20,40,0.08)]">
            <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">čo je v cene</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              {extras.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-foreground/65">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2">
                  <fact.icon className="h-4 w-4 text-primary" />
                  {fact.label}
                </div>
              ))}
            </div>
          </div>

          <Button variant="hero" size="lg" className="rounded-full px-8 text-base">
            Chcem rezervovať termín
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-[36px] border border-black/10">
            <img src={scheduleImg} alt="BusinessCamp v akcii" className="h-[360px] w-full object-cover" loading="lazy" />
          </div>
          <div className="rounded-[40px] border border-black/10 bg-white p-6 shadow-[0_35px_85px_rgba(5,10,25,0.08)]">
            <div className="grid gap-4">
              {turns.map((turn) => (
                <div key={turn.label} className="grid gap-4 rounded-3xl border border-black/5 bg-white/80 p-4 lg:grid-cols-[140px_1fr_120px] lg:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-foreground/45">{turn.label}</p>
                    <p className="font-display text-lg text-foreground">{turn.dates}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Fokus: {turn.focus}</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-accent">{turn.slots}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
                    <span className="font-display text-2xl text-foreground">€{turn.price}</span>
                    <ArrowUpRight className="h-5 w-5 text-foreground/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;
