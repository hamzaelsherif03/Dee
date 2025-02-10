import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Rocket } from "lucide-react";

const features = [
  {
    title: "Lightning Fast",
    description: "Experience blazing-fast performance that keeps your business moving.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security to protect your sensitive business data.",
    icon: Shield,
  },
  {
    title: "Scale Infinitely",
    description: "Grow your business without worrying about technical limitations.",
    icon: Rocket,
  },
];

export function FeatureSection() {
  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built a platform that combines power with simplicity to give your
            business the edge it needs in today's competitive landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
