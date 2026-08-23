import { useLang } from "../i18n.jsx";

export default function Footer() {
  const { t } = useLang();

  return (
    <>
      <section className="cta">
        <div className="container">
          <h2>{t("cta_title")}</h2>
          <p>{t("cta_sub")}</p>
          <button className="btn-primary" type="button">
            📸 {t("hero_cta")}
          </button>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="logo">
            <img src="/favicon.svg" alt="" />
            Newpic
          </a>
          <span>{t("footer_note")}</span>
          <div className="footer-links">
            <a href="#top">{t("footer_terms")}</a>
            <a href="#top">{t("footer_privacy")}</a>
            <a href="#top">{t("footer_contact")}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
