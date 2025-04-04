'use client';

import Link from 'next/link';

interface AgentCardProps {
  title: string;
  slug: string;
  tasks: string[];
  icon?: React.ReactNode;
  description?: string;
}

export default function AgentCard({ title, slug, tasks, icon, description }: AgentCardProps) {
  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.01] p-6 border-t-4 border-primary bg-white/90 backdrop-blur-xs hover:bg-white/95 border border-neutral-200/40 dark:bg-card dark:border-border dark:border-t-4 dark:border-t-primary dark:hover:shadow-lg">
      <div className="flex items-start gap-5">
        {icon && (
          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-md dark:shadow-md">
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary mb-2.5 dark:text-primary">{title}</h3>
          
          {description && <p className="text-neutral-600 mb-3.5 text-sm leading-relaxed line-clamp-2 dark:text-foreground/70">{description}</p>}
          
          <div className="mb-5 bg-neutral-50 rounded-lg p-4 border border-neutral-200/60 shadow-sm dark:bg-border/50 dark:border-border dark:border-primary/20">
            <p className="text-sm font-medium text-primary mb-2.5 flex items-center dark:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-secondary dark:text-secondary">
                <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
              </svg>
              Agent Tasks:
            </p>
            <ul className="space-y-1.5 pl-5 list-disc text-sm text-muted-foreground leading-relaxed dark:text-foreground/80">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="inline-block mt-1 text-primary dark:text-primary">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
            <Link 
              href={`/agents/${slug}`}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-primary/90 transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:focus:ring-primary/70 dark:focus:ring-offset-dark group inline-flex items-center"
            >
              View Agent
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}