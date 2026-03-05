import { useState, useEffect } from "react";
import { Plus, Trash2, Package, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
    Product,
    SkinConcern,
    SkinType,
    SKIN_CONCERNS,
    saveLocalProduct,
    getLocalProducts,
    deleteLocalProduct,
    PRODUCTS
} from "@/data/skincare";

const SKIN_TYPES: { id: SkinType; label: string }[] = [
    { id: "oily", label: "Oily" },
    { id: "dry", label: "Dry" },
    { id: "combination", label: "Combination" },
    { id: "sensitive", label: "Sensitive" },
    { id: "normal", label: "Normal" },
];

const Admin = () => {
    const [localProducts, setLocalProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState<SkinType[]>([]);

    useEffect(() => {
        setLocalProducts(getLocalProducts());
    }, []);

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !brand || !price || !image || selectedConcerns.length === 0 || selectedSkinTypes.length === 0) {
            toast.error("Please fill in all required fields and select at least one concern and skin type.");
            return;
        }

        const newProduct: Product = {
            id: Date.now().toString(),
            name,
            brand,
            price: Number(price),
            image,
            rating: 5.0, // Default rating for new products
            concerns: selectedConcerns,
            skinTypes: selectedSkinTypes,
            ingredients: [], // Could be added later
            description,
        };

        saveLocalProduct(newProduct);
        setLocalProducts(getLocalProducts());
        setIsAdding(false);
        resetForm();
        toast.success("Product added successfully!");
    };

    const handleDelete = (id: string) => {
        deleteLocalProduct(id);
        setLocalProducts(getLocalProducts());
        toast.success("Product deleted.");
    };

    const resetForm = () => {
        setName("");
        setBrand("");
        setPrice("");
        setImage("");
        setDescription("");
        setSelectedConcerns([]);
        setSelectedSkinTypes([]);
    };

    const toggleConcern = (id: SkinConcern) => {
        setSelectedConcerns(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleSkinType = (id: SkinType) => {
        setSelectedSkinTypes(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your skincare product catalog</p>
                    </div>
                    <Button
                        onClick={() => setIsAdding(!isAdding)}
                        className="gradient-warm text-primary-foreground"
                    >
                        {isAdding ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {isAdding ? "Cancel" : "Add Product"}
                    </Button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAddProduct} className="bg-card border border-border rounded-xl p-6 mb-12 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            Add New Product
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name *</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Hyaluronic Face Cream" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand *</Label>
                                <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Minimalist" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹) *</Label>
                                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 499" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL *</Label>
                                <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://unsplash.com/..." />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe the product and its benefits..." />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <Label className="mb-3 block">Target Concerns *</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {SKIN_CONCERNS.map((concern) => (
                                        <div key={concern.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`concern-${concern.id}`}
                                                checked={selectedConcerns.includes(concern.id)}
                                                onCheckedChange={() => toggleConcern(concern.id)}
                                            />
                                            <label htmlFor={`concern-${concern.id}`} className="text-sm cursor-pointer whitespace-nowrap">
                                                {concern.icon} {concern.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="mb-3 block">Skin Types *</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {SKIN_TYPES.map((type) => (
                                        <div key={type.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`type-${type.id}`}
                                                checked={selectedSkinTypes.includes(type.id)}
                                                onCheckedChange={() => toggleSkinType(type.id)}
                                            />
                                            <label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                                                {type.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit" className="gradient-warm text-primary-foreground px-8">Save Product</Button>
                        </div>
                    </form>
                )}

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Product Catalog</h2>

                    <div className="grid gap-4">
                        {/* Locally added products first */}
                        {localProducts.map((product) => (
                            <div key={product.id} className="bg-card border border-primary/20 rounded-lg p-4 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">{product.brand} • ₹{product.price}</p>
                                    </div>
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">New</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}

                        {/* Static products (cannot be deleted) */}
                        {PRODUCTS.map((product) => (
                            <div key={product.id} className="bg-muted/30 border border-border rounded-lg p-4 flex items-center justify-between opacity-80">
                                <div className="flex items-center gap-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover grayscale-[0.5]" />
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">{product.brand} • ₹{product.price}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold uppercase">System</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
