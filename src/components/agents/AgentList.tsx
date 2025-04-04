'use client';

import { useState } from 'react';
import AgentTriggerButton from './AgentTriggerButton';
import config from '@/lib/config';

// Define the agent icons
const AGENT_ICONS: Record<string, JSX.Element> = {
  'listing-rewrite': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
    </svg>
  ),
  'review-insights': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  ),
  'owner-report': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
    </svg>
  ),
  'price-optimize': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a3.833 3.833 0 0 0 1.719-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.833 3.833 0 0 0-1.718-.756V8.334c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
    </svg>
  ),
  'maintenance-plan': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
    </svg>
  ),
  'guest-comms': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
    </svg>
  ),
};

// Map agents from config with icons
const agents = config.agents.list.map(agent => ({
  ...agent,
  icon: AGENT_ICONS[agent.slug]
}));

export default function AgentList() {
  const [propertyId, setPropertyId] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (data: any) => {
    setResult(data);
    setError(null);
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setResult(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 bg-gradient-to-b from-[#fdfaf6] to-[#f2ede7] py-8 rounded-xl">
      {/* Property selector dropdown and notes */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="propertyId" className="block text-sm font-medium text-neutral-700 mb-2">
            Select Property
          </label>
          <select
            id="propertyId"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-primary focus:border-primary"
          >
            <option value="">Select a property</option>
            {config.agents.properties.map(property => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-2">
            Additional Instructions
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-primary focus:border-primary resize-none"
            placeholder="Add any specific instructions or details..."
            rows={2}
          />
        </div>
      </div>
      
      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {agents.map((agent) => (
          <div 
            key={agent.slug}
            className={`relative rounded-xl shadow-md transition-all overflow-hidden bg-white ${
              selectedAgent === agent.slug 
                ? 'ring-2 ring-primary border-transparent'
                : 'border-t-4 border-t-primary border hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.01]'
            }`}
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setSelectedAgent(agent.slug === selectedAgent ? null : agent.slug)}
            >
              {/* Icon circle */}
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white mb-3 shadow-sm">
                {agent.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-neutral-800">{agent.name}</h3>
              <p className="text-neutral-600 mb-5 text-sm leading-relaxed line-clamp-2">{agent.description}</p>
              
              <div className="flex justify-between items-center">
                <AgentTriggerButton
                  agentName={agent.name}
                  agentSlug={agent.slug}
                  description={agent.description}
                  propertyId={propertyId}
                  additionalNotes={notes}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                    !propertyId 
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm'
                  }`}
                  disabled={!propertyId}
                />
                
                <div className="text-sm text-neutral-500">
                  {selectedAgent === agent.slug && (
                    <span className="flex items-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create New Agent CTA Card */}
        <div className="border-2 border-dashed border-muted rounded-xl p-6 hover:bg-neutral-50 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col items-center justify-center text-center h-[300px]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-neutral-100 text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">Create New Agent</h3>
          <p className="text-base text-muted-foreground mb-4">Build a custom agent for your specific needs</p>
          <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors font-medium shadow-sm dark:bg-white dark:text-black dark:hover:bg-white/90">
            View Agent
          </button>
        </div>
      </div>
      
      {/* Results Display */}
      {result && (
        <div className="mt-8 bg-white border border-neutral-200 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary">Agent Result</h3>
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-red-800">Error</h3>
          <p className="text-red-700 leading-relaxed">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 text-sm font-medium px-4 py-2 bg-white text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}