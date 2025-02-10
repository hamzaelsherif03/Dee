import Stripe from "stripe";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

// Define the schema for subscription request
export const subscriptionSchema = z.object({
  priceId: z.string(),
  planName: z.string(),
});

// Price IDs for different plans
export const STRIPE_PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER || "price_starter",
  professional: process.env.STRIPE_PRICE_PRO || "price_professional",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "price_enterprise",
} as const;