import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, GraduationCap, Briefcase, Heart, Target, Lightbulb, Users, Code, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profileAbout from "@/assets/profile-about.webp";

const AboutPage = () => {
  const stats = [
    { value: "7+", label: "Certifications", icon: GraduationCap },
    { value: "2+", label: "Years Learning", icon: Brain },
    { value: "5+", label: "Technologies", icon: Code },
    { value: "100%", label: "Dedication", icon: Heart },
  ];

  const timeline = [
    {
      year: "2024-Present",
      title: "BS in Data Science - IIT Madras",
      description: "Pursuing advanced data science education focusing on Machine Learning algorithms, AI applications, and statistical modeling.",
      icon: GraduationCap,
    },
    {
      year: "2023-Present",
      title: "BCA in Computer Applications",
      description: "Comprehensive computer science education covering programming fundamentals, databases, and software development methodologies.",
      icon: Briefcase,
    },
    {
      year: "2023-2025",
      title: "Professional Certifications",
      description: "Earned multiple industry certifications from IIT Madras, IIT Roorkee, Coursera, and HP Foundation in AI, Data Science, and Business domains.",
      icon: Target,
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Committed to staying current with emerging technologies and methodologies in AI and Data Science.",
    },
    {
      icon: Target,
      title: "Result-Oriented",
      description: "Focused on delivering measurable outcomes and practical solutions that drive business value.",
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Believer in the power of teamwork and knowledge sharing to achieve exceptional results.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Me | Mohit Sinha - Data Scientist & AI Enthusiast</title>
        <meta name="description" content="Learn about Mohit Sinha's background, education, and professional journey in Data Science and AI." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="page-header-3d pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-up">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="perspective-1000">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
                About <span className="gradient-text glow-text">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 opacity-0 animate-slide-in-3d delay-200">
                A passionate Data Science student and AI enthusiast dedicated to transforming 
                complex data into actionable insights.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground opacity-0 animate-fade-up delay-300">
                <MapPin size={18} className="text-primary" />
                <span>India</span>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center opacity-0 animate-scale-in-3d delay-400">
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl overflow-hidden border-2 border-primary/30 animate-glow-pulse">
                  <img
                    src={profileAbout}
                    alt="Mohit Sinha"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg animate-float">
                  Open to Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="card-3d text-center p-6 rounded-xl bg-background border border-border opacity-0 animate-bounce-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="elevated-card card-3d opacity-0 animate-fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">Professional Profile</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I am an aspiring Data Scientist currently pursuing a dual academic path — 
                <strong className="text-foreground"> Bachelor of Computer Applications (BCA)</strong> and 
                <strong className="text-foreground"> BS in Data Science from IIT Madras</strong>. 
                This unique combination provides me with a robust foundation in both theoretical 
                computer science and practical data science applications.
              </p>
              
              <p>
                My academic journey has equipped me with strong analytical thinking and a 
                systematic approach to problem-solving. I have developed proficiency in 
                <strong className="text-foreground"> Python, SQL, Machine Learning algorithms, and data visualization tools</strong>, 
                enabling me to transform raw data into meaningful insights that drive decision-making.
              </p>
              
              <p>
                I am passionate about the intersection of artificial intelligence and real-world 
                applications. My goal is to leverage data-driven methodologies to solve complex 
                business challenges and contribute to organizations that value innovation and 
                analytical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center opacity-0 animate-fade-up font-heading">Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div 
                  key={idx} 
                  className="card-3d relative flex gap-6 opacity-0 animate-flip-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 z-10 border border-primary/30">
                    <item.icon size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className="elevated-card flex-1">
                    <span className="text-primary text-sm font-medium">{item.year}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1 mb-2 font-heading">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center opacity-0 animate-fade-up font-heading">Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className="card-3d elevated-card text-center opacity-0 animate-scale-in-3d"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
