import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import profileMohit from "@/assets/profile-mohit.jpg";
import profileHero from "@/assets/profile-hero.jpg";

const Index = () => {
  const profileImage = profileHero;
  const aboutImage = profileMohit;

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

      <Navigation />
      <main>
        <Hero profileImage={profileImage} />
        <Skills />
        <Projects />
        <Certifications />
        <About profileImage={aboutImage} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
