import { Mail, ArrowRight } from "lucide-react";

interface HeroProps {
  profileImage: string;
}

const Hero = ({ profileImage }: HeroProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center section pt-24">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-heading">
                Mohit Sinha
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium">
                Specialist in AI & Data Science
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Aspiring Data Scientist and AI Researcher currently pursuing BCA and BS in Data Science. 
                Dedicated to transforming complex data into actionable insights through Machine Learning, 
                predictive modeling, and advanced analytics. Recruiter-ready professional with a focus on scalable AI solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="mailto:sinhamohit9870@gmail.com" className="btn-primary">
                  <Mail size={18} className="mr-2" />
                  Chat via Email
                </a>
                <a href="#projects" className="btn-secondary">
                  View Projects
                  <ArrowRight size={18} className="ml-2" />
                </a>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#skills" className="btn-link text-sm">Skills</a>
                <a href="#projects" className="btn-link text-sm">Projects</a>
                <a href="#certifications" className="btn-link text-sm">Certifications</a>
                <a href="#contact" className="btn-link text-sm">Contact</a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="hero-image-frame w-72 h-72 md:w-96 md:h-96">
              <img
                src={profileImage}
                alt="Mohit Sinha Professional Portrait"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
