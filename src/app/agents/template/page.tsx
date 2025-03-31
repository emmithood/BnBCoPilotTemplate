'use client';

import { useState } from 'react';
import Link from 'next/link';
import MetricsGrid from '@/components/MetricsGrid';
import PerformanceReview from '@/components/PerformanceReview';
import WorkSummary from '@/components/WorkSummary';
import PendingReviewTable from '@/components/PendingReviewTable';
import TaskLog from '@/components/TaskLog';
import config from '@/lib/config';

export default function TemplateAgentPage() {
  // Use metrics data from config
  const metricsData = config.metrics;

  // Use template agent data from config
  const { workSummary, pendingItems, taskLog } = config.templateAgent;

  // Mock handlers for pending review actions
  const handleApprove = (id: string) => {
    console.log(`Approved item: ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejected item: ${id}`);
  };

  const handlePreview = (id: string) => {
    console.log(`Preview item: ${id}`);
  };

  const handleRegenerateSummary = () => {
    console.log('Regenerating summary...');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Link 
          href="/agents"
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
          </svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-primary">Template Agent</h2>
          <p className="text-gray-600">Agent performance and task management</p>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="mb-8">
        <MetricsGrid 
          tasksCompleted={metricsData.tasksCompleted}
          timeSaved={metricsData.timeSaved}
          accuracy={metricsData.accuracy}
        />
      </div>
      
      {/* Performance Review & Work Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PerformanceReview 
          value={metricsData.timeSaved.value} 
          metric="hours saved" 
          change={metricsData.timeSaved.change}
          description="Time saved compared to manual processing of the same tasks."
        />
        
        <WorkSummary 
          summary={workSummary} 
          onRegenerate={handleRegenerateSummary}
        />
      </div>
      
      {/* Pending Review Table */}
      <div className="mb-8">
        <PendingReviewTable 
          items={pendingItems}
          onApprove={handleApprove}
          onReject={handleReject}
          onPreview={handlePreview}
        />
      </div>
      
      {/* Task Log */}
      <div className="mb-8">
        <TaskLog tasks={taskLog} />
      </div>
    </div>
  );
}