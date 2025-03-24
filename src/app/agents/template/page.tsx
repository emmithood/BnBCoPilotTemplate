'use client';

import { useState } from 'react';
import Link from 'next/link';
import MetricsGrid from '@/components/MetricsGrid';
import PerformanceReview from '@/components/PerformanceReview';
import WorkSummary from '@/components/WorkSummary';
import PendingReviewTable from '@/components/PendingReviewTable';
import TaskLog from '@/components/TaskLog';

export default function TemplateAgentPage() {
  // Example data for the agent dashboard
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

  const workSummary = `The Template Agent has been highly productive over the past 30 days, completing 247 tasks with a 95.3% accuracy rate, which is a 2.1% improvement from the previous period.

Key activities include:
• Rewriting 45 property listings with improved SEO, resulting in better search visibility
• Generating 32 blog posts about vacation rental tips and local attractions
• Summarizing 170 guest reviews to identify common themes and areas for improvement

The agent has saved approximately 38 hours of manual work, freeing up staff to focus on higher-value activities. The most significant improvement has been in the quality of SEO-optimized listings, which now include more detailed descriptions of amenities and better location highlights.`;

  // Example pending review items
  const pendingItems = [
    {
      id: '1',
      title: 'Beachfront Villa Listing Rewrite',
      type: 'Listing',
      createdAt: '2025-03-22T10:30:00Z',
      status: 'pending' as const
    },
    {
      id: '2',
      title: '5 Things to Do in Miami - Blog Post',
      type: 'Blog Post',
      createdAt: '2025-03-22T09:15:00Z',
      status: 'pending' as const
    },
    {
      id: '3',
      title: 'February 2025 Guest Review Summary',
      type: 'Review Summary',
      createdAt: '2025-03-21T16:45:00Z',
      status: 'pending' as const
    }
  ];

  // Example task log
  const taskLog = [
    {
      id: '1',
      name: 'Mountain Cabin Listing Rewrite',
      status: 'completed' as const,
      timestamp: '2025-03-22T11:30:00Z',
      duration: '45s',
      details: 'Successfully rewrote the Mountain Cabin listing with enhanced SEO keywords, added more detailed amenity descriptions, and highlighted nearby attractions.'
    },
    {
      id: '2',
      name: 'Top 10 Beach Activities - Blog Post',
      status: 'completed' as const,
      timestamp: '2025-03-22T10:15:00Z',
      duration: '1m 20s',
      details: 'Generated a 1,200-word blog post about beach activities, including family-friendly options, water sports, and relaxation ideas.'
    },
    {
      id: '3',
      name: 'Downtown Loft Listing Rewrite',
      status: 'failed' as const,
      timestamp: '2025-03-22T09:45:00Z',
      duration: '30s',
      details: 'Error: Insufficient information about property amenities. Please provide more details about the loft features and then retry.'
    },
    {
      id: '4',
      name: 'March 2025 Review Summary',
      status: 'running' as const,
      timestamp: '2025-03-22T12:05:00Z'
    },
    {
      id: '5',
      name: 'Lakeside Retreat Listing Rewrite',
      status: 'completed' as const,
      timestamp: '2025-03-21T15:30:00Z',
      duration: '38s'
    },
    {
      id: '6',
      name: 'Winter Getaway Ideas - Blog Post',
      status: 'completed' as const,
      timestamp: '2025-03-21T14:15:00Z',
      duration: '1m 05s'
    },
    {
      id: '7',
      name: 'February 2025 Owner Report',
      status: 'completed' as const,
      timestamp: '2025-03-21T11:30:00Z',
      duration: '2m 15s'
    }
  ];

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
          value={38} 
          metric="hours saved" 
          change={{ value: "8%", isPositive: true }}
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