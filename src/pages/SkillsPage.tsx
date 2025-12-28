import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Brain, Database, BarChart3, Code2, Globe, GitBranch, Cpu, FileCode, Layers, Server, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const skills = [
  {
    icon: Code2,
    name: "Python",
    category: "Programming",
    description: "Advanced proficiency in Python for data analysis, machine learning, automation, and backend development.",
    progress: 90,
  },
  {
    icon: Database,
    name: "SQL",
    category: "Database",
    description: "Expert-level database querying, optimization, and management across MySQL, PostgreSQL, and SQLite.",
    progress: 88,
  },
  {
    icon: Brain,
    name: "Machine Learning",
    category: "AI/ML",
    description: "Supervised and unsupervised learning, model training, hyperparameter tuning, and evaluation metrics.",
    progress: 78,
  },
  {
    icon: Cpu,
    name: "Artificial Intelligence",
    category: "AI/ML",
    description: "Conceptual understanding of neural networks, deep learning architectures, and AI system design.",
    progress: 72,
  },
  {
    icon: BarChart3,
    name: "Data Visualization",
    category: "Analytics",
    description: "Creating compelling visual narratives with Tableau, Power BI, Matplotlib, Seaborn, and Plotly.",
    progress: 85,
  },
  {
    icon: Layers,
    name: "Data Analysis",
    category: "Analytics",
    description: "Statistical analysis, EDA, hypothesis testing, and deriving actionable insights from complex datasets.",
    progress: 87,
  },
  {
    icon: FileCode,
    name: "HTML & CSS",
    category: "Web Development",
    description: "Semantic HTML5, modern CSS3, responsive design, Flexbox, Grid, and CSS animations.",
    progress: 82,
  },
  {
    icon: Globe,
    name: "React",
    category: "Web Development",
    description: "Component-based architecture, hooks, state management, and building interactive user interfaces.",
    progress: 75,
  },
  {
    icon: GitBranch,
    name: "Git & GitHub",
    category: "DevOps",
    description: "Version control, collaborative workflows, branching strategies, and code review processes.",
    progress: 80,
  },
  {
    icon: Server,
    name: "Cloud Fundamentals",
    category: "Cloud Computing",
    description: "AWS and GCP basics, cloud architecture concepts, and deployment fundamentals.",
    progress: 65,
  },
];

const categories = ["All", "Programming", "Database", "AI/ML", "Analytics", "Web Development", "DevOps", "Cloud Computing"];

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Technical Skills | Mohit Sinha - Data Scientist</title>
        <meta name="description" content="Explore Mohit Sinha's technical proficiencies in Python, Machine Learning, Data Science, SQL, and Web Development." />
      </Helmet>

      <Navigation />

      {/* Hero Header with 3D Effect */}
      <section className="page-header-3d pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-up">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="perspective-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-tilt-in font-heading">
              Technical <span className="gradient-text glow-text">Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-3d delay-200">
              A comprehensive toolkit spanning Data Science, Artificial Intelligence, 
              and Modern Web Technologies — continuously expanding through hands-on projects.
            </p>
          </div>

          {/* Floating 3D shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-float hidden lg:block">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-primary/50 animate-rotate-3d" />
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-12 opacity-0 animate-fade-up delay-300">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full bg-secondary text-muted-foreground text-sm font-medium border border-border hover:border-primary hover:text-primary transition-all cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Skills Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="card-3d elevated-card opacity-0 animate-scale-in-3d"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 hover:bg-primary/20 transition-colors animate-glow-pulse">
                    <skill.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <span className="text-primary text-xs font-medium">{skill.category}</span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
                  </div>
                </div>
                <div className="skill-meter mt-4">
                  <div
                    className="skill-progress shimmer-bg"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Proficiency</span>
                  <span className="text-primary font-medium">{skill.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center opacity-0 animate-fade-up font-heading">
            Continuous Learning Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Currently Learning", items: ["Deep Learning", "MLOps", "AWS Solutions Architecture"] },
              { title: "Next Goals", items: ["TensorFlow Certification", "Kubernetes", "Advanced NLP"] },
              { title: "Interests", items: ["Generative AI", "Computer Vision", "Edge Computing"] },
            ].map((section, idx) => (
              <div 
                key={idx} 
                className="card-3d elevated-card opacity-0 animate-flip-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <h3 className="text-lg font-semibold text-primary mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center text-muted-foreground text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillsPage;
