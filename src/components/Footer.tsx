const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-14">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold text-white">BusinessCamp</div>
          <p className="mt-3 text-sm leading-relaxed text-white/35">
            Letný denný tábor pre deti 11 &#8211; 15 rokov v Bratislave. Podnikanie, tvorba produktu a prvé tímové skúsenosti.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/30">Kontakt</p>
          <div className="mt-3 space-y-2 text-sm text-white/50">
            <a href="mailto:mimoriadni@gmail.com" className="block transition hover:text-white">
              mimoriadni@gmail.com
            </a>
            <a href="tel:+421900000000" className="block transition hover:text-white">
              +421 900 000 000
            </a>
            <p>Bratislava</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/30">Navigácia</p>
          <div className="mt-3 space-y-2 text-sm text-white/50">
            <a href="#program" className="block transition hover:text-white">Program</a>
            <a href="#dennyplan" className="block transition hover:text-white">Denný plán</a>
            <a href="#terminy" className="block transition hover:text-white">Termíny</a>
            <a href="#kontakt" className="block transition hover:text-white">Kontakt</a>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs uppercase tracking-widest text-white/20">
        &#169; 2026 BusinessCamp Bratislava
      </p>
    </footer>
  );
};

export default Footer;
