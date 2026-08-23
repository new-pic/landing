"use client";

import { useLang } from "./i18n.jsx";

const DECOR = [
  { top: "12%", left: "-6%", size: 220 },
  { bottom: "-8%", right: "-4%", size: 320 },
  { top: "58%", left: "38%", size: 90 },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="top">
      {DECOR.map((d, i) => (
        <span
          key={i}
          className="hero-decor"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            width: d.size,
            height: d.size,
          }}
        />
      ))}
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="bubble">{t("hero_bubble")}</span>
          <h1 className="wordmark">Newpic</h1>
          <p className="hero-tagline">{t("hero_tagline")}</p>
          <p className="hero-sub">{t("hero_sub")}</p>
          <div className="hero-cta-row" id="download">
            <button className="btn-primary" type="button">
              📸 {t("hero_cta")}
            </button>
            <span className="hero-cta-sub">{t("hero_cta_sub")}</span>
          </div>
        </div>
        <div className="hero-visual">
          <span className="spark" style={{ top: "8%", left: "14%" }}>
            ✨
          </span>
          <span className="spark" style={{ bottom: "14%", right: "10%", animationDelay: "0.8s" }}>
            💖
          </span>
          <span className="spark" style={{ top: "20%", right: "4%", animationDelay: "1.4s" }}>
            ⭐
          </span>
          {/* 마스코트 — public/assets/mascot.png 교체 시 그대로 반영 */}
          <img className="mascot" src="/assets/mascot.png" alt="Newpic 카메라 마스코트" />
        </div>
      </div>
    </section>
  );
}
