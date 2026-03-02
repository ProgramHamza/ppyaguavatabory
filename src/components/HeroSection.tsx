import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/IMG_6498.JPG";
import { ArrowRight, Sparkles, PiggyBank, Target, Users, Clock3 } from "lucide-react";

const stats = [
  { value: "5 dní", label: "produktový sprint" },
  { value: "28 miest", label: "limit na turnus" },
  { value: "6 mentorov", label: "z praxe" },
];

const heroTags = ["Biznis tábor", "11 – 15 rokov", "Bratislava", "Limit 28 detí"];

const heroHighlights = [
  { icon: PiggyBank, title: "Finančné IQ", desc: "Cashflow, ceny a mini investície v praxi." },
  { icon: Target, title: "Produkt & AI", desc: "Od idey po MVP, používanie AI ako nástroja." },
  { icon: Users, title: "Pitch & tím", desc: "Storytelling, leadership a zdravá tímová dynamika." },
];

const dayFlow = [
  { time: "08:30", activity: "Kick-off + sprint ciele" },
  { time: "12:00", activity: "Build blok + brain-food" },
  { time: "15:00", activity: "Field quest / šport" },
  { time: "17:00", activity: "Demo circle pre rodičov" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff]" id="hero">
      <div className="absolute inset-x-0 top-0 h-32 bg-white" aria-hidden />
      <div className="absolute inset-x-0 top-16 flex justify-between px-10" aria-hidden>
        <span className="h-24 w-24 rounded-full bg-white shadow-[0_25px_60px_rgba(20,54,94,0.08)]" />
        <span className="h-16 w-16 rounded-full bg-white shadow-[0_20px_50px_rgba(20,54,94,0.08)]" />
        <span className="h-20 w-20 rounded-full bg-white shadow-[0_20px_50px_rgba(20,54,94,0.08)]" />
      </div>

      <div className="container relative z-10 grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            <Sparkles className="h-4 w-4 text-accent" />
            BusinessCamp · Bratislava
          </div>

          <h1 className="mt-6 text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.08] text-primary">
            Zmeň nápad na reálny produkt a tím.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Moderný biznis tábor, kde decká v priebehu týždňa prejdú celý produktový cyklus. Žiadne sci-fi efekty, len jasná vízia,
            mentori z praxe a prostredie, ktoré dýcha dôverou.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold text-primary/80 shadow-[0_10px_25px_rgba(15,35,70,0.08)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {heroHighlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-primary/10 bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,35,70,0.08)]">
                <item.icon className="h-6 w-6 text-accent" />
                <p className="mt-3 text-lg font-semibold text-primary">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="hero" size="lg" className="rounded-full px-8 text-base">
              Rezervovať miesto
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-primary/20 bg-white px-8 text-base text-primary hover:bg-primary/5"
            >
              Zobraziť denný plán
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-primary/10 bg-white px-5 py-5 text-left shadow-[0_20px_55px_rgba(15,35,70,0.07)]">
                <p className="text-3xl font-display text-primary">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.35em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[40px] border border-primary/10 bg-white p-4 shadow-[0_35px_90px_rgba(15,35,70,0.12)]">
            <img src={heroImg} alt="Pitch day moment" loading="lazy" className="h-[460px] w-full rounded-[32px] object-cover" />
          </div>
          <div className="absolute -bottom-10 left-1/2 w-[85%] -translate-x-1/2 rounded-[28px] border border-primary/10 bg-white p-5 shadow-[0_25px_65px_rgba(15,35,70,0.12)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <Clock3 className="h-4 w-4 text-accent" />
              Denný rytmus
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {dayFlow.map((slot) => (
                <li key={slot.time} className="flex items-center gap-3">
                  <span className="font-display text-lg text-primary">{slot.time}</span>
                  <span>{slot.activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      <div className="pb-16" />
    </section>
  );
};

export default HeroSection;
