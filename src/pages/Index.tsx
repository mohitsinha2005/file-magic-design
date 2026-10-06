import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Resources from "@/components/Resources";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import profileMohit from "@/assets/profile-library.jpg.asset.json";
import profileHero from "@/assets/mohit-studio-portrait.png.asset.json";

const LiveChat = lazy(() => import("@/components/LiveChat"));

const Index = () => {
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const profileImage = `https://file-magic-design.lovable.app${profileHero.url}`;
  // The asset path is not served by third-party hosts (and the local preview
  // can return index.html for it); the published asset origin serves the photo.
  const aboutImage = `https://file-magic-design.lovable.app${profileMohit.url}`;

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = useCallback(() => {
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
        {!introComplete && !reduceMotion && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Mount the portfolio after the intro so hidden sections cannot restore scroll. */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Navigation />
          <main>
            <Hero profileImage={profileImage} isVisible />
            <Skills />
            <Projects />
            <Certifications />
            <About profileImage={aboutImage} />
            <Resources />
            <Suspense fallback={null}><LiveChat /></Suspense>
            <CTA />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
