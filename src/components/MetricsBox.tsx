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
    <div className="rounded-lg p-5 transition-all bg-white border border-neutral-200 shadow-md dark:bg-card dark:border-border dark:shadow-md dark:text-foreground hover:scale-[1.01] dark:hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-muted-foreground dark:text-foreground/90">{title}</h3>
          <div className="ml-1.5 text-neutral-400 hover:text-secondary cursor-help transition-colors dark:text-foreground/60 dark:hover:text-secondary" title={`Information about ${title}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {icon && (
          <div className="text-secondary p-2 bg-neutral-100 rounded-lg border border-neutral-200/50 shadow-sm dark:bg-border dark:border-border dark:text-secondary">
            {icon}
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="animate-pulse h-10 w-28 bg-neutral-200 rounded mb-2 dark:bg-border dark:animate-pulse dark:bg-secondary/30"></div>
      ) : (
        <div className="flex items-baseline mb-2">
          <p className="text-3xl font-semibold text-primary dark:text-primary">
            {value}
            {suffix && <span className="text-xl ml-1 text-neutral-500 dark:text-foreground/70">{suffix}</span>}
          </p>
          
          {change && (
            <span className={`ml-3 text-sm font-medium px-2 py-1 rounded-md ${
              change.isPositive 
                ? 'text-primary bg-primary/10 dark:bg-primary/20' 
                : 'text-destructive bg-destructive/10 dark:bg-destructive/20'
            }`}>
              {change.isPositive ? '↑' : '↓'} {change.value}
            </span>
          )}
        </div>
      )}
      
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed dark:text-foreground/70">{description}</p>
      )}
    </div>
  );
}