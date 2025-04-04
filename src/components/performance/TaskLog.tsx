'use client';

import { useState } from 'react';

type TaskStatus = 'completed' | 'failed' | 'running';

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  timestamp: string;
  duration?: string;
  details?: string;
}

interface TaskLogProps {
  tasks: Task[];
  maxVisible?: number;
}

export default function TaskLog({ tasks, maxVisible = 5 }: TaskLogProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const visibleTasks = showAll ? tasks : tasks.slice(0, maxVisible);
  const hasMore = tasks.length > maxVisible;

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-[#e9ecef] dark:border-border p-6 shadow-sm dark:shadow-md">
      <h3 className="text-lg font-bold text-gray-800 dark:text-foreground mb-4">Task Execution Log</h3>
      
      <div className="space-y-3">
        {visibleTasks.map((task) => (
          <div key={task.id} className="border border-gray-200 dark:border-border rounded-xl overflow-hidden">
            <div 
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-border/30"
              onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
            >
              <div className="flex items-center">
                <span className={`inline-flex text-xs font-medium rounded-full px-2.5 py-0.5 mr-3 ${
                  task.status === 'completed' 
                    ? 'bg-[#4CAF50] text-white dark:bg-[#4CAF50]/40 dark:text-white'
                    : task.status === 'failed' 
                      ? 'bg-[#D84315] text-white dark:bg-[#D84315]/40 dark:text-white'
                      : 'bg-yellow-500 text-white dark:bg-yellow-500/40 dark:text-white'
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <span className="font-medium text-gray-900 dark:text-foreground">{task.name}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-foreground/70 space-x-4">
                {task.duration && <span>{task.duration}</span>}
                <span>{new Date(task.timestamp).toLocaleString()}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedTaskId === task.id ? 'transform rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {expandedTaskId === task.id && task.details && (
              <div className="p-4 bg-gray-50 dark:bg-border/30 border-t border-gray-200 dark:border-border">
                <pre className="text-sm text-gray-700 dark:text-foreground/90 whitespace-pre-wrap">{task.details}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:text-primary/80 dark:text-secondary dark:hover:text-secondary/80 text-sm font-medium"
          >
            {showAll ? 'Show Less' : `Show All (${tasks.length})`}
          </button>
        </div>
      )}
    </div>
  );
}