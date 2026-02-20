import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import {
  PRODUCTS,
  SKIN_CONCERNS,
  BUDGET_OPTIONS,
  filterProducts,
  SkinConcern,
  BudgetRange,
  SkinType,
} from "@/data/skincare";

const SKIN_TYPES: { id: SkinType; label: string }[] = [
  { id: "oily", label: "Oily" },
  { id: "dry", label: "Dry" },
  { id: "combination", label: "Combination" },
  { id: "sensitive", label: "Sensitive" },
  { id: "normal", label: "Normal" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialConcerns = (searchParams.get("concern")?.split(",") || []) as SkinConcern[];
  const initialBudget = searchParams.get("budget") as BudgetRange | undefined;
  const initialSkinType = searchParams.get("skinType") as SkinType | undefined;

  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>(initialConcerns);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | undefined>(initialBudget);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | undefined>(initialSkinType);
  const [showFilters, setShowFilters] = useState(true);

  const toggleConcern = (id: SkinConcern) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(
    () => filterProducts(PRODUCTS, selectedConcerns, selectedBudget, selectedSkinType),
    [selectedConcerns, selectedBudget, selectedSkinType]
  );

  const clearFilters = () => {
    setSelectedConcerns([]);
    setSelectedBudget(undefined);
    setSelectedSkinType(undefined);
  };

  const hasFilters = selectedConcerns.length > 0 || selectedBudget || selectedSkinType;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {hasFilters ? "Recommended" : "All"} Products
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 && "s"} found
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`md:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}

            {/* Skin Type Filter */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">Skin Type</h3>
              <div className="space-y-2">
                {SKIN_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSkinType(selectedSkinType === type.id ? undefined : type.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSkinType === type.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filter */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">Budget</h3>
              <div className="space-y-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBudget(selectedBudget === opt.id ? undefined : opt.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedBudget === opt.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt.range}
                  </button>
                ))}
              </div>
            </div>

            {/* Concerns Filter */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {SKIN_CONCERNS.map((concern) => (
                  <button
                    key={concern.id}
                    onClick={() => toggleConcern(concern.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedConcerns.includes(concern.id)
                        ? "gradient-warm text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {concern.icon} {concern.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 rounded-lg gradient-warm text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
