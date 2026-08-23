"use client";

import { LanguageProvider } from "./i18n.jsx";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import FeatureLive from "./FeatureLive.jsx";
import FeatureShare from "./FeatureShare.jsx";
import Steps from "./Steps.jsx";
import Footer from "./Footer.jsx";

export default function Landing() {
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
