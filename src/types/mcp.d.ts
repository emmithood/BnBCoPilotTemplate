// This file provides TypeScript types for the MCP fetch tool

// Define the MCP interface that will be added to the window object
interface MCPTools {
  fetch: (url: string, options?: RequestInit) => Promise<any>;
}

// Extend the Window interface
interface Window {
  mcp?: MCPTools;
}