import { Helmet } from "react-helmet";
import mohitcloudPreview from "@/assets/mohitcloud-preview.png";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, Clock, Code, Database, Brain, Plus, ExternalLink, Globe, Cloud, HeartPulse } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

      {/* Featured Project */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <a
            href="https://mohitcloud.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl border border-border/40 bg-card/60 backdrop-blur-md overflow-hidden hover:border-primary/60 hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={mohitcloudPreview}
                    alt="MohitCloud - Professional Cloud Platform"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </AspectRatio>
              </div>

              {/* Project Info */}
              <div className="relative p-8 md:p-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Cloud size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors font-heading">
                        MohitCloud
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Globe size={14} className="text-primary/70" />
                        <span className="text-sm text-primary/70 font-mono">mohitcloud.in</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-muted-foreground group-hover:text-primary transition-colors mt-2 shrink-0" />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  A professional cloud platform delivering modern web solutions with seamless performance, scalability, and cutting-edge design. Built with full-stack technologies for enterprise-grade reliability.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Cloud Platform", "Web Development", "Full Stack", "Scalable Architecture", "Modern UI"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>

          <a
            href="https://mohitmedai11.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl border border-border/40 bg-card/60 backdrop-blur-md overflow-hidden hover:border-primary/60 hover:shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500">
              <div className="relative p-8 md:p-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--primary))] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <HeartPulse size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors font-heading">
                        MohitMedAI
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Globe size={14} className="text-primary/70" />
                        <span className="text-sm text-primary/70 font-mono">mohitmedai11.netlify.app</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-muted-foreground group-hover:text-primary transition-colors mt-2 shrink-0" />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  An AI-powered medical assistant platform that leverages machine learning to deliver intelligent healthcare insights, symptom analysis, and a modern, accessible user experience.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["AI", "Healthcare", "Machine Learning", "React", "Netlify"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* More Coming Soon */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center font-heading">More Projects Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: "Machine Learning", desc: "Predictive modeling & classification", color: "from-blue-500/20 to-cyan-500/20" },
              { icon: Database, title: "Data Analytics", desc: "BI dashboards & visualization", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Code, title: "Web Development", desc: "Full-stack modern applications", color: "from-orange-500/20 to-red-500/20" },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-dashed border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} />
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
            ))}
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
