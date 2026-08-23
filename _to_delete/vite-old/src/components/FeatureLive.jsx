import { useLang } from "../i18n.jsx";
import PhoneMockup from "./PhoneMockup.jsx";
import Reveal from "./Reveal.jsx";

const EMOJIS = [
  { e: "👍", top: "5%", left: "-16%", size: 52, delay: "0s" },
  { e: "😂", top: "21%", left: "-4%", size: 64, delay: "0.5s" },
  { e: "👍", top: "38%", left: "-18%", size: 44, delay: "1s" },
  { e: "😡", top: "-6%", left: "12%", size: 40, delay: "1.5s" },
  { e: "🥰", top: "54%", left: "-10%", size: 40, delay: "0.8s" },
];

export default function FeatureLive() {
  const { t } = useLang();

  return (
    <section className="section section-live" id="live">
      <div className="container">
        <Reveal as="h2" className="section-title">
          {t("live_title")}
        </Reveal>

        <div className="feature-stage">
          <Reveal>
            {/* 스크린샷 교체: public/assets/screen-camera.png */}
            <PhoneMockup src="/assets/screen-camera.png" alt={t("live_guide")} tilt="l" light />
          </Reveal>

          <div style={{ position: "relative" }}>
            {EMOJIS.map((x, i) => (
              <span
                key={i}
                className="emoji-float"
                style={{
                  top: x.top,
                  left: x.left,
                  width: x.size,
                  height: x.size,
                  fontSize: x.size * 0.55,
                  animationDelay: x.delay,
                }}
              >
                {x.e}
              </span>
            ))}
            <Reveal delay={150}>
              {/* 스크린샷 교체: public/assets/screen-live.png */}
              <PhoneMockup src="/assets/screen-live.png" alt={t("live_shotview")} tilt="r" />
            </Reveal>
          </div>

          <Reveal delay={250}>
            <div className="share-chips" style={{ maxWidth: 260 }}>
              <p className="callout">
                {t("live_point_code")} <span className="arrow">→</span>
              </p>
              <div className="float-card join-card">
                <h4>{t("live_join_title")}</h4>
                <p>{t("live_join_desc")}</p>
                <label>{t("live_join_code")}</label>
                <div className="join-input">{t("live_join_placeholder")}</div>
                <div className="join-actions">
                  <span className="join-cancel">{t("live_join_cancel")}</span>
                  <span className="join-ok">{t("live_join_ok")}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="feature-notes">
          <Reveal>
            <div className="float-card participants-card">
              <div className="row">
                <span className="avatar" />
                <b>{t("live_participants")}</b>
              </div>
              <div className="end">{t("live_endroom")}</div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="callout" style={{ marginTop: 24 }}>
              {t("live_point_reaction")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
