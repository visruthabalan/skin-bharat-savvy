import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SKIN_CONCERNS, BUDGET_OPTIONS, SkinType, SkinConcern, BudgetRange, Climate } from "@/data/skincare";

const SKIN_TYPES: { id: SkinType; label: string; description: string; icon: string }[] = [
  { id: "oily", label: "Oily", description: "Shiny, enlarged pores", icon: "💧" },
  { id: "dry", label: "Dry", description: "Tight, flaky, rough", icon: "🏜️" },
  { id: "combination", label: "Combination", description: "Oily T-zone, dry cheeks", icon: "⚖️" },
  { id: "sensitive", label: "Sensitive", description: "Easily irritated, red", icon: "🌸" },
  { id: "normal", label: "Normal", description: "Balanced, few issues", icon: "✨" },
];

const CLIMATES: { id: Climate; label: string; description: string; icon: string }[] = [
  { id: "hot-humid", label: "Hot & Humid", description: "Coastal cities like Mumbai, Chennai", icon: "🌊" },
  { id: "hot-dry", label: "Hot & Dry", description: "Rajasthan, parts of Gujarat", icon: "☀️" },
  { id: "moderate", label: "Moderate", description: "Bangalore, Pune", icon: "🌤️" },
  { id: "cold", label: "Cold", description: "Himalayan regions, Delhi winters", icon: "❄️" },
];

const SkinQuiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<SkinType | undefined>();
  const [concerns, setConcerns] = useState<SkinConcern[]>([]);
  const [budget, setBudget] = useState<BudgetRange | undefined>();
  const [climate, setClimate] = useState<Climate | undefined>();

  const toggleConcern = (id: SkinConcern) => {
    setConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    const params = new URLSearchParams();
    if (skinType) params.set("skinType", skinType);
    if (concerns.length) params.set("concern", concerns.join(","));
    if (budget) params.set("budget", budget);
    navigate(`/products?${params.toString()}`);
  };

  const canNext = () => {
    if (step === 0) return !!skinType;
    if (step === 1) return concerns.length > 0;
    if (step === 2) return !!budget;
    if (step === 3) return !!climate;
    return false;
  };

  const steps = ["Skin Type", "Concerns", "Budget", "Climate"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i < step
                      ? "gradient-warm text-primary-foreground"
                      : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {step === 0 && "What's your skin type?"}
              {step === 1 && "What are your skin concerns?"}
              {step === 2 && "What's your budget?"}
              {step === 3 && "What's your climate?"}
            </h1>
            <p className="text-muted-foreground">
              {step === 0 && "This helps us recommend products that work for you."}
              {step === 1 && "Select all that apply — we'll prioritize accordingly."}
              {step === 2 && "We'll filter products within your comfort range."}
              {step === 3 && "Indian climate varies greatly — your location matters."}
            </p>
          </div>

          {/* Step 0: Skin Type */}
          {step === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SKIN_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSkinType(type.id)}
                  className={`p-5 rounded-xl border-2 text-center transition-all duration-200 ${
                    skinType === type.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <h3 className="font-semibold text-foreground">{type.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Concerns */}
          {step === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SKIN_CONCERNS.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => toggleConcern(concern.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    concerns.includes(concern.id)
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl block mb-1">{concern.icon}</span>
                  <h3 className="font-semibold text-sm text-foreground">{concern.label}</h3>
                  <p className="text-xs text-muted-foreground">{concern.description}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setBudget(opt.id)}
                  className={`p-6 rounded-xl border-2 text-center transition-all duration-200 ${
                    budget === opt.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <h3 className="font-semibold text-foreground text-lg">{opt.range}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{opt.label}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Climate */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              {CLIMATES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setClimate(c.id)}
                  className={`p-5 rounded-xl border-2 text-center transition-all duration-200 ${
                    climate === c.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-3xl block mb-2">{c.icon}</span>
                  <h3 className="font-semibold text-foreground">{c.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-muted text-foreground font-medium disabled:opacity-40 hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-warm text-primary-foreground font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!canNext()}
                className="flex items-center gap-2 px-8 py-3 rounded-lg gradient-warm text-primary-foreground font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                See My Recommendations
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinQuiz;
