/**
 * Configuration file for STR AI Dashboard
 * 
 * This file contains all configurable settings that can be customized per client deployment.
 * Values here will be replaced with client-specific data when deployed via Docker.
 */

interface NavItem {
  name: string;
  path: string;
  icon: JSX.Element; // The icon components are imported where needed
}

interface AppConfig {
  // App branding
  appName: string;
  appVersion: string;
  
  // Navigation
  navigation: {
    items: Array<{
      name: string;
      path: string;
      // Icons will be defined in the component
    }>;
  };
  
  // Agents configuration
  agents: {
    defaultProperty: string;
    properties: Array<{
      id: string;
      name: string;
    }>;
    templates: Array<{
      title: string;
      slug: string;
      description: string;
      tasks: string[];
      // Icon will be defined in the component
    }>;
    list: Array<{
      name: string;
      slug: string;
      description: string;
      // Icon will be defined in the component
    }>;
  };
  
  // Metrics default values
  metrics: {
    tasksCompleted: {
      title: string;
      value: number;
      change: { value: string; isPositive: boolean };
      description: string;
    };
    timeSaved: {
      title: string;
      value: number;
      suffix: string;
      change: { value: string; isPositive: boolean };
      description: string;
    };
    accuracy: {
      title: string;
      value: string;
      change: { value: string; isPositive: boolean };
      description: string;
    };
  };
  
  // Template agent data
  templateAgent: {
    workSummary: string;
    pendingItems: Array<{
      id: string;
      title: string;
      type: string;
      createdAt: string;
      status: string;
    }>;
    taskLog: Array<{
      id: string;
      name: string;
      status: string;
      timestamp: string;
      duration?: string;
      details?: string;
    }>;
  };
  
  // Chat configuration
  chat: {
    welcomeMessage: string;
    brandName: string;
    docTrainingNotice: string;
  };
}

/**
 * Main configuration object
 * These values can be updated per client when deploying the application
 */
const config: AppConfig = {
  // App branding
  appName: "STR COPILOT",
  appVersion: "1.0.1",
  
  // Navigation
  navigation: {
    items: [
      { name: "AI Chat", path: "/chat" },
      { name: "AI Agents", path: "/agents" },
      { name: "Documents", path: "/documents" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  
  // Agents configuration
  agents: {
    defaultProperty: "",
    properties: [
      { id: "prop-1", name: "Oceanview Villa" },
      { id: "prop-2", name: "Mountain Retreat" },
      { id: "prop-3", name: "Downtown Loft" },
      { id: "prop-4", name: "Lakeside Cabin" },
    ],
    templates: [
      {
        title: "Template Agent",
        slug: "template",
        description: "A versatile AI agent for property management tasks",
        tasks: [
          "Rewrite listings using SEO",
          "Generate blog posts",
          "Summarize guest reviews"
        ],
      },
    ],
    list: [
      {
        name: "Listing Rewriter",
        slug: "listing-rewrite",
        description: "Rewrite a listing with new amenities and tone",
      },
      {
        name: "Review Analyzer",
        slug: "review-insights",
        description: "Summarize themes from recent guest reviews",
      },
      {
        name: "Owner Reporter",
        slug: "owner-report",
        description: "Generate an owner-facing performance summary",
      },
      {
        name: "Price Optimizer",
        slug: "price-optimize",
        description: "Suggest optimal pricing based on market trends",
      },
      {
        name: "Maintenance Planner",
        slug: "maintenance-plan",
        description: "Create preventative maintenance schedules",
      },
      {
        name: "Guest Communicator",
        slug: "guest-comms",
        description: "Automate guest messaging sequences",
      },
    ],
  },
  
  // Metrics default values
  metrics: {
    tasksCompleted: {
      title: "Tasks Completed",
      value: 247,
      change: { value: "12%", isPositive: true },
      description: "Last 30 days"
    },
    timeSaved: {
      title: "Time Saved",
      value: 38,
      suffix: "hrs",
      change: { value: "8%", isPositive: true },
      description: "Last 30 days"
    },
    accuracy: {
      title: "Agent Performance",
      value: "95.3%",
      change: { value: "2.1%", isPositive: true },
      description: "Accuracy rating"
    }
  },
  
  // Template agent data
  templateAgent: {
    workSummary: `The Template Agent has been highly productive over the past 30 days, completing 247 tasks with a 95.3% accuracy rate, which is a 2.1% improvement from the previous period.

Key activities include:
• Rewriting 45 property listings with improved SEO, resulting in better search visibility
• Generating 32 blog posts about vacation rental tips and local attractions
• Summarizing 170 guest reviews to identify common themes and areas for improvement

The agent has saved approximately 38 hours of manual work, freeing up staff to focus on higher-value activities. The most significant improvement has been in the quality of SEO-optimized listings, which now include more detailed descriptions of amenities and better location highlights.`,
    pendingItems: [
      {
        id: "1",
        title: "Beachfront Villa Listing Rewrite",
        type: "Listing",
        createdAt: "2025-03-22T10:30:00Z",
        status: "pending"
      },
      {
        id: "2",
        title: "5 Things to Do in Miami - Blog Post",
        type: "Blog Post",
        createdAt: "2025-03-22T09:15:00Z",
        status: "pending"
      },
      {
        id: "3",
        title: "February 2025 Guest Review Summary",
        type: "Review Summary",
        createdAt: "2025-03-21T16:45:00Z",
        status: "pending"
      }
    ],
    taskLog: [
      {
        id: "1",
        name: "Mountain Cabin Listing Rewrite",
        status: "completed",
        timestamp: "2025-03-22T11:30:00Z",
        duration: "45s",
        details: "Successfully rewrote the Mountain Cabin listing with enhanced SEO keywords, added more detailed amenity descriptions, and highlighted nearby attractions."
      },
      {
        id: "2",
        name: "Top 10 Beach Activities - Blog Post",
        status: "completed",
        timestamp: "2025-03-22T10:15:00Z",
        duration: "1m 20s",
        details: "Generated a 1,200-word blog post about beach activities, including family-friendly options, water sports, and relaxation ideas."
      },
      {
        id: "3",
        name: "Downtown Loft Listing Rewrite",
        status: "failed",
        timestamp: "2025-03-22T09:45:00Z",
        duration: "30s",
        details: "Error: Insufficient information about property amenities. Please provide more details about the loft features and then retry."
      },
      {
        id: "4",
        name: "March 2025 Review Summary",
        status: "running",
        timestamp: "2025-03-22T12:05:00Z"
      },
      {
        id: "5",
        name: "Lakeside Retreat Listing Rewrite",
        status: "completed",
        timestamp: "2025-03-21T15:30:00Z",
        duration: "38s"
      },
      {
        id: "6",
        name: "Winter Getaway Ideas - Blog Post",
        status: "completed",
        timestamp: "2025-03-21T14:15:00Z",
        duration: "1m 05s"
      },
      {
        id: "7",
        name: "February 2025 Owner Report",
        status: "completed",
        timestamp: "2025-03-21T11:30:00Z",
        duration: "2m 15s"
      }
    ],
  },
  
  // Chat configuration
  chat: {
    welcomeMessage: `# Welcome to STR COPILOT! 👋

I'm your AI assistant for short-term rental management. I can help with:

- Answering questions about property management
- Providing guidance on guest communication
- Explaining maintenance procedures
- And much more!

Just ask me anything related to your property management needs.`,
    brandName: "STR",
    docTrainingNotice: "Our AI has been trained on your documentation to provide relevant answers. Upload more documents in the Documents section to improve responses.",
  },
};

export default config;