export type SkinConcern = 
  | "acne"
  | "pigmentation"
  | "tanning"
  | "dark-spots"
  | "sensitivity"
  | "oily-skin"
  | "dry-skin"
  | "uneven-tone"
  | "sun-damage"
  | "aging";

export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "normal";

export type BudgetRange = "under-300" | "300-600" | "600-1000" | "above-1000";

export type Climate = "hot-humid" | "hot-dry" | "moderate" | "cold";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  concerns: SkinConcern[];
  skinTypes: SkinType[];
  ingredients: string[];
  description: string;
  badge?: string;
}

export interface QuizAnswers {
  skinType?: SkinType;
  concerns: SkinConcern[];
  budget?: BudgetRange;
  climate?: Climate;
}

export const SKIN_CONCERNS: { id: SkinConcern; label: string; icon: string; description: string }[] = [
  { id: "acne", label: "Acne & Breakouts", icon: "🔴", description: "Pimples, blackheads, whiteheads" },
  { id: "pigmentation", label: "Pigmentation", icon: "🎨", description: "Uneven skin color, dark patches" },
  { id: "tanning", label: "Tanning", icon: "☀️", description: "Sun-induced darkening" },
  { id: "dark-spots", label: "Dark Spots", icon: "⚫", description: "Post-acne marks, blemishes" },
  { id: "sensitivity", label: "Sensitivity", icon: "🌿", description: "Redness, irritation, reactions" },
  { id: "oily-skin", label: "Oily Skin", icon: "💧", description: "Excess sebum, shine" },
  { id: "dry-skin", label: "Dry Skin", icon: "🏜️", description: "Flaky, rough, tight skin" },
  { id: "uneven-tone", label: "Uneven Tone", icon: "🪞", description: "Dull, patchy complexion" },
  { id: "sun-damage", label: "Sun Damage", icon: "🌅", description: "UV-related skin damage" },
  { id: "aging", label: "Fine Lines", icon: "✨", description: "Early signs of aging" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Vitamin C Serum 10%",
    brand: "Minimalist",
    price: 545,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    rating: 4.5,
    concerns: ["pigmentation", "dark-spots", "uneven-tone"],
    skinTypes: ["oily", "combination", "normal"],
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Ferulic Acid"],
    description: "Brightens skin and reduces dark spots with stable Vitamin C formula.",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Salicylic Acid Face Wash",
    brand: "Cetaphil",
    price: 399,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    rating: 4.3,
    concerns: ["acne", "oily-skin"],
    skinTypes: ["oily", "combination"],
    ingredients: ["Salicylic Acid", "Niacinamide", "Aloe Vera"],
    description: "Gentle yet effective cleanser that unclogs pores and controls oil.",
  },
  {
    id: "3",
    name: "SPF 50 Sunscreen Gel",
    brand: "Re'equil",
    price: 695,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    rating: 4.7,
    concerns: ["tanning", "sun-damage", "pigmentation"],
    skinTypes: ["oily", "combination", "sensitive"],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
    description: "Lightweight, non-greasy sunscreen perfect for Indian climate.",
    badge: "Top Rated",
  },
  {
    id: "4",
    name: "Niacinamide 5% Serum",
    brand: "Plum",
    price: 455,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
    rating: 4.4,
    concerns: ["acne", "oily-skin", "dark-spots"],
    skinTypes: ["oily", "combination", "normal"],
    ingredients: ["Niacinamide", "Rice Water", "Hyaluronic Acid"],
    description: "Controls oil production and minimizes pores for clearer skin.",
  },
  {
    id: "5",
    name: "Kumkumadi Face Oil",
    brand: "Forest Essentials",
    price: 1750,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop",
    rating: 4.6,
    concerns: ["pigmentation", "uneven-tone", "aging"],
    skinTypes: ["dry", "normal", "combination"],
    ingredients: ["Saffron", "Vetiver", "Lotus", "Sandalwood"],
    description: "Luxurious Ayurvedic face oil for radiant, even-toned skin.",
    badge: "Premium",
  },
  {
    id: "6",
    name: "Aloe Vera Gel",
    brand: "Wow Skin Science",
    price: 249,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop",
    rating: 4.2,
    concerns: ["sensitivity", "tanning", "dry-skin"],
    skinTypes: ["sensitive", "dry", "normal"],
    ingredients: ["Aloe Vera", "Vitamin E", "Glycerin"],
    description: "Soothing multipurpose gel for sensitive and sun-exposed skin.",
  },
  {
    id: "7",
    name: "Alpha Arbutin Serum",
    brand: "Minimalist",
    price: 549,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=300&h=300&fit=crop",
    rating: 4.5,
    concerns: ["pigmentation", "dark-spots", "uneven-tone"],
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    ingredients: ["Alpha Arbutin", "Hyaluronic Acid"],
    description: "Targets stubborn pigmentation and dark spots safely.",
  },
  {
    id: "8",
    name: "Ceramide Moisturizer",
    brand: "Dot & Key",
    price: 595,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop",
    rating: 4.3,
    concerns: ["dry-skin", "sensitivity"],
    skinTypes: ["dry", "sensitive", "normal"],
    ingredients: ["Ceramides", "Hyaluronic Acid", "Cica"],
    description: "Restores skin barrier with deep hydration for dry and sensitive skin.",
  },
  {
    id: "9",
    name: "Tea Tree Face Wash",
    brand: "Mamaearth",
    price: 299,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    rating: 4.1,
    concerns: ["acne", "oily-skin"],
    skinTypes: ["oily", "combination"],
    ingredients: ["Tea Tree Oil", "Neem", "Salicylic Acid"],
    description: "Natural antibacterial face wash for acne-prone Indian skin.",
  },
  {
    id: "10",
    name: "De-Tan Face Pack",
    brand: "VLCC",
    price: 195,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=300&fit=crop",
    rating: 4.0,
    concerns: ["tanning", "uneven-tone", "sun-damage"],
    skinTypes: ["oily", "combination", "normal", "dry"],
    ingredients: ["Tomato Extract", "Oat", "Honey"],
    description: "Affordable de-tanning pack for Indian climate conditions.",
  },
];

export const BUDGET_OPTIONS: { id: BudgetRange; label: string; range: string }[] = [
  { id: "under-300", label: "Budget Friendly", range: "Under ₹300" },
  { id: "300-600", label: "Mid Range", range: "₹300 - ₹600" },
  { id: "600-1000", label: "Premium", range: "₹600 - ₹1000" },
  { id: "above-1000", label: "Luxury", range: "Above ₹1000" },
];

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export function getBudgetRange(budget: BudgetRange): [number, number] {
  switch (budget) {
    case "under-300": return [0, 300];
    case "300-600": return [300, 600];
    case "600-1000": return [600, 1000];
    case "above-1000": return [1000, Infinity];
  }
}

export function filterProducts(
  products: Product[],
  concerns: SkinConcern[],
  budget?: BudgetRange,
  skinType?: SkinType
): Product[] {
  return products.filter((p) => {
    const matchesConcern = concerns.length === 0 || concerns.some((c) => p.concerns.includes(c));
    const matchesBudget = !budget || (() => {
      const [min, max] = getBudgetRange(budget);
      return p.price >= min && p.price <= max;
    })();
    const matchesSkinType = !skinType || p.skinTypes.includes(skinType);
    return matchesConcern && matchesBudget && matchesSkinType;
  });
}
