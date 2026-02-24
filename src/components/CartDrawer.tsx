import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative h-11 w-11 rounded-full border-2 border-rose-100 bg-white hover:bg-rose-50 transition-colors">
                    <ShoppingCart className="h-5 w-5 text-rose-600" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-[11px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-6">
                <SheetHeader className="pb-6">
                    <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                        Your Cart
                        <span className="text-sm font-normal text-muted-foreground">({totalItems} items)</span>
                    </SheetTitle>
                    <SheetDescription>
                        Review your skincare selection before checking out.
                    </SheetDescription>
                </SheetHeader>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-70">
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                        <Button variant="link" className="text-rose-600 font-semibold" onClick={() => (document.querySelector('[data-state="open"]') as any)?.click()}>
                            Start shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-4 -mr-4">
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-rose-50 bg-rose-50/30">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between text-base font-semibold text-gray-900">
                                                <h3 className="line-clamp-1">{item.name}</h3>
                                                <p className="ml-4">₹{item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">₹{item.price} each</p>
                                            <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                                <div className="flex items-center border rounded-lg overflow-hidden h-9 shadow-sm bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 hover:bg-rose-50 transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-10 text-center font-medium bg-rose-50/20">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 hover:bg-rose-50 transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 h-9 px-3"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="pt-6 space-y-4">
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Subtotal</p>
                                    <p>₹{totalPrice}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Shipping</p>
                                    <p className="text-green-600 font-medium">FREE</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <p>Total</p>
                                    <p>₹{totalPrice}</p>
                                </div>
                            </div>
                            <Button className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-lg font-semibold shadow-lg shadow-rose-200 transition-all hover:scale-[1.02]">
                                Checkout
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <p className="text-center text-xs text-gray-400">
                                Secure SSL encrypted payment
                            </p>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};
