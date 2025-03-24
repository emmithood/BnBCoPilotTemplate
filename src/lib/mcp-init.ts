// This file provides TypeScript types for the MCP fetch tool
// It will be loaded only on the client side

// Define the MCP interface in the window object
interface MCPTools {
  fetch: (url: string, options?: RequestInit) => Promise<any>;
}

// Extend the Window interface
declare global {
  interface Window {
    mcp?: MCPTools;
  }
}

// Initialize MCP for development
export function initMCP() {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  // Check if we're in development mode
  const isDevelopment = process.env.IS_DEVELOPMENT === 'true';
  
  if (isDevelopment) {
    console.log('MCP development mode initialized');
    
    // Additional MCP setup can go here if needed
  }
}

// Export a dummy function for production
export default function mcpInit() {
  // This function is a no-op in production
  return null;
}