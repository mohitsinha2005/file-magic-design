import { Rocket, Clock, Plus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Rocket size={18} />
              <span className="text-sm font-medium">Portfolio Showcase</span>
            </div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Practical applications of Data Science, AI, and Web Development expertise
            </p>
          </div>
        </ScrollReveal>

        {/* Coming Soon Placeholder */}
        <div className="flex flex-col items-center justify-center py-20">
          <ScrollReveal delay={0.2}>
            <div className="relative mb-8">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              
              {/* Center icon */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 animate-float">
                <Clock size={48} className="text-primary" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h3 className="text-2xl font-bold text-foreground mb-3 text-center">
              Projects Coming Soon
            </h3>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Exciting projects in Data Science, Machine Learning, and Web Development are currently in development. Check back soon!
            </p>
          </ScrollReveal>

          {/* Future Projects Preview */}
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { title: "ML Project", desc: "Machine Learning" },
              { title: "Data Analytics", desc: "Business Intelligence" },
              { title: "Web App", desc: "Full Stack Development" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={0.5 + index * 0.15} direction="up">
                <div 
                  className="group relative p-6 rounded-xl border border-dashed border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Plus size={24} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;