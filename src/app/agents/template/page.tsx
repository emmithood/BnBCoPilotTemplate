'use client';

import { useState } from 'react';
import Link from 'next/link';
import MetricsGrid from '@/components/MetricsGrid';
import PerformanceReview from '@/components/PerformanceReview';
import WorkSummary from '@/components/WorkSummary';
import PendingReviewTable from '@/components/PendingReviewTable';
import TaskLog from '@/components/TaskLog';
import PageTitleBar from '@/components/PageTitleBar';
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
    <>
      <PageTitleBar title="Template Agent" showBreadcrumbs={true} />
      
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            href="/agents"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
              <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
            </svg>
            <span>Back to Agents</span>
          </Link>
        </div>
        
        {/* Last 30 days heading */}
        <div className="mb-6">
          <div className="inline-block bg-neutral-100 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700">
            <span className="mr-2">📊</span>
            Last 30 days
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="mb-10">
          <MetricsGrid 
            tasksCompleted={metricsData.tasksCompleted}
            timeSaved={metricsData.timeSaved}
            accuracy={metricsData.accuracy}
          />
        </div>
        
        {/* Performance Review & Work Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <PerformanceReview 
            value={metricsData.timeSaved.value} 
            metric="hours saved" 
            change={metricsData.timeSaved.change}
            description="Time saved compared to manual processing of the same tasks."
          />
          
          <div className="border-l-4 border-primary pl-4">
            <WorkSummary 
              summary={workSummary} 
              onRegenerate={handleRegenerateSummary}
            />
          </div>
        </div>
        
        {/* Pending Review Table */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Pending Items</h3>
          <PendingReviewTable 
            items={pendingItems}
            onApprove={handleApprove}
            onReject={handleReject}
            onPreview={handlePreview}
          />
        </div>
        
        {/* Task Log */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Task History</h3>
          <TaskLog tasks={taskLog} />
        </div>
      </div>
    </>
  );
}