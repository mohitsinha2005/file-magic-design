import { Award, ExternalLink } from "lucide-react";

// Import certificate images
import certDataconnect from "@/assets/certificates/cert-dataconnect-teachnook.png";
import certChessMania from "@/assets/certificates/cert-chess-mania.png";
import certIitmWebsite from "@/assets/certificates/cert-iitm-website.png";
import certCoursera from "@/assets/certificates/cert-coursera-business.png";
import certNextleap from "@/assets/certificates/cert-nextleap-pm.png";
import certHpLife from "@/assets/certificates/cert-hp-life.png";

const certifications = [
  {
    title: "Scratch Hackathon - DataConnectDelhi",
    issuer: "DataConnectDelhi | IIT Madras BS Program",
    date: "May 2025",
    image: certDataconnect,
    description: "Certificate of Appreciation for enthusiastic participation in the hackathon held at Microsoft Office, Gurugram.",
  },
  {
    title: "Artificial Intelligence Course",
    issuer: "Teachnook | Cognizance'24 IIT Roorkee",
    date: "April 2025",
    image: certDataconnect,
    description: "Successfully completed AI course with Cognizance'24 IIT Roorkee collaboration.",
  },
  {
    title: "Chess Mania - IITM Paradox",
    issuer: "IITM B.S. Degree Program",
    date: "Margazhi'25",
    image: certChessMania,
    description: "Certificate of Appreciation for active participation in Chess Mania at IITM Paradox.",
  },
  {
    title: "IITM BS Website Redesigning Competition",
    issuer: "IIT Madras B.S. Degree Program",
    date: "January 2025",
    image: certIitmWebsite,
    description: "Participation certificate for contributing with creativity and innovation in website redesigning.",
  },
  {
    title: "Business Analysis & Process Management",
    issuer: "Coursera Project Network",
    date: "February 2025",
    image: certCoursera,
    description: "Successfully completed online project authorized by Coursera Project Network.",
  },
  {
    title: "Product Management Workshop",
    issuer: "Nextleap | Cognizance 2025, IIT Roorkee",
    date: "2025",
    image: certNextleap,
    description: "Certificate of Participation in Product Management workshop conducted by Nextleap.",
  },
  {
    title: "Selling Online - HP LIFE",
    issuer: "HP Foundation",
    date: "August 2023",
    image: certHpLife,
    description: "Successfully completed HP LIFE online course on optimizing online sales and marketing strategies.",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="section bg-card">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
            <Award size={18} />
            <span className="text-sm font-medium">Verified Credentials</span>
          </div>
          <h2 className="section-title">Professional Certifications</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise across AI, Data Science, and Technology domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="group relative bg-background rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-scale-in-3d"
              style={{ animationDelay: `${index * 100}ms` }}
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
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-dashed border-border">
            <span className="text-muted-foreground text-sm">More certifications coming soon...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
