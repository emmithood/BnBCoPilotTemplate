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
    <div className="glass backdrop-blur-md bg-card/70 rounded-2xl border border-[rgba(177,157,131,0.3)] p-5 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-card-foreground/70">{title}</h3>
        {icon && <div className="text-primary p-2 bg-secondary/50 rounded-full">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="animate-pulse h-8 w-24 bg-secondary/50 rounded mb-2"></div>
      ) : (
        <div className="flex items-baseline mb-1">
          <p className="text-2xl font-bold text-card-foreground">
            {value}
            {suffix && <span className="text-lg ml-1 text-card-foreground/70">{suffix}</span>}
          </p>
          
          {change && (
            <span className={`ml-2 text-sm font-medium ${change.isPositive ? 'text-accent' : 'text-destructive'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value}
            </span>
          )}
        </div>
      )}
      
      {description && (
        <p className="text-xs text-card-foreground/60">{description}</p>
      )}
    </div>
  );
}