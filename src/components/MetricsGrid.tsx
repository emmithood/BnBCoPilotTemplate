'use client';

import MetricsBox from '@/components/MetricsBox';

interface MetricData {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  suffix?: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MetricsGridProps {
  tasksCompleted: MetricData;
  timeSaved: MetricData;
  accuracy: MetricData;
  fourthMetric?: MetricData;
}

export default function MetricsGrid({ 
  tasksCompleted, 
  timeSaved, 
  accuracy,
  fourthMetric
}: MetricsGridProps) {
  // Default icons if not provided
  const defaultIcons = {
    tasksCompleted: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
    timeSaved: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
      </svg>
    ),
    accuracy: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricsBox 
        title={tasksCompleted.title}
        value={tasksCompleted.value}
        change={tasksCompleted.change}
        icon={tasksCompleted.icon || defaultIcons.tasksCompleted}
        description={tasksCompleted.description}
      />
      
      <MetricsBox 
        title={timeSaved.title}
        value={timeSaved.value}
        suffix={timeSaved.suffix}
        change={timeSaved.change}
        icon={timeSaved.icon || defaultIcons.timeSaved}
        description={timeSaved.description}
      />
      
      <MetricsBox 
        title={accuracy.title}
        value={accuracy.value}
        change={accuracy.change}
        icon={accuracy.icon || defaultIcons.accuracy}
        description={accuracy.description}
      />
      
      {fourthMetric && (
        <MetricsBox 
          title={fourthMetric.title}
          value={fourthMetric.value}
          suffix={fourthMetric.suffix}
          change={fourthMetric.change}
          icon={fourthMetric.icon}
          description={fourthMetric.description}
        />
      )}
    </div>
  );
}