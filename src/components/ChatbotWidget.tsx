import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, MapPin, SendHorizonal, Sparkles, X } from "lucide-react";
import BrandMark from "./BrandMark";
import { contactEmail } from "@/lib/env";

type MessageAuthor = "bot" | "user";

interface Action {
  label: string;
  href?: string;
  prompt?: string;
}

interface Message {
  id: number;
  from: MessageAuthor;
  text: string;
  actions?: Action[];
}

interface Intent {
  id: string;
  keywords: string[];
  answer: string;
  actions?: Action[];
}

const quickPrompts = [
  "Je tábor vhodný pre 8-ročné dieťa?",
  "Čo deti na tábore zažijú?",
  "Kto tábor podporuje?",
  "Ako prihlásim dieťa?",
];

const intents: Intent[] = [
  {
    id: "beginners",
    keywords: ["zaciatocnik", "zaciatocnici", "prvykrat", "vhodny", "skusenosti", "neviem"],
    answer:
      "Áno. Future Founders Mini pripravujeme aj pre deti bez predchádzajúcich skúseností. Dôležitá je zvedavosť, chuť skúšať nové veci a vek približne 8–14 rokov.",
    actions: [{ label: "Pozrieť program", href: "#program" }],
  },
  {
    id: "program-output",
    keywords: ["den", "harmonogram", "program", "co", "zazije", "vytvori", "deti"],
    answer:
      "Program chceme postaviť na tvorbe, tímovej práci, prezentácii nápadu a kontakte s ľuďmi z praxe. Nejde o prehnane detailný podnikateľský simulátor, ale o poctivo vedený detský tábor.",
    actions: [{ label: "Program", href: "#program" }],
  },
  {
    id: "supporters",
    keywords: ["partneri", "sponzori", "supporteri", "podporovatelia", "mentori", "mentor"],
    answer:
      "Podporovatelia sú pre nás dôležití aj preto, že niektorí z nich môžu priamo mentorovať deti alebo nám pomáhajú mentorov do programu sprostredkovať.",
    actions: [{ label: "Partneri", href: "#partneri" }],
  },
  {
    id: "price",
    keywords: ["cena", "stoji", "kolko", "eur", "platba"],
    answer:
      "Ak máte záujem o tábor, najistejšia cesta je vyplniť prihlášku. Následne sa vám ozveme s ďalšími detailmi o termínoch a organizácii.",
    actions: [{ label: "Prihláška", href: "/prihlaska" }],
  },
  {
    id: "about",
    keywords: ["tim", "organizatori", "o nas", "kto", "ludia"],
    answer:
      "Na stránke nájdete aj sekciu O nás, kde chceme jasne ukázať, kto za táborom stojí a s akou motiváciou ho pripravuje.",
    actions: [{ label: "O nás", href: "#o-nas" }],
  },
  {
    id: "location",
    keywords: ["kde", "adresa", "lokalita", "zello", "zellova", "bratislava", "mapa"],
    answer:
      "Tábor pripravujeme v Bratislave na leto 2026. Konkrétne organizačné informácie budeme posielať prihláseným rodičom.",
    actions: [
      { label: "Prihláška", href: "/prihlaska" },
    ],
  },
  {
    id: "reservation",
    keywords: ["rezervacia", "prihlaska", "prihlasit", "miesto", "termin", "kontaktujte"],
    answer:
      "Prihlásenie dieťaťa prebieha cez samostatnú stránku prihlášky. Kontaktný formulár na hlavnej stránke je určený len na otázky.",
    actions: [
      { label: "Otvoriť prihlášku", href: "/prihlaska" },
      { label: "Napísať email", href: `mailto:${contactEmail}` },
    ],
  },
  {
    id: "contact",
    keywords: ["email", "telefon", "kontakt", "ozvat", "napisat"],
    answer:
      `Môžete nám napísať na ${contactEmail} alebo vyplniť kontaktný formulár priamo na stránke. Odpovedáme čo najskôr.`,
    actions: [
      { label: "Kontaktný formulár", href: "#kontakt" },
      { label: "Napísať email", href: `mailto:${contactEmail}` },
    ],
  },
];

const defaultReply: Message = {
  id: 0,
  from: "bot",
  text:
    "Tomuto som úplne presne nerozumel, ale viem pomôcť s programom, partnermi, tímom alebo prihláškou.",
    actions: [
      { label: "Pozrieť program", href: "#program" },
      { label: "Prihláška", href: "/prihlaska" },
      { label: "Napísať email", href: `mailto:${contactEmail}` },
    ],
};

const initialMessages: Message[] = [
  {
    id: 1,
    from: "bot",
    text:
      "Dobrý deň. Som asistent Future Founders Mini a odpoviem na otázky o programe, partneroch, tíme alebo prihláške.",
    actions: [
      { label: "Čo deti zažijú?", prompt: "Čo deti na tábore zažijú?" },
      { label: "Kto tábor podporuje?", prompt: "Kto tábor podporuje?" },
    ],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const scoreIntent = (input: string, intent: Intent) => {
  const normalized = normalize(input);
  return intent.keywords.reduce((score, keyword) => {
    if (normalized.includes(keyword)) {
      return score + Math.max(2, keyword.length / 4);
    }
    return score;
  }, 0);
};

const getBotReply = (text: string): Message => {
  const bestMatch = intents
    .map((intent) => ({ intent, score: scoreIntent(text, intent) }))
    .sort((left, right) => right.score - left.score)[0];

  if (!bestMatch || bestMatch.score < 2) {
    return { ...defaultReply, id: Date.now() + 1 };
  }

  return {
    id: Date.now() + 1,
    from: "bot",
    text: bestMatch.intent.answer,
    actions: bestMatch.intent.actions,
  };
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(100);

  const statusText = useMemo(() => {
    if (isTyping) {
      return "Asistent píše...";
    }
    return "Online bez API kľúča";
  }, [isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  const appendBotReply = (text: string) => {
    const reply = getBotReply(text);
    const delay = Math.min(1100, Math.max(350, reply.text.length * 8));

    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { ...reply, id: nextIdRef.current++ }]);
      setIsTyping(false);
    }, delay);
  };

  const handleSend = (customText?: string) => {
    const text = (customText ?? input).trim();
    if (!text || isTyping) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: nextIdRef.current++, from: "user", text },
    ]);
    setInput("");
    appendBotReply(text);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const renderAction = (action: Action) => {
    if (action.href) {
      const external = action.href.startsWith("http") || action.href.startsWith("mailto:");
      return (
        <a
          key={action.label}
          href={action.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-white/55 transition hover:border-white/20 hover:text-white"
        >
          {action.label}
          {external ? <ExternalLink className="h-3 w-3" /> : null}
        </a>
      );
    }

    return (
      <button
        key={action.label}
        type="button"
        onClick={() => handleSend(action.prompt)}
        className="rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-white/55 transition hover:border-white/20 hover:text-white"
      >
        {action.label}
      </button>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="glass-panel mb-3 w-[22rem] overflow-hidden rounded-2xl sm:w-[25rem]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <BrandMark className="h-5 w-5" letterClassName="text-sm" />
                  Future Founders Mini asistent
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/35">
                  <Sparkles className="h-3 w-3" />
                  {statusText}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/30 transition hover:bg-white/10 hover:text-white"
                aria-label="Zatvoriť"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="max-h-96 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[88%]">
                    <div
                      className={`rounded-2xl px-3 py-2.5 leading-relaxed ${
                        message.from === "user"
                          ? "bg-white text-black"
                          : "bg-white/[0.06] text-white/82"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.actions?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {message.actions.map(renderAction)}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white/[0.06] px-3 py-2 text-white/55">
                    <span className="inline-flex gap-1 align-middle">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/[0.08] px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-lg border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/40 transition hover:border-white/20 hover:text-white/70"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  className="glass-input h-11 flex-1 rounded-xl px-4 text-sm"
                  placeholder="Napíšte otázku o tábore..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Odoslať"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/28">
                <MapPin className="h-3 w-3" />
                Bratislava · Leto 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition hover:bg-white/90"
        aria-label="Otvoriť chat asistenta"
      >
        <BrandMark className="h-7 w-7" letterClassName="text-base" />
      </button>
    </div>
  );
};

export default ChatbotWidget;
