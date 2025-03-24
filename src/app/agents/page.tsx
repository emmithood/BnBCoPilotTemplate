'use client';

import AgentCard from '@/components/AgentCard';
import MetricsGrid from '@/components/MetricsGrid';

export default function AgentsPage() {
  // Template agent data
  const templateAgent = {
    title: "Template Agent",
    slug: "template",
    description: "A versatile AI agent for property management tasks",
    tasks: [
      "Rewrite listings using SEO",
      "Generate blog posts",
      "Summarize guest reviews"
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
      </svg>
    )
  };

  // Example metrics data
  const metricsData = {
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
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">AI Agents</h2>
        <button className="bg-primary hover:bg-accent text-white font-medium py-2 px-4 rounded-xl transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create New Agent
        </button>
      </div>
      
      {/* Metrics Grid */}
      <div className="mb-8">
        <MetricsGrid 
          tasksCompleted={metricsData.tasksCompleted}
          timeSaved={metricsData.timeSaved}
          accuracy={metricsData.accuracy}
        />
      </div>
      
      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AgentCard {...templateAgent} />
        
        {/* Add New Agent Card */}
        <div className="bg-white rounded-xl shadow border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">Create New Agent</h3>
          <p className="text-gray-500 text-sm mb-4">Build a custom AI agent tailored to your needs</p>
        </div>
      </div>
    </div>
  );
}