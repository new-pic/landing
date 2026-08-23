import { LanguageProvider } from "./i18n.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import FeatureLive from "./components/FeatureLive.jsx";
import FeatureShare from "./components/FeatureShare.jsx";
import Steps from "./components/Steps.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <FeatureLive />
        <FeatureShare />
        <Steps />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
