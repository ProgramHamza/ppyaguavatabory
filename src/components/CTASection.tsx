import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, PhoneCall, Mail, Shield, Clock3 } from "lucide-react";

const commitments = [
  {
    icon: Shield,
    title: "Bezpečné prostredie",
    desc: "Mentori + animátori na 8 detí. Overené lokality v Ružinove.",
  },
  {
    icon: Clock3,
    title: "Rýchla odpoveď",
    desc: "Do 24 hodín ti zavoláme, prejdeme očakávania a rezervujeme turnus.",
  },
  {
    icon: PhoneCall,
    title: "Otvorená komunikácia",
    desc: "Denné mikro reporty a číslo na koordinátora stále k dispozícii.",
  },
];

const CTASection = () => {
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Rezervácia prijatá",
      description: "Ozveme sa do 24 hodín s detailami a potvrdením turnusu.",
    });
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1d36] via-[#132242] to-[#182b55]" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container relative z-10"
      >
        <div className="grid gap-10 rounded-[40px] border border-white/10 bg-white/5 p-10 text-white shadow-[0_45px_120px_rgba(3,4,17,0.55)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">prihlásenie</p>
            <h2 className="mt-4 text-4xl font-display sm:text-5xl">
              Nečakaj na dospelosť. Začni teraz – BusinessCamp prijíma posledné tímy.
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Prihláška je spoločná pre rodiča aj budúceho foundera. Vyplníš mikro brief, my ti zavoláme a doplníme detaily.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {commitments.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <item.icon className="h-6 w-6 text-mint" />
                  <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/60">{item.title}</p>
                  <p className="mt-2 text-sm text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/15 bg-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">Formulár</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              <div>
                <Label htmlFor="ceo" className="text-xs uppercase tracking-[0.35em] text-white/70">
                  Meno budúceho CEO
                </Label>
                <Input id="ceo" required placeholder="Alex, 12 rokov, miluje LEGO" className="mt-2 border-white/30 bg-white/10 text-white placeholder:text-white/50" />
              </div>
              <div>
                <Label htmlFor="parent" className="text-xs uppercase tracking-[0.35em] text-white/70">
                  Kontakt na rodiča
                </Label>
                <Input
                  id="parent"
                  required
                  placeholder="Telefon + e-mail"
                  className="mt-2 border-white/30 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="school" className="text-xs uppercase tracking-[0.35em] text-white/70">
                    Škola / ročník
                  </Label>
                  <Input
                    id="school"
                    placeholder="ZŠ Koceľova, 6. ročník"
                    className="mt-2 border-white/30 bg-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.35em] text-white/70">Preferovaný turnus</Label>
                  <Select>
                    <SelectTrigger className="mt-2 border-white/30 bg-white/10 text-white">
                      <SelectValue placeholder="Vyber si týždeň" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-white">
                      <SelectItem value="jul-1">1. turnus · 7. – 11. júl</SelectItem>
                      <SelectItem value="jul-2">2. turnus · 14. – 18. júl</SelectItem>
                      <SelectItem value="aug-1">3. turnus · 4. – 8. august</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="goal" className="text-xs uppercase tracking-[0.35em] text-white/70">
                  Na čom chceš makať toto leto?
                </Label>
                <Textarea
                  id="goal"
                  rows={4}
                  placeholder="Chcem vymyslieť appku na výmenu kartičiek, naučiť sa pitchovať a zvládnuť Excel."
                  className="mt-2 resize-none border-white/30 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full rounded-full text-base">
                Rezervovať miesto v inkubátore
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="text-center text-xs uppercase tracking-[0.4em] text-white/60">Odpovieme do 24 hodín</div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
