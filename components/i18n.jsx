"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────────
 *  Newpic i18n
 *  - IP 기반 자동 언어 감지 (ipapi.co → 실패 시 브라우저 언어 → en)
 *  - 수동 선택 시 localStorage("newpic-lang")에 저장되어 우선 적용
 * ──────────────────────────────────────────────────────────── */

export const SUPPORTED_LANGS = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
];

const COUNTRY_TO_LANG = {
  KR: "ko",
  KP: "ko",
  JP: "ja",
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh",
  IN: "hi",
};

const MESSAGES = {
  ko: {
    langName: "한국어",
    nav_live: "실시간 촬영",
    nav_share: "저장 & 공유",
    nav_download: "다운로드",
    hero_bubble: "이제는 늘 마음에 드는 사진으로!",
    hero_tagline: "사진 한 장을 위해\n수십 번씩 다시 찍지 마세요.",
    hero_sub: "찍히는 내 모습을 실시간으로 확인하고, 리액션으로 함께 고르는 카메라 앱",
    hero_cta: "Newpic 시작하기",
    hero_cta_sub: "곧 App Store에서 만나요",
    live_title: "카메라에 비친 내 모습을 실시간으로 확인해요!",
    live_point_code: "6자리 코드로 촬영에 참여해요!",
    live_point_reaction: "실시간으로 리액션을 보내보세요!",
    live_join_title: "실시간 공유 참여",
    live_join_desc: "호스트 화면에 표시된 6자리 코드를 입력해주세요.",
    live_join_code: "공유 코드",
    live_join_placeholder: "6자리 숫자",
    live_join_cancel: "취소하기",
    live_join_ok: "참여하기",
    live_participants: "참여자 1명",
    live_endroom: "방 종료하기",
    live_guide: "카메라 화면 안에 사람이 보이도록 서 주세요.",
    live_shotview: "사진에 찍히는 내 모습",
    share_title: "찍은 사진을 저장하고 공유해보세요!",
    share_point_feed: "피드 만들기",
    share_point_saved: "저장된 사진을 확인해보세요!",
    share_point_saved_sub: "(24시간 보관)",
    share_point_register: "피드에 등록하기",
    share_recent: "최근 촬영 사진",
    share_uploading: "피드 처리 중 · 57%",
    share_done: "피드 게시 완료",
    steps_title: "Newpic, 이렇게 써요",
    step1_t: "함께 촬영",
    step1_d: "6자리 코드로 친구를 초대하고, 찍히는 모습을 서로의 화면에서 실시간으로 확인해요.",
    step2_t: "리액션으로 고르기",
    step2_d: "베스트 컷에 이모지 리액션을 보내며 그 자리에서 바로 인생샷을 골라요.",
    step3_t: "저장하고 공유",
    step3_d: "고른 사진은 24시간 보관함에 저장되고, 태그와 함께 피드에 공유할 수 있어요.",
    cta_title: "오늘부터, 늘 마음에 드는 사진으로",
    cta_sub: "Newpic과 함께라면 한 번의 촬영으로 충분해요.",
    footer_note: "Newpic — 사진 한 장을 위해 수십 번씩 다시 찍지 마세요.",
    footer_terms: "서비스 약관",
    footer_privacy: "개인정보 처리방침",
    footer_contact: "문의하기",
  },
  en: {
    langName: "English",
    nav_live: "Live Shooting",
    nav_share: "Save & Share",
    nav_download: "Download",
    hero_bubble: "I always get good photos!",
    hero_tagline: "Stop taking hundreds of\nattempts for just one photo.",
    hero_sub: "See yourself on camera in real time and pick the best shot together with live reactions.",
    hero_cta: "Get started with Newpic",
    hero_cta_sub: "Coming soon to the App Store",
    live_title: "Check out how I look on camera!",
    live_point_code: "Join with a 6-digit code!",
    live_point_reaction: "Try sending a real-time reaction!",
    live_join_title: "Join live sharing",
    live_join_desc: "Enter the 6-digit code shown on the host's screen.",
    live_join_code: "Share code",
    live_join_placeholder: "6-digit number",
    live_join_cancel: "Cancel",
    live_join_ok: "Join",
    live_participants: "1 participant",
    live_endroom: "End room",
    live_guide: "Stand so you're visible in the camera frame.",
    live_shotview: "How I look in the photo",
    share_title: "Try saving or sharing the photo!",
    share_point_feed: "Generate feed",
    share_point_saved: "Please check the saved photos!",
    share_point_saved_sub: "(kept for 24h)",
    share_point_register: "Registering feed",
    share_recent: "Recent shots",
    share_uploading: "Processing feed · 57%",
    share_done: "Feed posted",
    steps_title: "How Newpic works",
    step1_t: "Shoot together",
    step1_d: "Invite friends with a 6-digit code and watch how you look on each other's screens in real time.",
    step2_t: "Pick with reactions",
    step2_d: "Send emoji reactions to the best cuts and choose your favorite shot on the spot.",
    step3_t: "Save & share",
    step3_d: "Chosen photos are kept for 24 hours and can be shared to your feed with tags.",
    cta_title: "From today, only photos you love",
    cta_sub: "With Newpic, one take is all you need.",
    footer_note: "Newpic — Stop taking hundreds of attempts for just one photo.",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy Policy",
    footer_contact: "Contact",
  },
  ja: {
    langName: "日本語",
    nav_live: "リアルタイム撮影",
    nav_share: "保存 & 共有",
    nav_download: "ダウンロード",
    hero_bubble: "もう、いつでもお気に入りの一枚を!",
    hero_tagline: "一枚の写真のために\n何十回も撮り直さないで。",
    hero_sub: "撮られている自分の姿をリアルタイムで確認し、リアクションで一緒にベストショットを選べるカメラアプリ",
    hero_cta: "Newpicをはじめる",
    hero_cta_sub: "まもなくApp Storeに登場",
    live_title: "カメラに映る自分の姿をリアルタイムでチェック!",
    live_point_code: "6桁のコードで撮影に参加!",
    live_point_reaction: "リアルタイムでリアクションを送ってみよう!",
    live_join_title: "リアルタイム共有に参加",
    live_join_desc: "ホスト画面に表示された6桁のコードを入力してください。",
    live_join_code: "共有コード",
    live_join_placeholder: "6桁の数字",
    live_join_cancel: "キャンセル",
    live_join_ok: "参加する",
    live_participants: "参加者 1名",
    live_endroom: "ルームを終了",
    live_guide: "カメラ画面に人が映るように立ってください。",
    live_shotview: "写真に写る自分の姿",
    share_title: "撮った写真を保存して共有しよう!",
    share_point_feed: "フィードを作成",
    share_point_saved: "保存された写真をチェック!",
    share_point_saved_sub: "(24時間保管)",
    share_point_register: "フィードに登録",
    share_recent: "最近の撮影写真",
    share_uploading: "フィード処理中 · 57%",
    share_done: "フィード投稿完了",
    steps_title: "Newpicの使い方",
    step1_t: "一緒に撮影",
    step1_d: "6桁のコードで友達を招待し、お互いの画面で写り方をリアルタイムで確認。",
    step2_t: "リアクションで選ぶ",
    step2_d: "ベストカットに絵文字リアクションを送って、その場でお気に入りの一枚を選択。",
    step3_t: "保存して共有",
    step3_d: "選んだ写真は24時間保管され、タグと一緒にフィードへ共有できます。",
    cta_title: "今日から、いつでもお気に入りの写真を",
    cta_sub: "Newpicがあれば、一度の撮影で十分。",
    footer_note: "Newpic — 一枚の写真のために何十回も撮り直さないで。",
    footer_terms: "利用規約",
    footer_privacy: "プライバシーポリシー",
    footer_contact: "お問い合わせ",
  },
  zh: {
    langName: "中文",
    nav_live: "实时拍摄",
    nav_share: "保存与分享",
    nav_download: "下载",
    hero_bubble: "从此每一张照片都称心如意!",
    hero_tagline: "别再为了一张照片\n重拍几十次了。",
    hero_sub: "实时查看镜头中的自己，用表情互动一起挑出最佳照片的相机应用",
    hero_cta: "开始使用 Newpic",
    hero_cta_sub: "即将登陆 App Store",
    live_title: "实时查看镜头中的自己!",
    live_point_code: "输入6位数字码即可参与拍摄!",
    live_point_reaction: "试试发送实时表情互动吧!",
    live_join_title: "加入实时共享",
    live_join_desc: "请输入主持人屏幕上显示的6位数字码。",
    live_join_code: "共享码",
    live_join_placeholder: "6位数字",
    live_join_cancel: "取消",
    live_join_ok: "加入",
    live_participants: "1位参与者",
    live_endroom: "结束房间",
    live_guide: "请站在镜头画面内。",
    live_shotview: "照片中的我",
    share_title: "保存并分享拍好的照片吧!",
    share_point_feed: "创建动态",
    share_point_saved: "查看已保存的照片!",
    share_point_saved_sub: "(保留24小时)",
    share_point_register: "发布到动态",
    share_recent: "最近拍摄的照片",
    share_uploading: "动态处理中 · 57%",
    share_done: "动态发布完成",
    steps_title: "Newpic 使用方法",
    step1_t: "一起拍摄",
    step1_d: "用6位数字码邀请朋友，在彼此的屏幕上实时查看拍摄效果。",
    step2_t: "用表情挑选",
    step2_d: "给最佳照片发送表情互动，当场选出你最满意的一张。",
    step3_t: "保存与分享",
    step3_d: "选中的照片会保存24小时，可以附上标签分享到动态。",
    cta_title: "从今天起，每张照片都称心如意",
    cta_sub: "有了 Newpic，一次拍摄就足够。",
    footer_note: "Newpic — 别再为了一张照片重拍几十次了。",
    footer_terms: "服务条款",
    footer_privacy: "隐私政策",
    footer_contact: "联系我们",
  },
  hi: {
    langName: "हिन्दी",
    nav_live: "लाइव शूटिंग",
    nav_share: "सेव और शेयर",
    nav_download: "डाउनलोड",
    hero_bubble: "अब हर फोटो मनपसंद!",
    hero_tagline: "एक फोटो के लिए\nदर्जनों बार दोबारा मत खींचिए।",
    hero_sub: "कैमरे में खुद को रियल-टाइम देखें और लाइव रिएक्शन के साथ मिलकर बेस्ट शॉट चुनें।",
    hero_cta: "Newpic शुरू करें",
    hero_cta_sub: "जल्द ही App Store पर",
    live_title: "कैमरे में खुद को रियल-टाइम देखें!",
    live_point_code: "6 अंकों के कोड से शूटिंग में शामिल हों!",
    live_point_reaction: "रियल-टाइम रिएक्शन भेजकर देखें!",
    live_join_title: "लाइव शेयरिंग में शामिल हों",
    live_join_desc: "होस्ट की स्क्रीन पर दिखाया गया 6 अंकों का कोड दर्ज करें।",
    live_join_code: "शेयर कोड",
    live_join_placeholder: "6 अंकों की संख्या",
    live_join_cancel: "रद्द करें",
    live_join_ok: "शामिल हों",
    live_participants: "1 प्रतिभागी",
    live_endroom: "रूम समाप्त करें",
    live_guide: "कैमरा फ्रेम में दिखाई देने की स्थिति में खड़े हों।",
    live_shotview: "फोटो में मैं कैसा दिखता हूँ",
    share_title: "खींची गई फोटो सेव और शेयर करें!",
    share_point_feed: "फ़ीड बनाएं",
    share_point_saved: "सेव की गई फोटो देखें!",
    share_point_saved_sub: "(24 घंटे तक सुरक्षित)",
    share_point_register: "फ़ीड पर पोस्ट करें",
    share_recent: "हाल की फोटो",
    share_uploading: "फ़ीड प्रोसेस हो रही है · 57%",
    share_done: "फ़ीड पोस्ट हो गई",
    steps_title: "Newpic ऐसे काम करता है",
    step1_t: "साथ में शूट करें",
    step1_d: "6 अंकों के कोड से दोस्तों को आमंत्रित करें और एक-दूसरे की स्क्रीन पर रियल-टाइम देखें।",
    step2_t: "रिएक्शन से चुनें",
    step2_d: "बेस्ट शॉट्स पर इमोजी रिएक्शन भेजें और वहीं अपनी पसंदीदा फोटो चुनें।",
    step3_t: "सेव और शेयर",
    step3_d: "चुनी गई फोटो 24 घंटे तक सुरक्षित रहती हैं और टैग के साथ फ़ीड पर शेयर की जा सकती हैं।",
    cta_title: "आज से, सिर्फ मनपसंद तस्वीरें",
    cta_sub: "Newpic के साथ, एक ही शॉट काफी है।",
    footer_note: "Newpic — एक फोटो के लिए दर्जनों बार दोबारा मत खींचिए।",
    footer_terms: "सेवा की शर्तें",
    footer_privacy: "गोपनीयता नीति",
    footer_contact: "संपर्क करें",
  },
};

const STORAGE_KEY = "newpic-lang";
const isSupported = (code) => SUPPORTED_LANGS.some((l) => l.code === code);

function browserLang() {
  const raw = (navigator.language || "en").toLowerCase();
  const prefix = raw.split("-")[0];
  return isSupported(prefix) ? prefix : "en";
}

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isSupported(saved)) return saved;
    } catch {
      /* storage unavailable */
    }
    return browserLang();
  });
  const [detected, setDetected] = useState(false);

  // IP 기반 자동 감지 — 사용자가 직접 고른 적이 없을 때만 적용
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (saved && isSupported(saved)) {
      setDetected(true);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    fetch("https://ipapi.co/json/", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const country = data && data.country_code;
        const mapped = country && COUNTRY_TO_LANG[country.toUpperCase()];
        if (mapped && isSupported(mapped)) setLangState(mapped);
      })
      .catch(() => {
        /* 감지 실패 시 브라우저 언어 유지 */
      })
      .finally(() => {
        clearTimeout(timer);
        setDetected(true);
      });
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const setLang = (code) => {
    if (!isSupported(code)) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const t = (key) => MESSAGES[lang]?.[key] ?? MESSAGES.en[key] ?? key;
    return { lang, setLang, t, detected };
  }, [lang, detected]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
