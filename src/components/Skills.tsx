import { Brain, Database, BarChart3, BookOpen, Globe, Code2 } from "lucide-react";

const skills = [
  {
    icon: Brain,
    name: "Machine Learning",
    description: "Building predictive models with Scikit-learn, TensorFlow, Keras, and PyTorch.",
    progress: 90,
  },
  {
    icon: Database,
    name: "Data Engineering",
    description: "Pandas, NumPy, SQL databases, and ETL pipeline development.",
    progress: 88,
  },
  {
    icon: BarChart3,
    name: "Data Visualization",
    description: "Creating insights with Matplotlib, Seaborn, Tableau, and Power BI.",
    progress: 85,
  },
  {
    icon: Code2,
    name: "Python & R",
    description: "Advanced programming for data analysis and statistical computing.",
    progress: 92,
  },
  {
    icon: BookOpen,
    name: "React & Web",
    description: "Building responsive UI for data applications using HTML, CSS, and React.",
    progress: 75,
  },
  {
    icon: Globe,
    name: "Cloud & Deployment",
    description: "AWS, Google Cloud, and Docker for scalable ML solutions.",
    progress: 70,
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section bg-card">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Comprehensive expertise in Data Science, Machine Learning, and AI-driven solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="elevated-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <skill.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </div>
              </div>
              <div className="skill-meter">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
