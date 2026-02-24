import { useState } from "react";
import { Star, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Feedback {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export const ProductFeedback = ({ productId }: { productId: string }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [userName, setUserName] = useState("");
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([
        {
            id: "1",
            userName: "Ananya S.",
            rating: 5,
            comment: "This product worked wonders for my sensitive skin. Highly recommend!",
            date: "Feb 15, 2026",
        },
        {
            id: "2",
            userName: "Rahul M.",
            rating: 4,
            comment: "Good results after a week of use. The texture is a bit thick but effective.",
            date: "Feb 20, 2026",
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        if (!comment.trim() || !userName.trim()) {
            toast.error("Please fill in your name and comment.");
            return;
        }

        const newFeedback: Feedback = {
            id: Date.now().toString(),
            userName,
            rating,
            comment,
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        };

        setFeedbacks([newFeedback, ...feedbacks]);
        setRating(0);
        setComment("");
        setUserName("");
        toast.success("Thank you for your feedback!");
    };

    return (
        <div className="space-y-8 mt-10">
            <Card className="border-none shadow-md bg-rose-50/30">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Add Your Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-700">Rating:</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`p-1 transition-all duration-200 ${(hover || rating) >= star ? "text-warm-gold scale-110" : "text-gray-300"
                                            }`}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        onClick={() => setRating(star)}
                                    >
                                        <Star className="w-6 h-6 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input
                                placeholder="Your Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="bg-white border-rose-100 focus-visible:ring-rose-500"
                            />
                        </div>
                        <Textarea
                            placeholder="What did you think of the product?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="bg-white border-rose-100 min-h-[100px] focus-visible:ring-rose-500"
                        />
                        <Button type="submit" className="bg-rose-600 hover:bg-rose-700 font-semibold px-6">
                            <Send className="w-4 h-4 mr-2" />
                            Submit Review
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 px-1 border-l-4 border-rose-500 ml-1">
                    Customer Reviews
                </h3>
                <div className="grid gap-4">
                    {feedbacks.map((f) => (
                        <Card key={f.id} className="border-rose-50 hover:shadow-md transition-shadow">
                            <CardContent className="p-5 flex gap-4">
                                <Avatar className="h-10 w-10 border-2 border-rose-100">
                                    <AvatarFallback className="bg-rose-50 text-rose-600 font-bold">
                                        {f.userName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-gray-900">{f.userName}</h4>
                                        <span className="text-xs text-gray-400">{f.date}</span>
                                    </div>
                                    <div className="flex text-warm-gold">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 fill-current ${i < f.rating ? "text-warm-gold" : "text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{f.comment}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
