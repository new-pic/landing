# Newpic 랜딩 사이트 (Next.js)

핑크/코랄 톤의 Newpic 앱 소개 랜딩 페이지입니다. **Next.js (App Router)** 로 만들어졌고,
접속자의 IP를 기반으로 언어(한국어·영어·일본어·중국어·힌디어)가 자동 설정됩니다.

## 실행 방법

```bash
npm install     # 최초 1회
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
```

Vercel에 배포할 경우 저장소를 연결하면 별도 설정 없이 바로 배포됩니다.

## 에셋 교체 방법 (중요!)

`public/assets/` 안의 플레이스홀더 이미지를 **같은 파일명**으로 덮어쓰기만 하면
사이트에 바로 반영됩니다. 코드는 건드릴 필요 없어요.

| 파일명 | 위치 | 권장 사이즈 |
| --- | --- | --- |
| `mascot.png` | 히어로(첫 화면) 마스코트 | 720×720, 투명 배경 PNG |
| `screen-camera.png` | 실시간 촬영 섹션 · 카메라 화면 | 590×1278 (앱 스크린샷) |
| `screen-live.png` | 실시간 촬영 섹션 · 실시간 공유 화면 | 590×1278 |
| `screen-mypage.png` | 저장/공유 섹션 · 마이페이지 화면 | 590×1278 |
| `screen-feed.png` | 저장/공유 섹션 · 피드 화면 | 590×1278 |
| `screen-post.png` | 저장/공유 섹션 · 피드 작성 화면 | 590×1278 |
| `photo-recent.png` | "최근 촬영 사진" 카드 | 460×300 |

스크린샷 비율이 조금 달라도 `object-fit: cover`로 프레임에 맞게 채워집니다.

## 자동 언어 설정

- 접속 시 [ipapi.co](https://ipapi.co)로 국가를 확인해 언어를 정합니다
  (KR→한국어, JP→일본어, CN/TW/HK 등→중문, IN→힌디어, 그 외→브라우저 언어→영어).
- 우측 상단 셀렉트로 직접 언어를 바꾸면 `localStorage`에 저장되어 이후엔 그 언어가 우선합니다.
- 문구 수정/언어 추가는 `components/i18n.jsx`의 `MESSAGES`에서 하면 됩니다.

## 구조

```
app/
  layout.jsx             # 루트 레이아웃 (폰트, 메타데이터)
  page.jsx               # 메인 페이지
  globals.css            # 디자인 시스템 (색상 변수는 :root 참고)
components/
  Landing.jsx            # 전체 섹션 조합 (클라이언트 루트)
  i18n.jsx               # 다국어 문구 + IP 자동 감지
  Header.jsx             # 상단 네비 + 언어 선택
  Hero.jsx               # 히어로 (말풍선/마스코트)
  FeatureLive.jsx        # 실시간 촬영 섹션 (아이폰 목업 + 이모지)
  FeatureShare.jsx       # 저장/공유 섹션 (아이폰 목업 3대)
  Steps.jsx              # 사용 방법 3단계
  Footer.jsx             # CTA + 푸터
  PhoneMockup.jsx        # CSS 아이폰 목업 (스크린샷만 갈아끼우면 됨)
  Reveal.jsx             # 스크롤 등장 애니메이션
```

브랜드 컬러를 바꾸려면 `app/globals.css` 맨 위 `:root`의 `--coral-*` 변수만 수정하세요.
