import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToWaitlist = () => {
    document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Transform Your Business
          <br />
          with Our Innovation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Join the waitlist to be among the first to experience our revolutionary platform
          that's changing the way businesses operate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" onClick={scrollToWaitlist}>
            Join Waitlist
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 rounded-lg bg-gradient-to-b from-primary/10 to-primary/5 p-8"
        >
          <div className="aspect-video bg-gradient-to-tr from-primary/20 to-primary/10 rounded-lg shadow-xl flex items-center justify-center">
            <span className="text-primary/40 text-lg">Your Product Preview</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}