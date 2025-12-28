import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Award, BookCheck, Trophy, GraduationCap, Star, Medal, ArrowLeft, ExternalLink, Calendar, Building } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const certifications = [
  {
    icon: Award,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    description: "Comprehensive program covering data analytics fundamentals, SQL, R programming, and Tableau for data visualization.",
    skills: ["Data Analysis", "SQL", "R", "Tableau", "Data Visualization"],
    credentialId: "GDAC-2024",
    hours: "200+",
  },
  {
    icon: Trophy,
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    date: "2024",
    description: "End-to-end data science methodology including Python, machine learning, and data science tools.",
    skills: ["Python", "Machine Learning", "Data Science", "Jupyter", "SQL"],
    credentialId: "IBM-DS-2024",
    hours: "180+",
  },
  {
    icon: GraduationCap,
    title: "Machine Learning Specialization",
    issuer: "Stanford Online / Coursera",
    date: "2024",
    description: "Deep dive into supervised learning, unsupervised learning, recommender systems, and reinforcement learning.",
    skills: ["Machine Learning", "Neural Networks", "Deep Learning", "TensorFlow"],
    credentialId: "ML-SPEC-2024",
    hours: "120+",
  },
  {
    icon: BookCheck,
    title: "Python for Data Science and AI",
    issuer: "IBM",
    date: "2023",
    description: "Foundational Python programming for data science applications including pandas, numpy, and scikit-learn.",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
    credentialId: "IBM-PY-2023",
    hours: "40+",
  },
  {
    icon: Star,
    title: "SQL for Data Science",
    issuer: "University of California, Davis",
    date: "2023",
    description: "Advanced SQL techniques for data manipulation, analysis, and database management.",
    skills: ["SQL", "Database Design", "Data Analysis", "Query Optimization"],
    credentialId: "UCD-SQL-2023",
    hours: "30+",
  },
  {
    icon: Medal,
    title: "Data Visualization with Tableau",
    issuer: "Coursera",
    date: "2024",
    description: "Creating impactful data stories through advanced Tableau visualizations and dashboard design.",
    skills: ["Tableau", "Data Visualization", "Dashboard Design", "Data Storytelling"],
    credentialId: "TAB-VIZ-2024",
    hours: "35+",
  },
];

const CertificationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Certifications | Mohit Sinha - Data Scientist</title>
        <meta name="description" content="Professional certifications and credentials in Data Science, Machine Learning, and Analytics by Mohit Sinha." />
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
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
              Professional <span className="gradient-text glow-text">Certifications</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-3d delay-200">
              Industry-recognized credentials validating expertise in Data Science, 
              Analytics, Machine Learning, and AI technologies.
            </p>
          </div>

          {/* Stats badges */}
          <div className="flex gap-4 mt-8 opacity-0 animate-fade-up delay-400">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              6+ Certifications
            </div>
            <div className="px-4 py-2 rounded-full bg-secondary border border-border text-muted-foreground text-sm font-medium">
              600+ Learning Hours
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="card-3d elevated-card opacity-0 animate-flip-in overflow-hidden"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 animate-glow-pulse">
                    <cert.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Building size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-sm">{cert.issuer}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{cert.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cert.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {cert.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={12} />
                        {cert.credentialId}
                      </div>
                      <div className="flex items-center gap-1">
                        ⏱️ {cert.hours} hours
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verify button */}
                <button className="mt-4 w-full btn-secondary text-sm py-2">
                  <ExternalLink size={14} className="mr-2" />
                  Verify Credential
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Platforms */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8 opacity-0 animate-fade-up font-heading">Learning Platforms</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Google", "IBM", "Coursera", "Stanford Online", "UC Davis"].map((platform, idx) => (
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
