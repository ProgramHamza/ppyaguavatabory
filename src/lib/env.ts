const FALLBACK_CONTACT_EMAIL = "you@example.com";

export const showImages = import.meta.env.VITE_OBRAZKY === "1";
export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || FALLBACK_CONTACT_EMAIL;
export const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || "";
