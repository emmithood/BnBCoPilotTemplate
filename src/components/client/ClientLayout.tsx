'use client';

import { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import Script from 'next/script';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Initialize MCP when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mcp) {
      console.log('MCP not detected, using fallback fetch');
      window.mcp = {
        fetch: async (url: string, options: any) => {
          try {
            const response = await fetch(url, options);
            if (!response.ok) {
              throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
          } catch (error) {
            console.error('MCP fallback fetch error:', error);
            throw error;
          }
        }
      };
    }
  }, []);

  return (
    <>
      <NavigationBar />
      {children}
      
      {/* This Script is a fallback in case the useEffect doesn't run */}
      <Script id="mcp-init" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined' && !window.mcp) {
            console.log('MCP not detected (Script fallback), using fallback fetch');
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
    </>
  );
}