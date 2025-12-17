import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import MRTZLogo from "./MRTZLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <MRTZLogo size="sm" animated={false} />
            <p className="mt-4 text-sm text-muted-foreground font-body max-w-xs">
              Sculptural art that dwells in the space between darkness and elegance.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:items-center">
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Gallery", href: "/gallery" },
                { label: "Drops", href: "/drops" },
                { label: "Commission", href: "/commission" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Connect
            </h4>
            <div className="flex md:justify-end gap-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@mrtz.art"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              contact@mrtz.art
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} MRTZ. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
