import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Sentiment Analysis",
    category: "Machine Learning",
    description: "Real-time sentiment analysis using NLP and deep learning models for social media data.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Python", "TensorFlow", "NLP"],
  },
  {
    title: "Predictive Analytics Dashboard",
    category: "Data Visualization",
    description: "Interactive dashboard for business forecasting with real-time data integration.",
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Tableau", "Python", "SQL"],
  },
  {
    title: "Customer Churn Prediction",
    category: "Machine Learning",
    description: "ML model achieving 94% accuracy in predicting customer churn for telecom industry.",
    image: "https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Scikit-learn", "Pandas", "XGBoost"],
  },
  {
    title: "Image Classification System",
    category: "Deep Learning",
    description: "CNN-based image classification with 98% accuracy on custom dataset.",
    image: "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["PyTorch", "CNN", "Computer Vision"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Showcasing impactful data science and AI projects that drive business value
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="project-overlay p-6">
                <span className="text-primary text-sm font-medium mb-2">{project.category}</span>
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    <ExternalLink size={16} className="mr-1" />
                    View
                  </button>
                  <button className="btn-secondary text-sm py-2 px-4">
                    <Github size={16} className="mr-1" />
                    Code
                  </button>
                </div>
              </div>
              {/* Visible info on non-hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent group-hover:opacity-0 transition-opacity">
                <span className="text-primary text-sm">{project.category}</span>
                <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
