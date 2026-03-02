import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, SendHorizonal, X } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const quickPrompts = [
  "Nevadí, že som úplný začiatočník?",
  "Koľko trvá jeden deň?",
  "Ako vyzerá Pitch Day?",
];

const getBotReply = (text: string) => {
  const normalized = text.toLowerCase();
  if (normalized.includes("začiatočník") || normalized.includes("neviem")) {
    return "Jasné, začíname úplne od nuly. Mentori ti ukážu základy a tím ťa potiahne.";
  }
  if (normalized.includes("trvá") || normalized.includes("čas")) {
    return "Program beží od 8:30 do 17:00. Ráno deep work, poobede šport alebo questy.";
  }
  if (normalized.includes("pitch") || normalized.includes("piatok")) {
    return "Pitch Day je piatkové popoludnie. Pred rodičmi a hosťami ukážeš prototyp aj čísla.";
  }
  if (normalized.includes("strava") || normalized.includes("jedlo")) {
    return "Brain-food catering = 3 jedlá denne + snacky. Vieme riešiť intolerancie.";
  }
  return "Som Elon-bot. Pošlem ťa na call s mentorom, ak potrebujete viac detailov.";
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Ahoj, ja som Elon-bot. Spýtaj sa na BusinessCamp a ja ťa navediem.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend();
  };

  const helperText = useMemo(() => (open ? "Poď sa opýtať" : "Spýtaj sa Elona"), [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-3 w-80 rounded-3xl border border-border/80 bg-background shadow-[0_25px_70px_rgba(5,10,24,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Bot className="h-4 w-4 text-mint" />
                Elon-bot · AI concierge
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground transition hover:bg-muted/40"
                aria-label="Zatvoriť chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div ref={scrollRef} className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-3 py-2 ${
                      message.from === "user"
                        ? "bg-primary text-white"
                        : "bg-secondary text-primary"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/70 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  className="h-11 flex-1 rounded-full border border-border/80 bg-transparent px-4 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Spýtaj sa …"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90"
                  aria-label="Odoslať správu"
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
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff875c] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(255,107,53,0.45)]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <MessageCircle className="h-5 w-5" />
        </span>
        {helperText}
      </button>
    </div>
  );
};

export default ChatbotWidget;
