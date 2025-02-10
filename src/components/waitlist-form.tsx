import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackWaitlistSignup } from "@/lib/analytics";
import { useConfetti } from "@/hooks/use-confetti";

interface WaitlistCount {
  count: number;
}

interface WaitlistPosition {
  position: number;
}

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const { toast } = useToast();
  const { fireConfetti } = useConfetti();

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
    },
  });

  const { data: waitlistCount } = useQuery<WaitlistCount>({
    queryKey: ["/api/waitlist/count"],
  });

  const { data: position } = useQuery<WaitlistPosition>({
    queryKey: [`/api/waitlist/position/${encodeURIComponent(userEmail)}`],
    enabled: submitted && !!userEmail,
  });

  // Fire confetti when position data is available
  useEffect(() => {
    if (position) {
      fireConfetti();
    }
  }, [position, fireConfetti]);

  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      setSubmitted(true);
      setUserEmail(variables.email);
      trackWaitlistSignup();
      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: InsertWaitlist) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h3 className="text-2xl font-bold mb-4">Thank you for joining!</h3>
        {position && (
          <motion.p
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-xl text-primary mb-4 font-bold"
          >
            You are in position #{position.position} on our waitlist! 🎉
          </motion.p>
        )}
        <p className="text-muted-foreground">
          We'll be in touch soon with updates about our launch.
        </p>
      </motion.div>
    );
  }

  return (
    <section id="waitlist" className="py-24 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
          <p className="text-muted-foreground">
            {waitlistCount?.count
              ? `Join ${waitlistCount.count} others already on the waitlist!`
              : "Be among the first to get access!"}
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Join Waitlist"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}