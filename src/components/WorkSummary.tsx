'use client';

interface WorkSummaryProps {
  summary: string;
  dateRange?: string;
  onRegenerate?: () => void; 
}

export default function WorkSummary({ summary, dateRange = 'Last 30 days', onRegenerate }: WorkSummaryProps) {  
  return (
    <div className="bg-white rounded-2xl border border-[#e9ecef] p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Work Summary</h3>
        
        {onRegenerate && (
          <button 
            onClick={onRegenerate}
            className="text-primary hover:text-accent text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
            </svg>
            Regenerate
          </button>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-xl text-gray-700">
        <p className="whitespace-pre-line">{summary}</p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span>{dateRange}</span>
        <span>AI-generated summary</span>
      </div>
    </div>
  );
}