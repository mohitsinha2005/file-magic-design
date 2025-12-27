import { Award, BookCheck, Trophy, GraduationCap, Star, Medal } from "lucide-react";

const certifications = [
  {
    icon: Award,
    title: "Google Data Analytics Professional",
    issuer: "Google",
    date: "2024",
  },
  {
    icon: Trophy,
    title: "IBM Data Science Professional",
    issuer: "IBM",
    date: "2024",
  },
  {
    icon: GraduationCap,
    title: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "2023",
  },
  {
    icon: BookCheck,
    title: "Machine Learning with Python",
    issuer: "IBM",
    date: "2023",
  },
  {
    icon: Star,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
  },
  {
    icon: Medal,
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2024",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="section bg-card">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Professional Certifications</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Validated expertise in Data Science and Artificial Intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              <div className="cert-icon">
                <cert.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                <span className="text-primary text-xs">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
