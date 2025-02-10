import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, positionLookupSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { stripe, subscriptionSchema } from "./stripe";

export function registerRoutes(app: Express): Server {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      const entry = await storage.addToWaitlist(data);
      res.json(entry);
    } catch (err: any) {
      if (err.name === "ZodError") {
        res.status(400).json({ message: fromZodError(err).message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/waitlist/position/:email", async (req, res) => {
    try {
      const { email } = positionLookupSchema.parse({ email: req.params.email });
      const position = await storage.getPositionByEmail(email);

      if (position === null) {
        res.status(404).json({ message: "Email not found in waitlist" });
      } else {
        res.json({ position });
      }
    } catch (err: any) {
      if (err.name === "ZodError") {
        res.status(400).json({ message: fromZodError(err).message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // New payment routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { priceId, planName } = subscriptionSchema.parse(req.body);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/features`,
      });

      res.json({ sessionId: session.id });
    } catch (err: any) {
      if (err.name === "ZodError") {
        res.status(400).json({ message: fromZodError(err).message });
      } else {
        console.error("Stripe error:", err);
        res.status(500).json({ message: "Failed to create checkout session" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}