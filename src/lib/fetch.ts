'use client';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
};

// Determine if we're running on localhost
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * Enhanced fetch function that uses MCP fetch when on localhost
 */
export async function enhancedFetch(url: string, options: FetchOptions = {}) {
  // Clone the options to avoid modifying the original
  const fetchOptions = { ...options };
  
  // Ensure we have headers
  fetchOptions.headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Stringify the body if it's an object
  if (fetchOptions.body && typeof fetchOptions.body === 'object') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }
  
  try {
    // If on localhost and window.mcp exists, use MCP fetch
    if (isLocalhost && typeof window !== 'undefined' && 'mcp' in window) {
      // @ts-ignore - MCP tools are injected at runtime
      return await window.mcp.fetch(url, fetchOptions);
    }
    
    // Otherwise use regular fetch
    const response = await fetch(url, fetchOptions as RequestInit);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error('Enhanced fetch error:', error);
    throw error;
  }
}