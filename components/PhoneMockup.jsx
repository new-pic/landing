/**
 * iPhone 목업 컴포넌트
 * - src: 화면에 들어갈 스크린샷 (public/assets/ 의 파일 교체만으로 반영)
 * - time: 상태바 시간, light: 상태바 글자를 흰색으로
 * - tilt: "l" | "r" 로 살짝 기울이기
 */
export default function PhoneMockup({ src, alt = "", time = "10:56", light = false, tilt, style }) {
  const tiltClass = tilt === "l" ? "tilt-l" : tilt === "r" ? "tilt-r" : "";
  return (
    <div className={`phone ${tiltClass}`} style={style}>
      <div className="phone-screen">
        <div className={`phone-status ${light ? "light" : ""}`}>
          <span>{time}</span>
          <span>▲ ᯤ ▮</span>
        </div>
        <div className="phone-island" />
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
