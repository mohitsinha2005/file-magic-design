import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "Customer Sentiment Analysis System",
    category: "Natural Language Processing",
    description: "Developed an end-to-end NLP pipeline for sentiment classification, processing customer reviews to extract actionable insights. Implemented TF-IDF vectorization with ensemble classifiers achieving 89% accuracy.",
    longDescription: "This project involved building a complete sentiment analysis system capable of processing large volumes of customer feedback. The system uses advanced NLP techniques including text preprocessing, feature extraction, and machine learning classification.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Python", "Scikit-learn", "NLP", "Pandas", "NLTK"],
    date: "2024",
    features: ["Real-time sentiment scoring", "Multi-language support", "Dashboard visualization"],
  },
  {
    title: "Sales Forecasting Dashboard",
    category: "Business Intelligence",
    description: "Designed and implemented an interactive analytics dashboard for sales trend analysis, enabling data-driven inventory decisions. Integrated multiple data sources for comprehensive business insights.",
    longDescription: "Created a comprehensive business intelligence solution that combines historical sales data with external factors to predict future trends. The dashboard provides actionable insights for inventory optimization and strategic planning.",
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Tableau", "Excel", "SQL", "Data Analysis", "ETL"],
    date: "2024",
    features: ["Interactive filters", "Trend prediction", "Automated reporting"],
  },
  {
    title: "Customer Churn Prediction Model",
    category: "Predictive Analytics",
    description: "Built a robust classification model to predict customer attrition with 91% precision. Applied advanced feature engineering and ensemble learning techniques for optimal performance.",
    longDescription: "Developed a predictive model that helps businesses identify at-risk customers before they churn. The solution includes feature engineering, model selection, and a deployment-ready API.",
    image: "https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Python", "XGBoost", "Feature Engineering", "Random Forest"],
    date: "2024",
    features: ["91% precision score", "Feature importance analysis", "Risk scoring API"],
  },
  {
    title: "Portfolio Web Application",
    category: "Web Development",
    description: "Designed and developed a responsive, modern portfolio website showcasing professional work. Built with React, TypeScript, and Tailwind CSS with attention to performance and UX.",
    longDescription: "A personal portfolio website built from scratch using modern web technologies. Features responsive design, smooth animations, and optimized performance for an excellent user experience.",
    image: "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    date: "2024",
    features: ["Responsive design", "3D animations", "SEO optimized"],
  },
  {
    title: "COVID-19 Data Analysis",
    category: "Data Analysis",
    description: "Comprehensive analysis of COVID-19 trends including infection rates, vaccination progress, and demographic impacts. Created interactive visualizations for public health insights.",
    longDescription: "Analyzed global COVID-19 data to identify patterns, trends, and correlations. The project involved data cleaning, statistical analysis, and creating accessible visualizations for public understanding.",
    image: "https://images.pexels.com/photos/3952232/pexels-photo-3952232.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    date: "2023",
    features: ["Time series analysis", "Geographic visualization", "Statistical modeling"],
  },
  {
    title: "E-commerce Recommendation Engine",
    category: "Machine Learning",
    description: "Developed a collaborative filtering recommendation system for an e-commerce platform, improving product discovery and user engagement through personalized suggestions.",
    longDescription: "Built a recommendation engine using collaborative filtering and content-based approaches. The system analyzes user behavior and product attributes to suggest relevant items.",
    image: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Python", "Scikit-learn", "Collaborative Filtering", "Pandas"],
    date: "2023",
    features: ["Personalized recommendations", "A/B testing ready", "Scalable architecture"],
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects | Mohit Sinha - Data Scientist</title>
        <meta name="description" content="Explore Mohit Sinha's portfolio of Data Science, Machine Learning, and Web Development projects." />
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
              Featured <span className="gradient-text glow-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-3d delay-200">
              A curated collection of projects demonstrating practical applications of 
              Data Science, Machine Learning, and modern development practices.
            </p>
          </div>

          {/* Floating elements */}
          <div className="absolute top-32 right-20 w-24 h-24 opacity-10 animate-float hidden lg:block">
            <div className="w-full h-full rounded-full bg-primary animate-rotate-3d" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="card-3d relative overflow-hidden rounded-2xl border border-border bg-card opacity-0 animate-scale-in-3d"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <Calendar size={12} />
                    {project.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-primary text-sm font-medium">{project.category}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 mb-3 font-heading">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="btn-primary text-sm py-2 px-4 flex-1">
                      <ExternalLink size={16} className="mr-2" />
                      View Project
                    </button>
                    <button className="btn-secondary text-sm py-2 px-4">
                      <Github size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12 opacity-0 animate-fade-up font-heading">Project Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Projects Completed" },
              { value: "5+", label: "Technologies Used" },
              { value: "89%", label: "Avg. Model Accuracy" },
              { value: "100%", label: "Passion Level" },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="card-3d p-6 rounded-xl bg-background border border-border opacity-0 animate-bounce-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
