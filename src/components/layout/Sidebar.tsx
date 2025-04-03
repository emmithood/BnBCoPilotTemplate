'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import config from '@/lib/config';

// Icons
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const AgentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
    <path d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    <path d="M16 14c0 2.2-1.8 4-4 4s-4-1.8-4-4" />
  </svg>
);

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Chevron Right Icon
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// Chevron Left Icon
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

// Map navigation items with icons
const iconMap: Record<string, JSX.Element> = {
  '/chat': <ChatIcon />,
  '/agents': <AgentIcon />,
  '/documents': <DocIcon />,
  '/contact': <ContactIcon />,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Default to /chat if on home page
  const activePath = pathname === '/' ? '/chat' : pathname;
  
  // Toggle sidebar expansion and dispatch custom event
  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarExpanded', newState.toString());
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
        detail: { expanded: newState } 
      }));
    }
  };
  
  // Force expanded state by default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarExpanded');
      if (savedState === null) {
        // If no state is saved yet, set to expanded and save
        setIsExpanded(true);
        localStorage.setItem('sidebarExpanded', 'true');
      }
    }
  }, []);

  // On initial mount, check if there's a saved preference for sidebar state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarExpanded');
      if (savedState !== null) {
        const expanded = savedState === 'true';
        setIsExpanded(expanded);
      }
    }
  }, []);
  
  return (
    <>
      {/* Main Sidebar */}
      <aside 
        id="sidebar"
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-card border-r border-neutral-200 dark:border-border
                   transition-all duration-300 ease-in-out z-40
                   ${isExpanded ? 'w-64 shadow-md' : 'w-12 shadow-sm'}`}
        aria-expanded={isExpanded}
      >
        {/* Header section with logo and collapse button */}
        <div className="flex items-center justify-between h-16 border-b border-neutral-200 dark:border-border bg-gradient-to-r from-primary/10 to-transparent">
          {isExpanded ? (
            <div className="flex items-center px-5">
              <Link 
                href="/" 
                className="text-xl font-bold text-neutral-800 dark:text-foreground hover:text-primary/80 transition-colors flex items-center"
              >
                <span className="bg-gradient-to-br from-primary to-primary/90 text-white h-8 w-8 mr-3 rounded-lg flex items-center justify-center shadow-sm">
                  {config.appName.charAt(0)}
                </span>
                <span className="truncate">{config.appName}</span>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center w-full py-4">
              <Link 
                href="/" 
                className="text-xl font-bold text-neutral-800 dark:text-foreground hover:text-primary/80 transition-colors"
              >
                <span className="bg-gradient-to-br from-primary to-primary/90 text-white h-8 w-8 rounded-lg flex items-center justify-center shadow-sm">
                  {config.appName.charAt(0)}
                </span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="px-3 py-4 overflow-y-auto h-[calc(100vh-9rem)]">
          <ul className="space-y-2">
            {config.navigation.items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center ${isExpanded ? 'px-3.5 py-3' : 'p-3 justify-center'} rounded-lg transition-all duration-200 ${
                    activePath.startsWith(item.path)
                      ? 'bg-primary/20 text-neutral-800 dark:text-foreground font-medium shadow-sm border border-primary/30' 
                      : 'text-neutral-600 dark:text-foreground/70 hover:bg-neutral-100 dark:hover:bg-border/50 hover:shadow-sm hover:text-primary'
                  }`}
                  title={item.name}
                >
                  <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg ${
                    activePath.startsWith(item.path) 
                      ? 'text-primary' 
                      : 'text-neutral-500 dark:text-foreground/70'
                  }`}>
                    {iconMap[item.path]}
                  </div>
                  {isExpanded && <span className="ml-3 font-medium truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer section with version */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-neutral-200 dark:border-border bg-neutral-50 dark:bg-border/30 flex items-center px-5">
            <div className="flex items-center text-sm text-neutral-600 dark:text-foreground/80">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
              <span className="font-medium">v{config.appVersion}</span>
            </div>
          </div>
        )}
      </aside>
      
      {/* Sidebar Toggle Button (fixed in middle of screen) */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out
                  bg-white dark:bg-card p-2.5 rounded-full shadow-lg border border-neutral-200 dark:border-border
                  hover:shadow-xl hover:bg-neutral-50 dark:hover:bg-border/50
                  text-primary dark:text-primary/90 ${isExpanded ? 'left-60' : 'left-8'}`}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
      
      {/* Sidebar handle - always visible when collapsed */}
      {!isExpanded && (
        <div className="fixed top-0 left-0 h-screen w-2 bg-primary/10 dark:bg-primary/5 z-30"></div>
      )}
    </>
  );
}