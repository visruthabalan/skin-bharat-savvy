import { useState } from "react";
import { Globe } from "lucide-react";
import { LANGUAGES } from "@/data/skincare";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-display text-xl font-semibold text-foreground">
            Glow<span className="text-gradient">India</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/quiz" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Skin Quiz
          </Link>
          <Link
            to="/products"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/products" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Products
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{LANGUAGES.find((l) => l.code === selectedLang)?.label}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-12 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[140px]">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setLangOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    selectedLang === lang.code ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
