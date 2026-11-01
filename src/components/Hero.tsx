import { lazy, Suspense } from "react";
import { Mail, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import SafeCanvas from "./SafeCanvas";
import CodeTyping from "./CodeTyping";
const Hero3D = lazy(() => import("./Hero3D"));

interface HeroProps {
  profileImage: string;
  isVisible?: boolean;
}

const Hero = ({ profileImage, isVisible = true }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <section id="home" className="hero-section min-h-screen flex items-center section relative overflow-hidden">
      {isVisible && (
        <SafeCanvas>
          <Suspense fallback={null}><Hero3D /></Suspense>
        </SafeCanvas>
      )}
      
      <motion.div
        className="section-container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="hero-layout grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:gap-y-6 lg:gap-x-12 items-center">
          {/* Text Content */}
          <div className="min-w-0 order-2 md:order-1 md:row-span-2">
            <motion.div className="hero-copy space-y-4 md:space-y-6" variants={containerVariants}>
              <motion.h1
                variants={itemVariants}
                className="hero-name text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading"
              >
                Mohit Sinha
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="gradient-text text-xl md:text-2xl font-medium"
              >
                AI & Data Science Professional
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
              >
                A dedicated professional pursuing BCA and BS in Data Science, specializing in 
                transforming complex datasets into actionable business insights. Proficient in 
                Machine Learning, predictive analytics, and data-driven decision making with 
                a commitment to delivering scalable AI solutions.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="hero-actions grid grid-cols-1 sm:flex sm:flex-wrap gap-3 pt-2">
                <motion.a
                  href="mailto:sinhamohit9870@gmail.com"
                  className="btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    <Mail size={18} className="mr-2" />
                    Chat via Email
                  </span>
                </motion.a>
                
                <motion.a
                  href="#projects"
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <ArrowRight size={18} className="ml-2" />
                </motion.a>
                
                <motion.a 
                  href="/resume/Mohit_Sinha_Resume.pdf" 
                  download 
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} className="mr-2" />
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} className="hero-quick-links flex flex-wrap gap-4 pt-4">
                {["Skills", "Projects", "Certifications", "Contact"].map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="btn-link text-sm relative group"
                    whileHover={{ x: 3 }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Photo appears first on phones; desktop keeps its two-column layout. */}
          <motion.div
            className="min-w-0 order-1 md:order-2 flex justify-center md:justify-end perspective-1000"
            variants={imageVariants}
          >
            <div className="hero-portrait-shell hero-image-frame w-60 sm:w-72 md:w-full md:max-w-80 lg:max-w-[26rem] aspect-square relative group" data-tilt>
              {/* JARVIS-style counter-rotating orbital rings behind the portrait */}
              <span className="portrait-ring portrait-ring-a" aria-hidden="true" />
              <span className="portrait-ring portrait-ring-b" aria-hidden="true" />
              <span className="portrait-halo" aria-hidden="true" />
              <span className="portrait-corner portrait-corner-top" aria-hidden="true" />
              <span className="portrait-corner portrait-corner-bottom" aria-hidden="true" />
              <img
                src={profileImage}
                alt="Mohit Sinha - AI & Data Science Professional"
                width={720}
                height={720}
                loading="eager"
                fetchPriority="high"
                className="relative w-full h-full object-cover object-center transition-transform duration-700"
              />
            </div>

          </motion.div>
          <motion.div variants={itemVariants} className="order-3 w-full min-w-0 max-w-md justify-self-center md:justify-self-end">
            <CodeTyping />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
