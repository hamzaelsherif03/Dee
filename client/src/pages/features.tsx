import { FeatureSection } from "@/components/feature-section";
import { PricingPlans } from "@/components/pricing-plans";
import { Navbar } from "@/components/navbar";

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <FeatureSection />
        <PricingPlans />
      </div>
    </div>
  );
}
