import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Clock, Linkedin, Github, Twitter, Send, MessageSquare, Calendar, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "sinhamohit9870@gmail.com",
      description: "Best for detailed inquiries",
      action: "mailto:sinhamohit9870@gmail.com",
      primary: true,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect Professionally",
      description: "Let's grow our network",
      action: "#",
      primary: false,
    },
    {
      icon: Github,
      title: "GitHub",
      value: "View My Code",
      description: "Explore my repositories",
      action: "#",
      primary: false,
    },
  ];

  const faqs = [
    {
      question: "What type of projects are you interested in?",
      answer: "I'm passionate about Data Science, Machine Learning, and AI projects. I'm particularly interested in NLP, predictive analytics, and building data-driven applications.",
    },
    {
      question: "Are you available for internships?",
      answer: "Yes! I'm actively seeking internship opportunities in Data Science, Machine Learning, or AI roles where I can apply my skills and learn from experienced professionals.",
    },
    {
      question: "What is your preferred collaboration style?",
      answer: "I value clear communication and structured workflows. I'm comfortable with remote collaboration using tools like Slack, Zoom, and project management platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact | Mohit Sinha - Data Scientist</title>
        <meta name="description" content="Get in touch with Mohit Sinha for Data Science projects, internships, and professional collaboration opportunities." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="page-header-3d pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-up">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="perspective-1000 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
              Let's <span className="gradient-text glow-text">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 opacity-0 animate-slide-in-3d delay-200">
              Whether you're looking for a data-driven solution, collaboration opportunity, 
              or just want to discuss AI and technology — I'd love to hear from you.
            </p>

            {/* Availability Badge */}
            <div className="flex items-center gap-3 opacity-0 animate-fade-up delay-300">
              <span className="availability-badge px-4 py-2 rounded-full bg-success/10 border border-success/30">
                <span className="availability-dot bg-success" />
                <span className="text-success font-medium">Available for opportunities</span>
              </span>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-40 right-20 opacity-20 animate-float hidden lg:block">
            <Sparkles size={48} className="text-primary" />
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center opacity-0 animate-fade-up font-heading">Reach Out</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.action}
                className={`card-3d elevated-card text-center opacity-0 animate-scale-in-3d hover:border-primary ${method.primary ? 'ring-2 ring-primary/30' : ''}`}
                style={{ animationDelay: `${200 + idx * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${method.primary ? 'bg-primary text-primary-foreground animate-glow-pulse' : 'bg-primary/10 text-primary'}`}>
                  <method.icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-heading">{method.title}</h3>
                <p className="text-primary font-medium text-sm mb-1">{method.value}</p>
                <p className="text-muted-foreground text-xs">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Card */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="cta-card opacity-0 animate-fade-up">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <MessageSquare size={48} className="text-primary-foreground/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading">
                Ready to Chat?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                I'm always excited to discuss new projects, innovative ideas, 
                or opportunities to collaborate on data-driven solutions.
              </p>

              <a 
                href="mailto:sinhamohit9870@gmail.com" 
                className="inline-flex items-center px-8 py-4 bg-background text-foreground font-medium rounded-xl hover:bg-background/90 transition-all shadow-lg hover:shadow-xl"
              >
                <Mail size={20} className="mr-3" />
                Chat via Email
              </a>

              <div className="flex justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <Clock size={16} />
                  Response within 24hrs
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <Calendar size={16} />
                  Open for meetings
                </div>
              </div>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center opacity-0 animate-fade-up font-heading">Frequently Asked</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="card-3d elevated-card opacity-0 animate-flip-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">Connect on social platforms</p>
          <div className="flex justify-center gap-4">
            {[
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Twitter, label: "Twitter", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:sinhamohit9870@gmail.com" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="social-icon card-3d opacity-0 animate-bounce-in"
                style={{ animationDelay: `${idx * 100}ms` }}
                title={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
