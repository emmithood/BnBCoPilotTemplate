'use client';

import { useState } from 'react';
import { enhancedFetch } from '@/lib/fetch';

type AgentTriggerButtonProps = {
  agentName: string;
  agentSlug: string;
  description: string;
  propertyId: string;
  additionalNotes?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
};

export default function AgentTriggerButton({
  agentName,
  agentSlug,
  description,
  propertyId,
  additionalNotes = '',
  onSuccess,
  onError,
  className = '',
  disabled = false,
}: AgentTriggerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading || disabled || !propertyId) return;
    
    try {
      setIsLoading(true);
      
      // Create payload for the agent
      const payload = {
        property_id: propertyId,
        additional_notes: additionalNotes,
        agent: agentSlug,
      };
      
      // Use our enhanced fetch to make the API call
      // This will automatically use MCP fetch when on localhost
      const result = await enhancedFetch(`/api/agent/${agentSlug}`, {
        method: 'POST',
        body: payload,
      });
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error(`Error triggering agent ${agentSlug}:`, error);
      
      // Call the error callback if provided
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled || !propertyId}
      className={`font-medium inline-flex items-center justify-center transition-all ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Running...
        </>
      ) : (
        <>Run Agent</>
      )}
    </button>
  );
}