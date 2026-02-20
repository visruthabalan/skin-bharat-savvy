import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="font-display text-xl font-semibold text-primary-foreground">GlowIndia</span>
            </div>
            <p className="text-sm text-primary-foreground/60 max-w-xs">
              Personalized skincare for every Indian skin type. Backed by dermatology, rooted in tradition.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/quiz" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Skin Quiz
              </Link>
              <Link to="/products" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Products
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Skin Concerns</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p>Acne & Breakouts</p>
              <p>Pigmentation & Dark Spots</p>
              <p>Tanning & Sun Damage</p>
              <p>Sensitive Skin</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © 2026 GlowIndia. Made with ❤️ for Indian skin.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
