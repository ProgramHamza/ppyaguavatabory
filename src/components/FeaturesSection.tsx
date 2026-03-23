import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const programDays = [
  {
    day: 1,
    title: "Deň 1 — Vznik firmy",
    topic: "Začíname podnik",
    description:
      "Deti si rozdelia roly (CEO, Marketing, Financie, Produkt), vytvoria názov, logo a brand board. Naštartujú hernú ekonomiku — každý tím dostáva 500 StartCoinov.",
    event: "Príchod konkurencie — tímy musia do 20 minút upraviť stratégiu.",
    output: "Brand board + biznis plán (1 strana) + cenník",
  },
  {
    day: 2,
    title: "Deň 2 — Produkt & výroba",
    topic: "Čo vlastne predávame?",
    description:
      "Prototypovanie, kalkulácia nákladov (materiál + čas = cena výroby), krížové testovanie medzi tímami.",
    event: "Zákazníci vrátili tovar — tímy musia upraviť aspoň 1 produkt na základe spätnej väzby.",
    output: "Finálny produktový katalóg + kalkulácia nákladov",
  },
  {
    day: 3,
    title: "Deň 3 — Marketing & značka",
    topic: "Ako sa o nás dozvedia ľudia?",
    description:
      "Fyzický plagát A2, 60-sekundové promo video, AI vizuály v Canva, pitch pred ostatnými tímami.",
    event: "Influencer reakcia — 2 tímy dostanú +30% dopyt, ostatní musia reagovať.",
    output: "Plagát + promo video + sada 3 grafík",
  },
  {
    day: 4,
    title: "Deň 4 — Predaj na trhu",
    topic: "Zarábame",
    description:
      "Mini trh (2 hodiny) — deti nakupujú a predávajú v hernej mene. Záverečný blok: predaj rodičom.",
    event:
      "Inflačná kríza — zdraženie materiálu o 50%, postihnutý tím musí improvizovať nový produkt do 15 minút.",
    output: "Finančný výkaz: príjmy, náklady, zisk/strata",
  },
  {
    day: 5,
    title: "Deň 5 — Finále & investori",
    topic: "Veľké finále",
    description:
      "Pitch pred porotou (rodičia, hostia, mentor). Tajné hlasovanie. Odovzdávanie ocenení.",
    event: "Investorská otázka — CEO každého tímu odpovie na náhodnú otázku od investora.",
    output: "Záverečná prezentácia + osobný reflexný záznam",
  },
];

const ProgramSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineProgress = useTransform(sectionProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(headingProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={sectionRef} id="program" className="relative z-10 py-24 lg:py-32">
      <motion.div
        className="container"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Program</p>
          <motion.h2 ref={headingRef} style={{ y: headingY }} className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Čo bude vaše dieťa robiť každý deň?
          </motion.h2>
          <p className="mt-4 text-lg text-foreground/75">
            Každý deň má jasnú tému, krízovú event výzvu a merateľný výstup. Rodič vidí konkrétny progres, dieťa
            zažíva skutočné rozhodovanie.
          </p>
        </div>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-full w-12 md:block"
            viewBox="0 0 48 100"
            preserveAspectRatio="none"
          >
            <path d="M24 2 V98" stroke="rgba(245, 166, 35, 0.22)" strokeLinecap="round" strokeWidth="2" />
            <motion.path
              d="M24 2 V98"
              stroke="#F5A623"
              strokeLinecap="round"
              strokeWidth="4"
              style={{ pathLength: lineProgress }}
            />
          </svg>

          <div className="space-y-5 md:pl-10">
            {programDays.map((item, index) => (
              <motion.article
                key={item.title}
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        rotateX: 2,
                        rotateY: -2,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 400, damping: 25 },
                      }
                }
                style={{ transformPerspective: 800 }}
                className="glass-panel-soft relative rounded-[2rem] p-6 md:ml-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.35rem] top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                    Deň {item.day}
                  </span>
                  <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                </div>

                <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">Téma: "{item.topic}"</p>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">{item.description}</p>

                <div className="mt-4 rounded-xl border border-primary/20 border-l-4 border-l-primary bg-primary/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Event</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.event}</p>
                </div>

                <div className="mt-5 inline-flex items-center rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                  Výstup: {item.output}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProgramSection;
