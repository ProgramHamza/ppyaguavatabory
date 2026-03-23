import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("app routing", () => {
  it("renders the homepage on /", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Skúsi nápad v praxi/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Čo chceme deťom počas tábora priniesť/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Ľudia, ktorí chcú tento tábor postaviť poctivo/i })).toBeInTheDocument();
  });

  it("renders the registration page on /prihlaska", async () => {
    window.history.pushState({}, "", "/prihlaska");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Prihláška do Future Founders Mini/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Odoslať prihlášku/i })).toBeInTheDocument();
  });

  it("renders the not found page for unknown routes", async () => {
    window.history.pushState({}, "", "/neexistuje");
    render(<App />);

    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument();
  });
});
