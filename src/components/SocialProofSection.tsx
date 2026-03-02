import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

const partners = ["Impact Hub", "LEAF", "PointLab", "Beanery", "FutureNow"];

const SocialProofSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="quote-card rounded-[40px] p-10 text-white"
        >
          <Quote className="h-10 w-10 text-mint" />
          <p className="mt-6 text-2xl font-display leading-tight">
            „Finančná gramotnosť do 15 rokov zdvojnásobuje šancu, že dieťa bude v dospelosti viesť projekt, nie iba nasledovať.
            Gamifikovaný prístup BusinessCampu je spôsob, ako to dosiahnuť bez stresu.“
          </p>
          <div className="mt-6 text-sm uppercase tracking-[0.4em] text-white/70">
            Mgr. Daniela Kovářová · detská psychologička
          </div>
        </motion.div>

        <div className="rounded-[36px] border border-border/70 bg-secondary/60 p-8">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Podporujú mladé talenty</p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-2xl font-display text-primary/80 sm:grid-cols-3">
            {partners.map((logo) => (
              <div key={logo} className="rounded-2xl border border-border/70 bg-white px-4 py-6 text-center shadow-sm">
                {logo}
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/80 bg-white px-4 py-3 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Partneri prinášajú mini challenge, ceny a exkurzie.
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
