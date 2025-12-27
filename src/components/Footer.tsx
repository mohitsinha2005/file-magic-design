import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/mohitsinha", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/mohitsinha", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/mohitsinha", label: "Twitter" },
    { icon: Mail, href: "mailto:sinhamohit9870@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#home" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Certifications", href: "#certifications" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "Resume", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
  ];

  return (
    <footer className="footer-section">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Mohit Sinha
            </h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Data Scientist & AI Researcher dedicated to transforming complex data into actionable insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-icon"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Mohit Sinha. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
