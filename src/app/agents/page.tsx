'use client';

import AgentCard from '@/components/AgentCard';
import MetricsGrid from '@/components/MetricsGrid';
import PageTitleBar from '@/components/PageTitleBar';
import config from '@/lib/config';

export default function AgentsPage() {
  // Get template agent data from config
  const templateAgent = config.agents.templates[0];
  
  // Add the icon to the template agent
  const templateAgentWithIcon = {
    ...templateAgent,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
      </svg>
    )
  };

  // Use metrics data from config
  const metricsData = config.metrics;

  return (
    <>
      <PageTitleBar title="AI Agents" />
      
      <div className="max-w-screen-lg mx-auto px-6 py-8">        
        {/* Metrics Grid */}
        <div className="mb-10">
          <MetricsGrid 
            tasksCompleted={metricsData.tasksCompleted}
            timeSaved={metricsData.timeSaved}
            accuracy={metricsData.accuracy}
          />
        </div>
        
        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-primary pl-4">
            <AgentCard {...templateAgentWithIcon} />
          </div>
          
          {/* Add New Agent Card */}
          <div className="border-2 border-dashed border-muted rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-neutral-50 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">Create New Agent</h3>
            <p className="text-base text-muted-foreground mb-4">Build a custom AI agent tailored to your needs</p>
            <p className="text-xs text-neutral-500 mt-2">Launch a new AI-powered workflow tailored to your property needs</p>
          </div>
        </div>
      </div>
    </>
  );
}