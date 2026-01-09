import { Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Import certificate images
import certDataconnect from "@/assets/certificates/cert-dataconnect.png";
import certAiTeachnook from "@/assets/certificates/cert-ai-teachnook.png";
import certCybersecurity from "@/assets/certificates/cert-cybersecurity.png";
import certTableau from "@/assets/certificates/cert-tableau-tnx.png";
import certCoursera from "@/assets/certificates/cert-coursera-business.png";

const certifications = [
  {
    title: "Scratch Hackathon - DataConnectDelhi May 2025",
    issuer: "DataConnectDelhi | IIT Madras BS Program",
    date: "May 2025",
    image: certDataconnect,
    description: "Certificate of Appreciation for enthusiastic participation in the hackathon held at Microsoft Office, Gurugram.",
  },
  {
    title: "Artificial Intelligence Course",
    issuer: "Teachnook | Cognizance'24 IIT Roorkee",
    date: "April 2025",
    image: certAiTeachnook,
    description: "Successfully completed AI course with Cognizance'24 IIT Roorkee collaboration.",
  },
  {
    title: "CyberSecurity Workshop",
    issuer: "Cyndia | Cognizance 2025, IIT Roorkee",
    date: "March 2025",
    image: certCybersecurity,
    description: "Participated in CyberSecurity workshop conducted by Cyndia at IIT Roorkee's Annual Technical Fest.",
  },
  {
    title: "Tableau Course Completion",
    issuer: "TNX | Cognizance'24 IIT Roorkee",
    date: "October 2024",
    image: certTableau,
    description: "Successfully completed Tableau Course with TNX, demonstrating keen enthusiasm for data visualization.",
  },
  {
    title: "Business Analysis & Process Management",
    issuer: "Coursera Project Network",
    date: "February 2025",
    image: certCoursera,
    description: "Successfully completed online project authorized by Coursera Project Network.",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="section bg-card">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Award size={18} />
              <span className="text-sm font-medium">Verified Credentials</span>
            </div>
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Industry-recognized credentials validating expertise across AI, Data Science, and Technology domains
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="up">
              <div 
                className="group relative bg-background rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 h-full"
              >
                {/* Certificate Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                    {cert.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">{cert.issuer}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2">{cert.description}</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Coming Soon Section */}
        <ScrollReveal delay={0.6}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-dashed border-border">
              <span className="text-muted-foreground text-sm">More certifications coming soon...</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Certifications;