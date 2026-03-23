import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { campTerms } from "@/content/siteContent";
import { contactEmail, formspreeFormId } from "@/lib/env";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const registrationSchema = z.object({
  parentName: z.string().min(2, "Zadajte meno rodiča."),
  parentEmail: z.string().email("Zadajte platný e-mail."),
  parentPhone: z.string().min(7, "Zadajte telefónne číslo."),
  childName: z.string().min(2, "Zadajte meno dieťaťa."),
  childAge: z
    .coerce.number()
    .int("Zadajte celý vek.")
    .min(8, "Tábor je určený pre deti od 8 rokov.")
    .max(14, "Tábor je určený pre deti do 14 rokov."),
  preferredTerm: z.string().min(1, "Vyberte preferovaný termín."),
  notes: z.string().optional(),
  contactConsent: z.boolean().refine((value) => value, "Potrebujeme súhlas, aby sme vás mohli kontaktovať."),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAge: 8,
      preferredTerm: "",
      notes: "",
      contactConsent: false,
    },
  });

  const termOptions = useMemo(() => {
    return campTerms.map((term) => ({
      value: term.id,
      label: term.status && term.status !== "open" ? `${term.label}` : term.label,
    }));
  }, []);

  const onSubmit = async (values: RegistrationFormValues) => {
    setSubmitState("idle");
    setErrorMessage("");

    if (!formspreeFormId) {
      setSubmitState("error");
      setErrorMessage("Formulár zatiaľ nie je technicky prepojený. Doplňte VITE_FORMSPREE_FORM_ID.");
      return;
    }

    const selectedTerm = campTerms.find((term) => term.id === values.preferredTerm);
    const payload = new FormData();
    payload.append("parentName", values.parentName);
    payload.append("parentEmail", values.parentEmail);
    payload.append("parentPhone", values.parentPhone);
    payload.append("childName", values.childName);
    payload.append("childAge", String(values.childAge));
    payload.append("preferredTerm", selectedTerm?.label ?? values.preferredTerm);
    payload.append("notes", values.notes || "");
    payload.append("contactConsent", values.contactConsent ? "Áno" : "Nie");
    payload.append("_subject", "Nová prihláška - Future Founders Mini");

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        let providerMessage = "Odoslanie sa nepodarilo. Skúste to prosím znova.";
        try {
          const data = (await response.json()) as { errors?: Array<{ message?: string }> };
          providerMessage = data.errors?.[0]?.message || providerMessage;
        } catch {
          providerMessage = "Odoslanie sa nepodarilo. Skúste to prosím znova.";
        }
        throw new Error(providerMessage);
      }

      setSubmitState("success");
      reset();
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Odoslanie sa nepodarilo. Skúste to prosím znova.");
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-[2rem] border border-primary/20 bg-white/80 p-8 shadow-[0_28px_70px_rgba(245,166,35,0.08)] backdrop-blur-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-foreground">Prihláška bola odoslaná.</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground/72">
          Ďakujeme. Prihlášku sme prijali a ozveme sa vám na uvedený kontakt, keď budeme mať ďalšie organizačné informácie.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-primary/20 bg-white/80 p-8 shadow-[0_28px_70px_rgba(245,166,35,0.08)] backdrop-blur-sm md:p-10">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">Prihláška</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Prihláste jedno dieťa cez jednoduchý vstupný formulár.</h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/72">
          Tento formulár slúži na vyjadrenie záujmu o tábor a na prvý kontakt. Ak máte všeobecnú otázku, použite radšej kontaktný
          formulár na hlavnej stránke.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="parentName" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Meno rodiča
            </label>
            <Input id="parentName" {...register("parentName")} className="glass-input h-12 rounded-xl border-primary/20 px-4" />
            {errors.parentName ? <p className="text-sm font-medium text-destructive">{errors.parentName.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="parentEmail" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Email
            </label>
            <Input
              id="parentEmail"
              type="email"
              {...register("parentEmail")}
              className="glass-input h-12 rounded-xl border-primary/20 px-4"
            />
            {errors.parentEmail ? <p className="text-sm font-medium text-destructive">{errors.parentEmail.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="parentPhone" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Telefón
            </label>
            <Input id="parentPhone" {...register("parentPhone")} className="glass-input h-12 rounded-xl border-primary/20 px-4" />
            {errors.parentPhone ? <p className="text-sm font-medium text-destructive">{errors.parentPhone.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="childName" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Meno dieťaťa
            </label>
            <Input id="childName" {...register("childName")} className="glass-input h-12 rounded-xl border-primary/20 px-4" />
            {errors.childName ? <p className="text-sm font-medium text-destructive">{errors.childName.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="childAge" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Vek dieťaťa
            </label>
            <Input
              id="childAge"
              type="number"
              min={8}
              max={14}
              {...register("childAge")}
              className="glass-input h-12 rounded-xl border-primary/20 px-4"
            />
            {errors.childAge ? <p className="text-sm font-medium text-destructive">{errors.childAge.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredTerm" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
              Preferovaný termín
            </label>
            <select
              id="preferredTerm"
              {...register("preferredTerm")}
              className="glass-input h-12 w-full rounded-xl border border-primary/20 px-4 text-sm text-foreground"
            >
              <option value="">Vyberte termín</option>
              {termOptions.map((term) => (
                <option key={term.value} value={term.value}>
                  {term.label}
                </option>
              ))}
            </select>
            {errors.preferredTerm ? <p className="text-sm font-medium text-destructive">{errors.preferredTerm.message}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-xs font-medium uppercase tracking-widest text-foreground/55">
            Poznámka alebo otázka
          </label>
          <Textarea
            id="notes"
            rows={5}
            {...register("notes")}
            className="glass-input min-h-[132px] rounded-xl border-primary/20 px-4 py-3"
            placeholder="Ak nám chcete doplniť dôležitú poznámku, napíšte ju sem."
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4 text-sm leading-relaxed text-foreground/76">
          <input type="checkbox" {...register("contactConsent")} className="mt-1 h-4 w-4 rounded border-primary/30 accent-[hsl(var(--primary))]" />
          <span>Súhlasím s tým, aby ma organizátori kontaktovali v súvislosti s prihláškou a ďalšími informáciami o tábore.</span>
        </label>
        {errors.contactConsent ? <p className="text-sm font-medium text-destructive">{errors.contactConsent.message}</p> : null}

        {submitState === "error" ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-4 text-sm leading-relaxed text-foreground/78">
            <p className="font-semibold text-destructive">Prihlášku sa nepodarilo odoslať.</p>
            <p className="mt-2">{errorMessage}</p>
            <p className="mt-2">
              Ak problém pretrváva, napíšte nám na <a href={`mailto:${contactEmail}`} className="font-semibold text-primary">{contactEmail}</a>.
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Odosielam prihlášku
            </>
          ) : (
            <>
              Odoslať prihlášku
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
