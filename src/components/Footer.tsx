const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#040813] py-14">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-semibold tracking-tight text-white">
            BusinessCamp
          </div>
          <p className="mt-3 text-sm text-white/65">
            Denný podnikateľský tábor pre 11 – 15 ročných v Bratislave. Seriózna príprava na strednú a prvé startupové
            kontakty.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Kontakt</p>
          <div className="mt-3 space-y-2 text-sm text-white/80">
            <a href="mailto:hello@businesscamp.sk" className="hover:text-white">
              hello@businesscamp.sk
            </a>
            <a href="tel:+421900000000" className="block hover:text-white">
              +421 900 000 000
            </a>
            <p>Prievozská 14, Bratislava</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Navigácia</p>
          <div className="mt-3 space-y-2 text-sm text-white/80">
            <a href="#program" className="block hover:text-white">
              Program
            </a>
            <a href="#dennyplan" className="block hover:text-white">
              Denný rytmus
            </a>
            <a href="#terminy" className="block hover:text-white">
              Termíny
            </a>
            <a href="#prihlaska" className="block hover:text-white">
              Prihláška
            </a>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs uppercase tracking-[0.4em] text-white/50">
        © 2026 BusinessCamp Bratislava
      </p>
    </footer>
  );
};

export default Footer;
