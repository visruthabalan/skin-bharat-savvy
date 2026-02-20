import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-skincare.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-warm-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
              <Sparkles className="w-4 h-4 text-warm-gold" />
              Personalized for Indian Skin
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-foreground">
              Your Skin,{" "}
              <span className="text-gradient">Your Glow</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Discover skincare tailored for Indian skin tones, climate, and lifestyle.
              Get personalized recommendations for pigmentation, acne, tanning & more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-warm text-primary-foreground font-semibold text-base shadow-lg hover:opacity-90 transition-all hover:shadow-xl"
              >
                Take Skin Quiz
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-card border border-border text-foreground font-semibold text-base hover:bg-muted transition-colors"
              >
                Browse Products
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-sage-green" />
                Dermatologist Approved
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="w-5 h-5 text-sage-green" />
                Clean Ingredients
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Natural Indian skincare ingredients - turmeric, sandalwood, rose petals"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
