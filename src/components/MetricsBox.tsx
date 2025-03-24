'use client';

import { ReactNode } from 'react';

interface MetricsBoxProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  suffix?: string;
  description?: string;
  isLoading?: boolean;
}

export default function MetricsBox({
  title,
  value,
  change,
  icon,
  suffix = '',
  description,
  isLoading = false
}: MetricsBoxProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e9ecef] p-5 transition-all hover:shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="animate-pulse h-8 w-24 bg-gray-200 rounded mb-2"></div>
      ) : (
        <div className="flex items-baseline mb-1">
          <p className="text-2xl font-bold text-gray-800">
            {value}
            {suffix && <span className="text-lg ml-1 text-gray-500">{suffix}</span>}
          </p>
          
          {change && (
            <span className={`ml-2 text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value}
            </span>
          )}
        </div>
      )}
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}