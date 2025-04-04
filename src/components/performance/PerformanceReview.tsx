'use client';

export interface PerformanceReviewProps {
  value: number;
  metric: string;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  period?: string;
  description?: string;
}

export default function PerformanceReview({ value, metric, change, period = 'Last 30 days', description }: PerformanceReviewProps) {
  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-[#e9ecef] dark:border-border p-6 shadow-sm dark:shadow-md">
      <h3 className="text-lg font-bold text-gray-800 dark:text-foreground mb-2">Performance Review</h3>
      
      <div className="flex items-center space-x-3">
        <span className="text-4xl font-bold text-primary dark:text-primary">{value}</span>
        <span className="text-2xl font-medium text-gray-600 dark:text-foreground/80">{metric}</span>
        
        {change && (
          <span 
            className={`ml-4 text-sm font-medium rounded-full px-3 py-1 ${
              change.isPositive 
                ? 'bg-[#4CAF50] text-white dark:bg-[#4CAF50]/40 dark:text-white' 
                : 'bg-[#D84315] text-white dark:bg-[#D84315]/40 dark:text-white'
            }`}
          >
            {change.isPositive ? '↑' : '↓'} {change.value}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-foreground/60 mt-2">{period}</p>
      
      {description && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-border/50">
          <p className="text-gray-600 dark:text-foreground/80">{description}</p>
        </div>
      )}
    </div>
  );
}