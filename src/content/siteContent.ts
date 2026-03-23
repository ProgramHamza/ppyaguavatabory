import campOverviewImageSrc from "@/assets/hero-academy.jpg";
import teamPhotoOne from "@/assets/IMG_5964.JPG";
import teamPhotoTwo from "@/assets/IMG_6207.JPG";
import teamPhotoThree from "@/assets/IMG_6383.JPG";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type Partner = {
  id: string;
  kind: "sponsor" | "supporter";
  name: string;
  logo: string;
  blurb: string;
  mentorRole?: string;
  href?: string;
};

export type CampTerm = {
  id: string;
  label: string;
  status?: "open" | "waitlist" | "planned";
};

export const heroFacts = [
  "Denný letný tábor v Bratislave",
  "Pre deti vo veku 8 až 14 rokov",
  "Malá skupina a veľa praktickej práce",
];

export const overviewItems = [
  {
    title: "Čo deti počas týždňa zažijú",
    description:
      "Deti budú v tímoch premýšľať nad nápadom, tvoriť jednoduchý produkt, skúšať prezentáciu a hovoriť o tom, ako funguje spolupráca, hodnota a peniaze.",
  },
  {
    title: "Čo si z tábora odnesú",
    description:
      "Chceme rozvíjať samostatnosť, komunikáciu, kreativitu a odvahu skúšať nové veci. Dôležitý je zážitok z tvorby, nie naučené frázy o podnikaní.",
  },
  {
    title: "Čo môžu čakať rodičia",
    description:
      "Jasnú komunikáciu, menšiu skupinu a program, v ktorom sa deti aktívne zapájajú. Nejde o prednášky, ale o vedenú prax primeranú veku.",
  },
];

export const campOverviewImage = {
  src: campOverviewImageSrc,
  alt: "Deti pracujúce spolu počas programu Future Founders Mini",
};

export const partners: Partner[] = [
  {
    id: "future-founders",
    kind: "sponsor",
    name: "Future Founders",
    logo: "/sponsors/logo-future.png",
    blurb: "Podporuje vznik programu a pomáha nám postaviť dôveryhodné zázemie pre prvý ročník tábora.",
  },
  {
    id: "spmndag",
    kind: "sponsor",
    name: "SpMNDaG",
    logo: "/sponsors/logo-full.svg",
    blurb: "Pomáha nám s materiálnym a organizačným zázemím, aby sa deti mohli sústrediť na samotný program.",
  },
  {
    id: "the-spot",
    kind: "supporter",
    name: "The SPOT",
    logo: "/sponsors/images (6).png",
    blurb: "Podporuje prepojenie programu s praxou a pomáha nám rozšíriť sieť ľudí, ktorí sa môžu do tábora zapojiť.",
    mentorRole: "Podpora pri hľadaní mentorov a hostí z praxe.",
  },
  {
    id: "nacero",
    kind: "supporter",
    name: "NaCeRo",
    logo: "/sponsors/images (3).jpg",
    blurb: "Pomáha nám, aby deti stretli ľudí, ktorí vedia odovzdať skúsenosť z reálneho pracovného a podnikateľského prostredia.",
    mentorRole: "Podpora mentorov a odborných vstupov do programu.",
  },
  {
    id: "aerostacks",
    kind: "supporter",
    name: "Aerostacks",
    logo: "/sponsors/6s6wc4jsyk7XAMRuLolFGftq0.webp",
    blurb: "Zapája sa do podpory programu tak, aby mali deti kontakt s ľuďmi, ktorí pracujú na reálnych projektoch.",
    mentorRole: "Možné zapojenie mentorov alebo odporučených mentorov pre tábor.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-member-1",
    name: "Meno organizátora",
    role: "Spoluzakladateľ programu",
    bio: "Sem doplňte krátke predstavenie človeka, jeho skúsenosti s deťmi, vzdelávaním alebo projektmi, ktoré podporujú podnikavosť.",
    image: teamPhotoOne,
  },
  {
    id: "team-member-2",
    name: "Meno organizátorky",
    role: "Program a facilitácia",
    bio: "Sem doplňte bio človeka, ktorý bude priamo pri deťoch a pomáha vytvoriť bezpečné, tvorivé a dobre vedené prostredie.",
    image: teamPhotoTwo,
  },
  {
    id: "team-member-3",
    name: "Meno mentora tímu",
    role: "Obsah a partnerstvá",
    bio: "Sem doplňte bio človeka, ktorý prepája tábor s partnermi, mentormi a praktickou stránkou programu.",
    image: teamPhotoThree,
  },
];

export const campTerms: CampTerm[] = [
  { id: "july-1", label: "Júl 2026 – termín bude upresnený", status: "planned" },
  { id: "august-1", label: "August 2026 – termín bude upresnený", status: "planned" },
];
