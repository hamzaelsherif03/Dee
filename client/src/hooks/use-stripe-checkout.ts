import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  console.error("Missing Stripe publishable key. Payment features will be disabled.");
}

const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export const PRICE_IDS = {
  starter: "price_starter",
  professional: "price_professional",
  enterprise: "price_enterprise",
} as const;

export function useStripeCheckout() {
  const { toast } = useToast();

  const redirectToCheckout = useCallback(async (priceId: string, planName: string) => {
    if (!stripePromise) {
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Payment system is not properly configured. Please try again later.",
      });
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const response = await apiRequest("POST", "/api/create-checkout-session", {
        priceId,
        planName,
      });

      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: err.message || "Failed to initialize checkout. Please try again.",
      });
    }
  }, [toast]);

  return { redirectToCheckout };
}