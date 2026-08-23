"use client";

import { useLang } from "./i18n.jsx";
import Reveal from "./Reveal.jsx";

export default function Steps() {
  const { t } = useLang();
  const steps = [
    { n: 1, title: t("step1_t"), desc: t("step1_d") },
    { n: 2, title: t("step2_t"), desc: t("step2_d") },
    { n: 3, title: t("step3_t"), desc: t("step3_d") },
  ];

  return (
    <section className="section section-steps">
      <div className="container">
        <Reveal as="h2" className="section-title">
          {t("steps_title")}
        </Reveal>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140}>
              <div className="step-card">
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
