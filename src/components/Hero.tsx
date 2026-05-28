import { lazy, Suspense } from "react";
import { Mail, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
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
    <section id="home" className="min-h-screen flex items-center section pt-24 relative overflow-hidden">
      <Hero3D />
      
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="section-container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Mohit Sinha
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl font-medium"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #8b5cf6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI & Data Science Professional
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-lg leading-relaxed max-w-xl"
              >
                A dedicated professional pursuing BCA and BS in Data Science, specializing in 
                transforming complex datasets into actionable business insights. Proficient in 
                Machine Learning, predictive analytics, and data-driven decision making with 
                a commitment to delivering scalable AI solutions.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
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
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
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

          {/* Profile Image */}
          <motion.div
            className="order-1 md:order-2 flex justify-center md:justify-end perspective-1000"
            variants={imageVariants}
          >
            <div className="hero-image-frame w-72 h-72 md:w-96 md:h-96 relative group">
              {/* Neon glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-violet-500 to-primary rounded-full opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
              
              <img
                src={profileImage}
                alt="Mohit Sinha - AI & Data Science Professional"
                className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
