import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToWaitlist = () => {
    document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl hover:text-primary transition-colors">
          YourLogo
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Button onClick={scrollToWaitlist} variant="secondary">
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
}