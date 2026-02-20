import { IndianRupee, Thermometer, Languages, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "AI-powered suggestions based on your skin type, concerns, and Indian climate conditions.",
  },
  {
    icon: IndianRupee,
    title: "Budget-Friendly Filters",
    description: "Find effective skincare within your budget — from ₹199 to premium ranges.",
  },
  {
    icon: Thermometer,
    title: "Climate-Aware Solutions",
    description: "Products suited for India's diverse climates — humid coastal, dry northern, or tropical southern.",
  },
  {
    icon: Languages,
    title: "Regional Language Support",
    description: "Browse in Hindi, Tamil, Telugu, Malayalam, Kannada and more — skincare in your language.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Why <span className="text-gradient">GlowIndia?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built specifically for Indian skincare needs — no more one-size-fits-all solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-warm flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
