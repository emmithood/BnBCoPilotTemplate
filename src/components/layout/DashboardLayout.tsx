'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Sidebar from './Sidebar';
import NavigationBar from './NavigationBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // Initialize MCP when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set up MCP fallback
      if (!window.mcp) {
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
      
      // Get sidebar state from localStorage
      const savedState = localStorage.getItem('sidebarExpanded');
      if (savedState !== null) {
        setSidebarExpanded(savedState === 'true');
      }
      
      // Listen for changes to sidebar state
      const handleStorageChange = () => {
        const currentState = localStorage.getItem('sidebarExpanded');
        if (currentState !== null) {
          setSidebarExpanded(currentState === 'true');
        }
      };
      
      // Listen for the custom event from sidebar
      const handleSidebarEvent = (e: any) => {
        if (e.detail && e.detail.expanded !== undefined) {
          setSidebarExpanded(e.detail.expanded);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('sidebarStateChange', handleSidebarEvent);
      
      // Use an interval as backup to check for state changes
      const interval = setInterval(handleStorageChange, 300);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('sidebarStateChange', handleSidebarEvent);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar component */}
      <Sidebar />
      
      {/* Main content wrapper with dynamic width and position */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
                   ${sidebarExpanded ? 'ml-64' : 'ml-12'}`}
        style={{width: `calc(100% - ${sidebarExpanded ? '16rem' : '3rem'})`}}
      >
        {/* Header */}
        <NavigationBar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-white dark:bg-background">
          {children}
        </main>
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
    </div>
  );
}