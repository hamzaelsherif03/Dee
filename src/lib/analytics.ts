// Simple analytics tracking
// In a real app, this would integrate with a proper analytics service

export function trackWaitlistSignup() {
  try {
    console.log("Analytics: Waitlist signup tracked");
    // Here you would typically send this to your analytics service
    // e.g. mixpanel.track('waitlist_signup')
  } catch (error) {
    console.error("Analytics error:", error);
  }
}
