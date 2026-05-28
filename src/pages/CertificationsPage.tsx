import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Award, ArrowLeft, Calendar, Building } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    description: "Certificate of Appreciation for enthusiastic participation in the hackathon held at Microsoft Office, Gurugram. Demonstrated creativity, collaboration, and commitment to learning.",
    category: "Hackathon",
  },
  {
    title: "Artificial Intelligence Course Completion",
    issuer: "Teachnook | Cognizance'24 IIT Roorkee",
    date: "April 2025",
    image: certAiTeachnook,
    description: "Successfully completed comprehensive AI course in collaboration with Cognizance'24 IIT Roorkee. Demonstrated keen enthusiasm and strong understanding of AI concepts.",
    category: "AI & Technology",
  },
  {
    title: "CyberSecurity Workshop",
    issuer: "Cyndia | Cognizance 2025, IIT Roorkee",
    date: "March 2025",
    image: certCybersecurity,
    description: "Participated in CyberSecurity workshop conducted by Cyndia in association with Cognizance 2025, Annual Technical Fest of IIT Roorkee.",
    category: "CyberSecurity",
  },
  {
    title: "Tableau Course Completion",
    issuer: "TNX | Cognizance'24 IIT Roorkee",
    date: "October 2024",
    image: certTableau,
    description: "Successfully completed Tableau Course with TNX. Demonstrated keen enthusiasm for data visualization and analytics.",
    category: "Data Visualization",
  },
  {
    title: "Business Analysis & Process Management",
    issuer: "Coursera Project Network",
    date: "February 2025",
    image: certCoursera,
    description: "Successfully completed online non-credit project authorized by Coursera Project Network, focusing on business analysis methodologies and process optimization.",
    category: "Business",
  },
];

const CertificationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Certifications | Mohit Sinha - AI & Data Science Professional</title>
        <meta
          name="description"
          content="View professional certifications and credentials of Mohit Sinha in AI, Data Science, Web Development, and Business domains."
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
              <Award size={20} />
              <span className="font-medium">Verified Credentials</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
              Professional <span className="gradient-text glow-text">Certifications</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-3d delay-200">
              Industry-recognized credentials demonstrating expertise across AI, Data Science, Technology, and Business domains.
            </p>
          </div>

          {/* Stats badges */}
          <div className="flex gap-4 mt-8 opacity-0 animate-fade-up delay-400">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              5+ Certifications
            </div>
            <div className="px-4 py-2 rounded-full bg-secondary border border-border text-muted-foreground text-sm font-medium">
              Multiple Institutions
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="card-3d relative overflow-hidden rounded-2xl border border-border bg-card opacity-0 animate-scale-in-3d hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Certificate Image */}
                <div className="relative bg-background/50 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                  />
                  
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full backdrop-blur-sm">
                    {cert.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building size={16} className="text-primary" />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} className="text-primary" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Decorative gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-muted/30 border border-dashed border-border animate-float">
              <Award size={24} className="text-primary" />
              <span className="text-muted-foreground font-medium">More certifications will be added soon...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Platforms */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8 opacity-0 animate-fade-up font-heading">Learning Platforms</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["IIT Madras", "IIT Roorkee", "Coursera", "TNX", "Teachnook", "Cyndia"].map((platform, idx) => (
              <div 
                key={idx} 
                className="card-3d px-8 py-4 rounded-xl bg-background border border-border text-muted-foreground font-medium opacity-0 animate-bounce-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificationsPage;
