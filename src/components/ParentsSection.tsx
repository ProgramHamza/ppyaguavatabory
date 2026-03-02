import { MapPin, UtensilsCrossed, Clock3, ShieldCheck, HeartHandshake } from "lucide-react";

const parentInfo = [
  {
    icon: MapPin,
    label: "Lokalita",
    value: "Bratislava · Staré Mesto",
    detail: "Kampus Umelka, bezpečné prostredie s vlastným dvorom.",
  },
  {
    icon: UtensilsCrossed,
    label: "Strava",
    value: "3× denne",
    detail: "Brain-food menu + ovocný bar a pitný režim.",
  },
  {
    icon: Clock3,
    label: "Čas",
    value: "08:00 – 17:00",
    detail: "Možnosť skoršieho príchodu a neskoršieho odchodu.",
  },
  {
    icon: ShieldCheck,
    label: "Dozor",
    value: "Mentori + animátori",
    detail: "Každá skupina má 2 dospelých s certifikáciou.",
  },
  {
    icon: HeartHandshake,
    label: "Bezpečnosť",
    value: "Poistenie v cene",
    detail: "Zdravotník on-site, kontaktná linka pre rodičov.",
  },
];

const ParentsSection = () => {
  return (
    <section className="bg-secondary py-24" id="parents">
      <div className="container">
        <p className="text-xs uppercase tracking-[0.45em] text-foreground/60">Pre rodičov</p>
        <h2 className="mt-4 text-4xl font-display text-primary">Transparentná logistika & bezpečnosť.</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
          Biznis časť je seriózna, ale rovnako vážne berieme dohľad, stravu a komunikačné kanály. Všetko, čo by mama chcela
          vedieť, je tu.
        </p>
        <div className="parent-table mt-10 grid gap-6 rounded-[32px] bg-white/90 p-8 md:grid-cols-2">
          {parentInfo.map((item) => (
            <div key={item.label} className="flex gap-4 rounded-2xl border border-border/70 bg-white/80 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{item.label}</p>
                <p className="text-xl font-display text-primary">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;
