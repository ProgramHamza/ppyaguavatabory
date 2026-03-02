import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const mentors = [
  {
    name: "Nina Foldváry",
    role: "Product lead · VentureLab",
    power: "Pitch Sensei",
    quote: "Deti učím, že dobrý pitch je len dobre rozpovedaný príbeh.",
    image: "https://images.pexels.com/photos/4063869/pexels-photo-4063869.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Tomáš Bielik",
    role: "Growth @ fintech scaleup",
    power: "Excel Ninja",
    quote: "Rozpočty nemusia byť strašiak. Vysvetľujem ich na hrách so žetónmi.",
    image: "https://images.pexels.com/photos/7129708/pexels-photo-7129708.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Zara Mitrová",
    role: "Creative strategist",
    power: "Marketingový mág",
    quote: "Reklama nie je hlučná. Je to sľub, ktorý vieš splniť.",
    image: "https://images.pexels.com/photos/7898221/pexels-photo-7898221.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const MentorShowcase = () => {
  return (
    <section className="bg-cloud py-24 lg:py-32" id="mentori">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-slate">Mentori</p>
            <h2 className="mt-3 text-4xl font-display text-primary sm:text-5xl">Business superschopnosti na dosah.</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Každá dvojica tímov má svojho mentora. Na hover sa profil prepne z monochromu do farieb a ukáže superschopnosť,
              tip dňa a oblasť, ktorú vedie.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-white px-4 py-2 text-xs uppercase tracking-[0.35em] text-primary">
            <Sparkles className="h-4 w-4 text-accent" />
            hover to reveal
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[32px] border border-border/80 bg-card shadow-[0_35px_80px_rgba(12,18,36,0.15)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={mentor.image} alt={mentor.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a18]/90 via-[#050a18]/40 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 rounded-2xl bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.45em] text-white">
                  {mentor.power}
                </div>
              </div>
              <div className="space-y-2 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate">{mentor.role}</p>
                <h3 className="text-2xl font-display text-primary">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground">„{mentor.quote}“</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorShowcase;
