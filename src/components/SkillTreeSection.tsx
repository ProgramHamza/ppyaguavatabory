import { motion } from "framer-motion";
import { Coins, Mic2, Users, Trophy, Joystick } from "lucide-react";

const perks = [
  {
    icon: Coins,
    label: "Finančné IQ",
    points: "+20",
    desc: "Rozpočet, cashflow, investičné misie a burzové hry.",
  },
  {
    icon: Mic2,
    label: "Prezentačné skills",
    points: "+15",
    desc: "Storyboarding, rétorika, improvizačné cvičenia.",
  },
  {
    icon: Users,
    label: "Networking",
    points: "+30",
    desc: "Peer feedback, speed-meetings, community večery.",
  },
  {
    icon: Trophy,
    label: "Team Spirit",
    points: "+25",
    desc: "Športové questy, kooperatívne výzvy, leadership badge.",
  },
];

const sideRewards = [
  {
    title: "XP systém",
    desc: "Každý účastník zbiera body za odvahu, pomoc tímu a výsledky. leaderboard ≠ tlak, ale motivácia.",
  },
  {
    title: "Digitálna karta",
    desc: "Na konci týždňa získavaš digitálny profil s hodnotením mentorov a odporúčaním na strednú.",
  },
];

const SkillTreeSection = () => {
  return (
    <section className="bg-white py-24 lg:py-32" id="skilltree">
      <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-slate">Gamifikácia</p>
          <h2 className="mt-4 text-4xl font-display text-primary sm:text-5xl">Čo získaš do svojho skill-tree?</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Štruktúrovaný XP systém robí z učenia hru: každý deň odomykáš nové schopnosti a vidíš, ako rastie tvoj základný
            "founder" profil.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="skill-card rounded-[28px] border border-border/60 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                    <perk.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-2xl font-display text-accent">{perk.points}</span>
                </div>
                <h3 className="mt-4 text-2xl font-display text-foreground">{perk.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[40px] border border-border/70 bg-gradient-to-b from-primary to-[#050a18] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">Bonus questy</p>
          <h3 className="mt-3 text-3xl font-display">Denné questy a superschopnosti mentorov.</h3>
          <p className="mt-4 text-white/75">
            Mentori vystupujú ako "Business superschopnosti" – Marketingový mág, Excel Ninja, Pitch Sensei. Pri hoveri sa
            odhalí ich skill a tip.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-white/80">
            {sideRewards.map((reward) => (
              <li key={reward.title} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <h4 className="font-display text-lg text-white">{reward.title}</h4>
                <p>{reward.desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
            <p className="text-xs uppercase tracking-[0.45em] text-mint">mentor spotlight</p>
            <p className="mt-2">Hover efekt mení fotku z čiernobielej na farebnú a zobrazí superschopnosť mentora.</p>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em]">
            <Joystick className="h-4 w-4 text-mint" />
            Skill-tree je súčasťou online profilu účastníka
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillTreeSection;
