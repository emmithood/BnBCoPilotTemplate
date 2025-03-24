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
    <div className="bg-white rounded-xl shadow border border-[#e9ecef] p-6 hover:ring-2 hover:ring-primary/20 transition-all">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          
          {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Agent Tasks:</p>
            <ul className="space-y-1 pl-5 list-disc text-sm text-gray-600">
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          
          <Link 
            href={`/agents/${slug}`}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors text-sm font-medium"
          >
            View Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}