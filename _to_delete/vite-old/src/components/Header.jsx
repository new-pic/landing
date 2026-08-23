import { useEffect, useState } from "react";
import { SUPPORTED_LANGS, useLang } from "../i18n.jsx";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="logo">
          <img src="/favicon.svg" alt="" />
          Newpic
        </a>
        <nav className="nav">
          <a className="nav-link" href="#live">
            {t("nav_live")}
          </a>
          <a className="nav-link" href="#share">
            {t("nav_share")}
          </a>
          <a className="nav-link" href="#download">
            {t("nav_download")}
          </a>
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
          >
            {SUPPORTED_LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}
