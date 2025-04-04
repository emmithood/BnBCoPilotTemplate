export const agentRegistry = {
    "listing-rewrite": {
      name: "Listing Rewriter",
      description: "Rewrite listings using AI + SEO optimization.",
      triggerLabel: "Run Listing Rewriter",
      webhookSlug: "listing-rewrite", // relative to client's webhook base
      inputType: "property", // used to determine UI fields
    },
    "review-insights": {
      name: "Review Analyzer",
      description: "Summarize recent guest reviews to extract key themes.",
      triggerLabel: "Analyze Reviews",
      webhookSlug: "review-insights",
      inputType: "property",
    },
    "owner-report": {
      name: "Owner Reporter",
      description: "Generate owner-facing reports summarizing property performance.",
      triggerLabel: "Generate Report",
      webhookSlug: "owner-report",
      inputType: "client",
    },
    // More agents coming soon...
  };
  