import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { partners } from "@/content/siteContent";
import { showImages } from "@/lib/env";

const sponsors = partners.filter((partner) => partner.kind === "sponsor");
const supporters = partners.filter((partner) => partner.kind === "supporter");

const SocialProofSection = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32" id="partneri">
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
            Tento tábor nestaviame len ako peknú webovú myšlienku. Je pre nás dôležité, že za ním stoja aj partneri a podporovatelia,
            ktorí nám pomáhajú s dôverou, zázemím a najmä s prepájaním na mentorov z praxe.
          </p>
          <div className="mt-6 text-sm text-white/35">Podpora programu · partnerstvá · mentori</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-panel-soft rounded-2xl p-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/40">Sponzori</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sponsors.map((partner) => (
              <div key={partner.id} className="rounded-xl border border-primary/15 bg-white/45 p-5">
                {showImages ? <img src={partner.logo} alt={partner.name} className="h-10 max-w-[120px] object-contain" /> : null}
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">{partner.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/68">{partner.blurb}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-foreground/40">Podporovatelia</p>
          <div className="mt-4 grid gap-3">
            {supporters.map((partner) => (
              <div key={partner.id} className="rounded-xl border border-primary/15 bg-white/45 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    {showImages ? <img src={partner.logo} alt={partner.name} className="h-10 max-w-[120px] object-contain" /> : null}
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">{partner.name}</p>
                  </div>
                  {partner.mentorRole ? (
                    <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/75">
                      Mentori
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/68">{partner.blurb}</p>
                {partner.mentorRole ? <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/82">{partner.mentorRole}</p> : null}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
