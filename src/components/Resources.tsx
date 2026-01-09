import { Download, FileText, File, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Resource {
  name: string;
  description: string;
  file: string;
  type: "pdf" | "doc" | "other";
  size?: string;
}

const resources: Resource[] = [
  {
    name: "Resume / CV",
    description: "Download my professional resume with skills, experience, and achievements",
    file: "/resume/Mohit_Sinha_Resume.pdf",
    type: "pdf",
    size: "1.2 MB"
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText size={24} className="text-red-500" />;
    case "doc":
      return <FileText size={24} className="text-blue-500" />;
    default:
      return <File size={24} className="text-primary" />;
  }
};

const Resources = () => {
  return (
    <section id="resources" className="py-20 relative">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Download size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Resources</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              Documents & Downloads
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access and download important documents, resources, and materials
            </p>
          </div>
        </ScrollReveal>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <ScrollReveal key={index} delay={index * 0.15} direction="up">
              <a
                href={resource.file}
                download
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 block h-full"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {getIcon(resource.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {resource.description}
                    </p>
                    {resource.size && (
                      <span className="text-xs text-muted-foreground/70 uppercase tracking-wide">
                        {resource.type.toUpperCase()} • {resource.size}
                      </span>
                    )}
                  </div>
                </div>

                {/* Download indicator */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-primary font-medium flex items-center gap-2">
                    <Download size={16} />
                    Download
                  </span>
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            </ScrollReveal>
          ))}

          {/* Upload placeholder */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="bg-muted/30 border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <FileText size={24} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                More documents coming soon
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Certificates, presentations & more
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Quick Resume Download CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href="/resume/Mohit_Sinha_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Resources;