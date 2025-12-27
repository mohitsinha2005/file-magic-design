interface AboutProps {
  profileImage: string;
}

const About = ({ profileImage }: AboutProps) => {
  const stats = [
    { value: "10+", label: "Projects" },
    { value: "6+", label: "Certifications" },
    { value: "2+", label: "Years Learning" },
  ];

  const details = [
    {
      label: "Academic Background",
      value: "Pursuing Bachelor of Computer Applications (BCA) alongside BS in Data Science from IIT Madras, with specialized focus on Artificial Intelligence, Machine Learning, and Statistical Analysis.",
    },
    {
      label: "Core Competencies",
      value: "Expertise in data preprocessing, exploratory data analysis, predictive modeling, and creating data-driven solutions. Proficient in translating business requirements into technical implementations.",
    },
    {
      label: "Professional Objective",
      value: "Seeking opportunities to apply analytical skills and technical expertise in Data Science and AI to drive organizational growth, optimize processes, and deliver measurable business outcomes.",
    },
  ];

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="elevated-card">
              <div className="mb-6">
                <h2 className="section-title mb-2">Professional Profile</h2>
                <p className="text-primary font-medium">Data-Driven Problem Solver</p>
              </div>

              <div className="space-y-6">
                {details.map((detail, index) => (
                  <div key={index}>
                    <h4 className="text-foreground font-semibold mb-2">{detail.label}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{detail.value}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn-secondary mt-6 inline-flex">
                Connect With Me
              </a>
            </div>
          </div>

          {/* Visual with Stats */}
          <div className="flex flex-col items-center gap-8">
            <div className="hero-image-frame w-64 h-64 rounded-2xl overflow-hidden">
              <img
                src={profileImage}
                alt="Mohit Sinha"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-circle">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
