'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
      <div className="flex h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <NavigationBar />
          
          {/* Main content area */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
      
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