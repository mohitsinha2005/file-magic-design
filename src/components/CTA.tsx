import { Mail, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="section">
      <div className="section-container">
        <div className="cta-card">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading">
              Let's Build Something Incredible Together
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Whether you're looking to harness the power of data or integrate AI into your business, 
              I'm here to help transform your vision into reality.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a href="mailto:sinhamohit9870@gmail.com" className="inline-flex items-center px-6 py-3 bg-background text-foreground font-medium rounded-lg hover:bg-background/90 transition-colors">
                <Mail size={18} className="mr-2" />
                Get in Touch
              </a>
              <a href="#projects" className="inline-flex items-center px-6 py-3 border-2 border-primary-foreground/30 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors">
                View Contact Details
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>

            <div className="availability-badge justify-center">
              <span className="availability-dot" />
              <span className="text-primary-foreground/70">
                Available for new projects & opportunities
              </span>
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
  );
};

export default CTA;
