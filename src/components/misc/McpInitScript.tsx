'use client';

import Script from 'next/script';

export default function McpInitScript() {
  return (
    <Script id="mcp-init" strategy="afterInteractive">
      {`
        // Check if we're in development mode
        if (typeof window !== 'undefined' && !window.mcp) {
          console.log('MCP not detected, using fallback fetch');
          window.mcp = {
            fetch: async (url, options) => {
              try {
                const response = await fetch(url, options);
                if (!response.ok) {
                  throw new Error(\`Fetch error: \${response.status} \${response.statusText}\`);
                }
                return await response.json();
              } catch (error) {
                console.error('MCP fallback fetch error:', error);
                throw error;
              }
            }
          };
        }
      `}
    </Script>
  );
}