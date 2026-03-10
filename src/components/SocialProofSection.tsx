import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const partners = [
  { name: "SpMNDaG", logo: "/sponsors/logo-full.svg" },
  { name: "Future Founders", logo: "/sponsors/logo-future.png" },
  { name: "The SPOT", logo: "/sponsors/images (6).png" },
  { name: "NaCeRo", logo: "/sponsors/images (3).jpg" },
  { name: "Aerostacks", logo: "/sponsors/6s6wc4jsyk7XAMRuLolFGftq0.webp" },
];

const SocialProofSection = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="container grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-10"
        >
          <Quote className="h-8 w-8 text-white/20" />
          <p className="mt-6 text-xl font-medium leading-snug text-white">
            &#8222;Finančná gramotnosť do 15 rokov zdvojnásobuje šancu, že
            dieťa bude v dospelosti viesť projekty, nie iba nasledovať.
            Praktický prístup BusinessCampu je spôsob, ako to dosiahnuť bez
            stresu.&#8220;
          </p>
          <div className="mt-6 text-sm text-white/35">
            Mgr. Daniela Kovářová &middot; detská psychologička
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-panel-soft rounded-2xl p-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/30">
            Partneri projektu
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition hover:border-white/15"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 max-w-[120px] object-contain brightness-0 invert opacity-50 transition-opacity hover:opacity-80"
                />
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/35">
            Partneri prinášajú výzvy, ceny a exkurzie do programu.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
