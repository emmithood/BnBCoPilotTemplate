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
    <div className="bg-white rounded-2xl border border-[#e9ecef] p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Performance Review</h3>
      
      <div className="flex items-center space-x-3">
        <span className="text-4xl font-bold text-primary">{value}</span>
        <span className="text-2xl font-medium text-gray-600">{metric}</span>
        
        {change && (
          <span 
            className={`ml-4 text-sm font-medium rounded-full px-3 py-1 ${change.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {change.isPositive ? '↑' : '↓'} {change.value}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-500 mt-2">{period}</p>
      
      {description && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
}