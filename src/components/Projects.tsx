import { Rocket, Clock, Plus } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
            <Rocket size={18} />
            <span className="text-sm font-medium">Portfolio Showcase</span>
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Practical applications of Data Science, AI, and Web Development expertise
          </p>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="flex flex-col items-center justify-center py-20">
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

          <h3 className="text-2xl font-bold text-foreground mb-3 animate-fade-in">
            Projects Coming Soon
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Exciting projects in Data Science, Machine Learning, and Web Development are currently in development. Check back soon!
          </p>

          {/* Future Projects Preview */}
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { title: "ML Project", desc: "Machine Learning" },
              { title: "Data Analytics", desc: "Business Intelligence" },
              { title: "Web App", desc: "Full Stack Development" },
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-xl border border-dashed border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 animate-scale-in-3d"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
