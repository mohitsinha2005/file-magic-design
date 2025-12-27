import { Brain, Database, BarChart3, Code2, Globe, GitBranch } from "lucide-react";

const skills = [
  {
    icon: Code2,
    name: "Python & SQL",
    description: "Proficient in Python for data analysis, automation, and scripting. Strong SQL expertise for database querying and management.",
    progress: 85,
  },
  {
    icon: Database,
    name: "Data Science & Analysis",
    description: "Data wrangling, exploratory analysis, and statistical modeling using Pandas, NumPy, and Scikit-learn.",
    progress: 80,
  },
  {
    icon: Brain,
    name: "Machine Learning",
    description: "Foundational knowledge in supervised and unsupervised learning algorithms, model training, and evaluation techniques.",
    progress: 75,
  },
  {
    icon: BarChart3,
    name: "Data Visualization",
    description: "Creating insightful dashboards and reports using Excel, Tableau, Matplotlib, and Seaborn for stakeholder communication.",
    progress: 82,
  },
  {
    icon: Globe,
    name: "Web Technologies",
    description: "Frontend development with HTML, CSS, and React. Building responsive user interfaces for data applications.",
    progress: 78,
  },
  {
    icon: GitBranch,
    name: "Tools & Cloud",
    description: "Version control with Git, collaborative workflows, and foundational knowledge of cloud platforms (AWS, GCP).",
    progress: 70,
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section bg-card">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Technical Proficiencies</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A comprehensive skill set spanning Data Science, Artificial Intelligence, and Modern Web Technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="elevated-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 hover:bg-primary/20 transition-colors">
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
