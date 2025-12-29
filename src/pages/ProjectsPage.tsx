import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, Clock, Code, Database, Brain, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects | Mohit Sinha - Data Science & AI Portfolio</title>
        <meta
          name="description"
          content="Explore Mohit Sinha's portfolio of Data Science, Machine Learning, and Web Development projects showcasing practical applications of analytical skills."
        />
      </Helmet>

      <Navigation />

      {/* Hero Header */}
      <section className="page-header-3d pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-up">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="perspective-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-bounce-in">
              <Rocket size={20} />
              <span className="font-medium">Portfolio Showcase</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
              Featured <span className="gradient-text glow-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-3d delay-200">
              Practical applications of Data Science, Machine Learning, and Web Development expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            {/* Animated Icon */}
            <div className="relative mb-12">
              {/* Animated rings */}
              <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 w-32 h-32 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute inset-8 w-24 h-24 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              
              {/* Center icon */}
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 animate-float">
                <Clock size={64} className="text-primary" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-in text-center font-heading">
              Projects Coming Soon
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mb-12 animate-fade-in text-lg" style={{ animationDelay: '200ms' }}>
              Exciting projects in Data Science, Machine Learning, AI, and Web Development are currently in development. Stay tuned for updates!
            </p>

            {/* Future Projects Preview */}
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
              {[
                { 
                  icon: Brain,
                  title: "Machine Learning Projects", 
                  desc: "Predictive modeling, classification, and regression analysis",
                  color: "from-blue-500/20 to-cyan-500/20"
                },
                { 
                  icon: Database,
                  title: "Data Analytics Projects", 
                  desc: "Business intelligence dashboards and data visualization",
                  color: "from-purple-500/20 to-pink-500/20"
                },
                { 
                  icon: Code,
                  title: "Web Development Projects", 
                  desc: "Full-stack applications with modern frameworks",
                  color: "from-orange-500/20 to-red-500/20"
                },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group card-3d relative p-8 rounded-2xl border border-dashed border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 opacity-0 animate-scale-in-3d"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 font-heading">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    
                    <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={16} />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">
              Technical Skills Ready to Deploy
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {["Python", "SQL", "Machine Learning", "Data Analysis", "React", "TypeScript", "Tableau", "Git", "Excel", "HTML/CSS"].map((skill, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-background/80 border border-border/50 rounded-full text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
