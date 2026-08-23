"use client";

import { useLang } from "./i18n.jsx";
import PhoneMockup from "./PhoneMockup.jsx";
import Reveal from "./Reveal.jsx";

export default function FeatureShare() {
  const { t } = useLang();

  return (
    <section className="section section-share" id="share">
      <div className="container">
        <Reveal as="h2" className="section-title">
          {t("share_title")}
        </Reveal>

        <div className="feature-stage">
          <Reveal>
            <div className="share-chips" style={{ maxWidth: 250 }}>
              {/* 최근 촬영 사진 카드 — 이미지 교체: public/assets/photo-recent.png */}
              <div className="float-card recent-card">
                <img src="/assets/photo-recent.png" alt={t("share_recent")} loading="lazy" />
                <div className="meta">
                  <b>{t("share_recent")}</b>
                  <span>{t("share_point_saved_sub")}</span>
                </div>
              </div>
              <p className="callout">
                ↑ {t("share_point_saved")} {t("share_point_saved_sub")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/* 스크린샷 교체: public/assets/screen-mypage.png */}
            <PhoneMockup src="/assets/screen-mypage.png" alt="My page" time="10:58" tilt="l" />
          </Reveal>

          <Reveal delay={220}>
            {/* 스크린샷 교체: public/assets/screen-feed.png */}
            <PhoneMockup src="/assets/screen-feed.png" alt="Feed" time="12:41" />
          </Reveal>

          <Reveal delay={320}>
            <div className="share-chips" style={{ maxWidth: 250 }}>
              <p className="callout">{t("share_point_feed")}</p>
              {/* 스크린샷 교체: public/assets/screen-post.png */}
              <PhoneMockup
                src="/assets/screen-post.png"
                alt={t("share_point_register")}
                time="12:55"
                tilt="r"
                style={{ width: 210 }}
              />
              <span className="chip">
                {t("share_uploading")} <span className="bar" />
              </span>
              <span className="chip done">✓ {t("share_done")}</span>
              <p className="callout">↖ {t("share_point_register")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
