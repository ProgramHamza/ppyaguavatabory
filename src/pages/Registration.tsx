import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const Registration = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <BackgroundCanvas />
      <div className="relative z-10">
        <Navbar />
        <main className="container py-28 lg:py-36">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          >
            <section className="rounded-[2rem] border border-primary/18 bg-white/76 p-8 shadow-[0_28px_70px_rgba(245,166,35,0.08)] backdrop-blur-sm md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Prihlásenie</p>
              <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">Prihláška do Future Founders Mini</h1>
              <p className="mt-5 text-base leading-relaxed text-foreground/72">
                Toto je samostatná stránka pre záujemcov o tábor. Zbierame tu základné údaje, aby sme vás vedeli kontaktovať a
                poslať ďalšie organizačné informácie.
              </p>

              <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground/72">
                <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4">
                  <p className="font-semibold text-foreground">Čo od vás teraz potrebujeme</p>
                  <p className="mt-2">
                    Kontakt na rodiča, základné údaje o dieťati a preferovaný termín. Ak máte doplňujúcu otázku alebo poznámku,
                    napíšte ju do formulára.
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-white/75 px-4 py-4">
                  <p className="font-semibold text-foreground">Čo nasleduje po odoslaní</p>
                  <p className="mt-2">
                    Ozveme sa vám, keď budeme mať pripravené ďalšie detaily k termínom, organizácii a ďalšiemu postupu.
                  </p>
                </div>
              </div>
            </section>

            <RegistrationForm />
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Registration;
