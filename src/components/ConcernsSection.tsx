import { Link } from "react-router-dom";
import { SKIN_CONCERNS } from "@/data/skincare";

const ConcernsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What's Your Skin <span className="text-gradient">Concern?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your skin concerns and we'll recommend the best products tailored for Indian skin types and climate.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SKIN_CONCERNS.map((concern, index) => (
            <Link
              key={concern.id}
              to={`/products?concern=${concern.id}`}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="text-3xl block mb-3">{concern.icon}</span>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {concern.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{concern.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;
