import { motion } from "framer-motion";
import { Coins, Mic2, Users, Trophy } from "lucide-react";

const perks = [
  {
    icon: Coins,
    label: "Finančné IQ",
    coins: "+20 mincí",
    desc: "Rozpočet, cashflow, investičné misie a burzové hry v praxi.",
  },
  {
    icon: Mic2,
    label: "Prezentačné zručnosti",
    coins: "+15 mincí",
    desc: "Storyboarding, rétorika a improvizačné cvičenia pred publikom.",
  },
  {
    icon: Users,
    label: "Tímová spolupráca",
    coins: "+30 mincí",
    desc: "Vzájomný feedback, tímové výzvy a rozvoj leadershipu.",
  },
  {
    icon: Trophy,
    label: "Odvaha & iniciatíva",
    coins: "+25 mincí",
    desc: "Športové questy, kooperatívne výzvy a osobný rast.",
  },
];

const sideRewards = [
  {
    title: "Táborové mince",
    desc: "Každý účastník zbiera virtuálne mince za odvahu, pomoc tímu a výsledky. Motivácia bez tlaku — na konci týždňa sa dajú vymeniť za ceny.",
  },
  {
    title: "Digitálny profil",
    desc: "Na konci týždňa vaše dieťa získa digitálny profil s hodnotením mentorov a odporúčaním — pamiatka a motivácia do budúcnosti.",
  },
];

const SkillTreeSection = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32" id="skilltree">
      <div className="container grid gap-8 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Motivácia</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Čo vaše dieťa získa?
            </h2>
            <p className="mt-4 text-lg text-white/45">
              Systém táborových mincí robí z učenia hru: každý deň vaše dieťa odomyká nové zručnosti a vidí svoj pokrok.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                style={{ transformPerspective: 800 }}
                className="glass-panel-soft group rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                    <perk.icon className="h-5 w-5 text-white/60" />
                  </div>
                  <span className="text-sm font-semibold text-white/50">{perk.coins}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{perk.label}</h3>
                <p className="mt-2 text-sm text-white/40">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Bonusy</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Denné výzvy a odmeny.</h3>
          <p className="mt-3 text-sm text-white/45">
            Mentori zadávajú špeciálne misie — za splnenie získavajú deti extra táborové mince, ktoré na konci týždňa premenia na reálne ceny.
          </p>

          <ul className="mt-8 space-y-4">
            {sideRewards.map((reward) => (
              <li key={reward.title} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                <h4 className="font-semibold text-white">{reward.title}</h4>
                <p className="mt-1 text-sm text-white/40">{reward.desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-widest text-white/30">Pre rodičov</p>
            <p className="mt-2 text-sm text-white/50">
              Denné reporty vám ukážu, koľko mincí vaše dieťa získalo a za čo. Vždy viete, ako sa mu darí.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillTreeSection;
