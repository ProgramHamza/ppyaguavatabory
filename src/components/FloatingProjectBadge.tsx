import { useEffect, useState } from "react";
import { X } from "lucide-react";
import GeneratedFFIcon from "./GeneratedFFIcon";

const STORAGE_KEY = "ff-mini-project-badge-hidden";

const FloatingProjectBadge = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const isHidden = window.localStorage.getItem(STORAGE_KEY) === "true";
    setHidden(isHidden);
  }, []);

  const handleClose = () => {
    setHidden(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed left-3 top-3 z-[90]">
      <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-background/85 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <GeneratedFFIcon className="h-6 w-6" />
        <span className="text-xs font-semibold text-foreground/88">Future Foudners Mini</span>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md p-1 text-foreground/60 transition hover:bg-primary/10 hover:text-foreground"
          aria-label="Zatvoriť badge"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default FloatingProjectBadge;
