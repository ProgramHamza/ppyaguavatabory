import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "@/components/ContactForm";
import RegistrationForm from "@/components/RegistrationForm";

vi.mock("@/lib/env", async () => {
  const actual = await vi.importActual<typeof import("@/lib/env")>("@/lib/env");
  return {
    ...actual,
    contactEmail: "kontakt@example.com",
    formspreeFormId: "demo123",
  };
});

describe("registration form", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("validates required fields", async () => {
    render(<RegistrationForm />);

    fireEvent.click(screen.getByRole("button", { name: /Odoslať prihlášku/i }));

    expect(await screen.findByText(/Zadajte meno rodiča/i)).toBeInTheDocument();
    expect(screen.getByText(/Vyberte preferovaný termín/i)).toBeInTheDocument();
    expect(screen.getByText(/Potrebujeme súhlas/i)).toBeInTheDocument();
  });

  it("submits successfully to Formspree", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Meno rodiča/i), { target: { value: "Jana Nováková" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "jana@example.com" } });
    fireEvent.change(screen.getByLabelText(/Telefón/i), { target: { value: "+421900000000" } });
    fireEvent.change(screen.getByLabelText(/Meno dieťaťa/i), { target: { value: "Adam Novák" } });
    fireEvent.change(screen.getByLabelText(/Vek dieťaťa/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/Preferovaný termín/i), { target: { value: "july-1" } });
    fireEvent.change(screen.getByLabelText(/Poznámka alebo otázka/i), { target: { value: "Tešíme sa." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Odoslať prihlášku/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://formspree.io/f/demo123");
    expect(await screen.findByText(/Prihláška bola odoslaná/i)).toBeInTheDocument();
  });

  it("shows an error when Formspree fails", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ errors: [{ message: "Formspree chyba" }] }),
    } as Response);

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Meno rodiča/i), { target: { value: "Jana Nováková" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "jana@example.com" } });
    fireEvent.change(screen.getByLabelText(/Telefón/i), { target: { value: "+421900000000" } });
    fireEvent.change(screen.getByLabelText(/Meno dieťaťa/i), { target: { value: "Adam Novák" } });
    fireEvent.change(screen.getByLabelText(/Vek dieťaťa/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/Preferovaný termín/i), { target: { value: "july-1" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Odoslať prihlášku/i }));

    expect(await screen.findByText(/Prihlášku sa nepodarilo odoslať/i)).toBeInTheDocument();
    expect(screen.getByText(/Formspree chyba/i)).toBeInTheDocument();
    expect(screen.getByText(/kontakt@example.com/i)).toBeInTheDocument();
  });
});

describe("contact form", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("contains only contact fields and opens an email flow", async () => {
    const openMock = vi.spyOn(window, "open").mockImplementation(() => null);

    render(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/^Meno$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Správa/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Meno dieťaťa/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Meno$/i), { target: { value: "Jana Nováková" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "jana@example.com" } });
    fireEvent.change(screen.getByLabelText(/Správa/i), { target: { value: "Chcem sa opýtať na tábor." } });
    fireEvent.click(screen.getByRole("button", { name: /Poslať správu/i }));

    await waitFor(() => {
      expect(openMock).toHaveBeenCalledTimes(1);
    });

    expect(openMock.mock.calls[0]?.[0]).toContain("mailto:kontakt@example.com");
    expect(openMock.mock.calls[0]?.[1]).toBe("_self");
  });
});
