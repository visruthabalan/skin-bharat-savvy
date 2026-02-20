import { Product } from "@/data/skincare";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group rounded-xl bg-card border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold gradient-warm text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.brand}</p>
            <h3 className="font-display font-semibold text-foreground mt-1">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {product.ingredients.slice(0, 3).map((ing) => (
            <span key={ing} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground">
              {ing}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          <button className="px-4 py-2 rounded-lg gradient-warm text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
