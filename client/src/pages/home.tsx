import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { WaitlistForm } from "@/components/waitlist-form";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <FeatureSection />
        <WaitlistForm />
      </div>
    </div>
  );
}