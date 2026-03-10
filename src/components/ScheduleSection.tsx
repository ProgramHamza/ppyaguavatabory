import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, Calendar, ArrowRight } from "lucide-react";
import ReservationModal from "./ReservationModal";

const turns = [
  { label: "Turnus A", dates: "30. jún - 4. júl", focus: "AI + marketing", slots: "Voľné miesta", price: 390 },
  { label: "Turnus B", dates: "7. - 11. júl", focus: "Produkt + predaj", slots: "Posledné 4 miesta", price: 410 },
  { label: "Turnus C", dates: "14. - 18. júl", focus: "Impact + pitch", slots: "Otvorené", price: 390 },
];

const facts = [
  { icon: Clock, label: "8:00 - 16:00" },
  { icon: MapPin, label: "Bratislava" },
  { icon: Users, label: "11 - 15 rokov" },
  { icon: Calendar, label: "Júl 2026" },
];

const extras = [
  "Denné stravovanie + ovocný bar",
  "Materiály, merch a AI licencie v cene",
  "Poistenie a Pitch Day pre rodičov v piatok",
];

const ScheduleSection = () => {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <section id="terminy" className="relative z-10 py-24 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Termíny & ceny</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Vyberte si termín pre vaše dieťa.
            </h2>
            <p className="mt-4 text-lg text-white/45">
              Každý turnus držíme na max. 28 účastníkov. Cena zahŕňa mentorov, stravu, materiály aj Pitch Day.
            </p>
          </div>

          <div className="glass-panel-soft rounded-2xl p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-white/30">Čo je v cene</p>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              {extras.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/40">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2">
                  <fact.icon className="h-4 w-4 text-white/30" />
                  {fact.label}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowReservation(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Rezervovať termín
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {turns.map((turn, index) => (
            <motion.div
              key={turn.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              style={{ transformPerspective: 800 }}
              className="glass-panel-soft group rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">{turn.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{turn.dates}</p>
                </div>
                <span className="text-3xl font-bold text-white">&#8364;{turn.price}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-white/40">Zameranie: {turn.focus}</p>
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">{turn.slots}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ReservationModal open={showReservation} onClose={() => setShowReservation(false)} />
    </section>
  );
};

export default ScheduleSection;
