import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStripeCheckout, PRICE_IDS } from "@/hooks/use-stripe-checkout";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Starter",
    price: "$29",
    priceId: PRICE_IDS.starter,
    features: [
      "Up to 1,000 customers",
      "Basic analytics",
      "24/7 support",
      "API access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    priceId: PRICE_IDS.professional,
    features: [
      "Up to 10,000 customers",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: PRICE_IDS.enterprise,
    features: [
      "Unlimited customers",
      "Enterprise analytics",
      "Dedicated support",
      "Priority API access",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
    ],
    popular: false,
  },
];

export function PricingPlans() {
  const { redirectToCheckout } = useStripeCheckout();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      await redirectToCheckout(priceId, planName);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize checkout. Please try again.",
      });
    }
  };

  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}