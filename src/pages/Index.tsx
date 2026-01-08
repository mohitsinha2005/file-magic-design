import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Resources from "@/components/Resources";
import LiveChat from "@/components/LiveChat";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import profileMohit from "@/assets/profile-mohit.jpg";
import profileHero from "@/assets/profile-hero.jpg";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const profileImage = profileHero;
  const aboutImage = profileMohit;

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = useCallback(() => {
    // Ensure scroll to top when main content appears
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mohit Sinha | Data Scientist & AI Researcher</title>
        <meta
          name="description"
          content="Mohit Sinha - Aspiring Data Scientist and AI Researcher specializing in Machine Learning, predictive modeling, and advanced analytics. Recruiter-ready professional with a focus on scalable AI solutions."
        />
        <meta property="og:title" content="Mohit Sinha | Data Scientist & AI Researcher" />
        <meta property="og:description" content="Transforming complex data into actionable insights through Machine Learning and AI." />
        <link rel="canonical" href="https://mohitsinha.dev" />
      </Helmet>

      {/* Cinematic Intro Animation */}
      <AnimatePresence>
        {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content - fades in after intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navigation />
        <main>
          <Hero profileImage={profileImage} isVisible={introComplete} />
          <Skills />
          <Projects />
          <Certifications />
          <About profileImage={aboutImage} />
          <Resources />
          <LiveChat />
          <CTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
