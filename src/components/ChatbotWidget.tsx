import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, SendHorizonal, X } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const quickPrompts = [
  "Je tábor vhodný pre začiatočníkov?",
  "Koľko trvá jeden deň?",
  "Ako vyzerá posledný deň?",
];

const getBotReply = (text: string) => {
  const n = text.toLowerCase();
  if (n.includes("začiatočník") || n.includes("neviem") || n.includes("vhodný"))
    return "Samozrejme! Začíname od nuly. Mentori pracujú s každým dieťaťom individuálne.";
  if (n.includes("trvá") || n.includes("čas") || n.includes("deň"))
    return "Program prebieha od 8:00 do 17:00. Dopoludnia práca na projekte, popoludní hry a šport.";
  if (n.includes("posledný") || n.includes("piatok") || n.includes("pitch"))
    return "V piatok je Pitch Day — deti prezentujú svoj projekt pred rodičmi a hosťami. Srdečne vás pozývame!";
  if (n.includes("strava") || n.includes("jedlo"))
    return "Strava je zahrnutá v cene — 3 jedlá denne + ovocný bar. Vieme riešiť intolerancie.";
  if (n.includes("cena") || n.includes("koľko") || n.includes("stojí"))
    return "Cena sa pohybuje od 390€ v závislosti od turnusu. Zahŕňa stravu, materiály aj poistenie.";
  return "Ďakujem za otázku! Pre viac informácií nás kontaktujte na mimoriadni@gmail.com.";
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: "Dobrý deň! Som tu pre vás. Spýtajte sa čokoľvek o BusinessCampe." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const handleSend = (customText?: string) => {
    const text = (customText ?? input).trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
    const reply = getBotReply(text);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", text: reply }]);
    }, 500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-panel mb-3 w-80 overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Bot className="h-4 w-4 text-white/40" />
                BusinessCamp asistent
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

            <div ref={scrollRef} className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 ${
                      m.from === "user"
                        ? "bg-white text-black"
                        : "bg-white/[0.06] text-white/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.08] px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSend(p)}
                    className="rounded-lg border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/40 transition hover:border-white/20 hover:text-white/70"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  className="glass-input h-10 flex-1 rounded-xl px-4 text-sm"
                  placeholder="Napíšte otázku..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90"
                  aria-label="Odoslať"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition hover:bg-white/90"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatbotWidget;
