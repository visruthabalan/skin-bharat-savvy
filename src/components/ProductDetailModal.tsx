import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/skincare";
import { Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-none shadow-2xl">
                <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
                    <div className="md:w-1/2 relative bg-rose-50/30">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover max-h-[400px] md:max-h-full"
                        />
                        {product.badge && (
                            <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold gradient-warm text-white shadow-lg">
                                {product.badge}
                            </span>
                        )}
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col">
                        <DialogHeader className="space-y-1 mb-4">
                            <p className="text-rose-600 font-bold tracking-widest text-xs uppercase">{product.brand}</p>
                            <DialogTitle className="text-3xl font-display font-bold text-gray-900">{product.name}</DialogTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-warm-gold">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? "text-warm-gold" : "text-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-500">({product.rating})</span>
                            </div>
                        </DialogHeader>

                        <DialogDescription className="text-gray-600 leading-relaxed mb-6 text-base">
                            {product.description}
                        </DialogDescription>

                        <div className="space-y-6 flex-1">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                                    Key Ingredients
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ing) => (
                                        <span
                                            key={ing}
                                            className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100"
                                        >
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-rose-100 mt-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium">Price</span>
                                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">IN STOCK</span>
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-lg font-bold shadow-xl shadow-rose-200 transition-all active:scale-95"
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-3" />
                                    Add to Shopping Bag
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
