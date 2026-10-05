import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/certifications", label: "Certifications" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-xl font-bold text-foreground">
            Mohit Sinha
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                className={`nav-link ${location.pathname === link.href ? 'text-primary' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden py-3 border-t border-border bg-background/95 backdrop-blur-md max-h-[calc(100svh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link py-2 ${location.pathname === link.href ? 'text-primary' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
