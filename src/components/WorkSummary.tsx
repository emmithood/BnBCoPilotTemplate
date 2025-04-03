'use client';

interface WorkSummaryProps {
  summary: string;
  dateRange?: string;
  onRegenerate?: () => void; 
}

export default function WorkSummary({ summary, dateRange = 'Last 30 days', onRegenerate }: WorkSummaryProps) {  
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral-800">Work Summary</h3>
        
        {onRegenerate && (
          <button 
            onClick={onRegenerate}
            className="text-primary bg-primary/10 hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-all duration-200 group shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
              className="w-4 h-4 mr-1.5 group-hover:animate-spin"
            >
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
            </svg>
            Regenerate
          </button>
        )}
      </div>
      
      <div className="p-5 bg-neutral-50 rounded-xl text-neutral-700 border border-neutral-200">
        <p className="whitespace-pre-line leading-relaxed">{summary}</p>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground flex justify-between">
        <span>{dateRange}</span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-primary/70">
            <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
          </svg>
          AI-generated summary
        </span>
      </div>
    </div>
  );
}