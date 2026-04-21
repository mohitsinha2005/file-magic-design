import { Rocket, ExternalLink, Globe, Cloud, HeartPulse } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "MohitCloud",
    description:
      "A professional cloud platform delivering modern web solutions with seamless performance, scalability, and cutting-edge design.",
    url: "https://mohitcloud.in",
    tags: ["Cloud Platform", "Web Development", "Full Stack"],
    icon: Cloud,
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
  },
  {
    title: "MohitMedAI",
    description:
      "An AI-powered medical assistant platform that leverages machine learning to deliver intelligent healthcare insights and a modern user experience.",
    url: "https://mohitmedai11.netlify.app",
    tags: ["AI", "Healthcare", "Machine Learning"],
    icon: HeartPulse,
    gradient: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]",
  },
];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={0.2 + index * 0.15} direction="up">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md hover:border-primary/60 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)] transition-all duration-500 h-full">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <project.icon size={28} className="text-white" />
                    </div>

                    {/* Title + Link */}
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    {/* URL */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <Globe size={13} className="text-primary/70" />
                      <span className="text-sm text-primary/70 font-mono">{project.url.replace('https://', '')}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;