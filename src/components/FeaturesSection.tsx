import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const programMoments = [
  {
    label: "Blok 1",
    title: "Nápad, tím a prvé rozhodnutia",
    topic: "Ako sa z nápadu stane spoločná práca",
    description:
      "Deti budú premýšľať nad tým, čo chcú vytvoriť, ako sa dohodnúť v tíme a ako predstaviť vlastný nápad jednoducho a zrozumiteľne.",
    highlight: "Dôraz bude na spoluprácu, komunikáciu a odvahu skúsiť niečo vlastné.",
    output: "Tímový koncept a prvá prezentácia",
  },
  {
    label: "Blok 2",
    title: "Tvorba a skúšanie v praxi",
    topic: "Z nápadu k niečomu, čo má tvar",
    description:
      "Program chceme stavať na skúšaní, spätnej väzbe a malých praktických úlohách. Deti si vyskúšajú tvorbu, premýšľanie o hodnote a jednoduché predstavenie svojho výsledku.",
    highlight: "Nepôjde o teóriu pre teóriu, ale o vedenú prax primeranú veku.",
    output: "Rozpracovaný výstup a spätná väzba",
  },
  {
    label: "Blok 3",
    title: "Prezentácia a stretnutie s praxou",
    topic: "Deti uvidia, že ich nápad sa dá odkomunikovať",
    description:
      "Súčasťou tábora majú byť aj ľudia z praxe a mentori, ktorí môžu deťom ukázať, ako sa o nápadoch premýšľa v reálnom svete bez zbytočného tlaku.",
    highlight: "Práve preto sú pre nás podporovatelia a mentori takí dôležití.",
    output: "Záverečné zdieľanie a skúsenosť z prezentácie",
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
            Čo chceme deťom počas tábora priniesť?
          </motion.h2>
          <p className="mt-4 text-lg text-foreground/75">
            Na webe nechceme predstierať, že máme dopredu rozpísaný každý detail. Jadro je však jasné: tvorba, tímová práca,
            vedený program a kontakt s ľuďmi z praxe.
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
            <motion.path d="M24 2 V98" stroke="#F5A623" strokeLinecap="round" strokeWidth="4" style={{ pathLength: lineProgress }} />
          </svg>

          <div className="space-y-5 md:pl-10">
            {programMoments.map((item, index) => (
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
                    {item.label}
                  </span>
                  <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                </div>

                <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">{item.topic}</p>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">{item.description}</p>

                <div className="mt-4 rounded-xl border border-primary/20 border-l-4 border-l-primary bg-primary/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dôraz</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.highlight}</p>
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
