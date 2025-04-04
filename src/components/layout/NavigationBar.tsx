'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import config from '@/lib/config';
import ThemeToggle from './ThemeToggle';

export default function NavigationBar() {
  // Get current pathname to determine page title
  const pathname = usePathname();
  
  // Generate page title based on current path
  const getPageTitle = () => {
    switch (true) {
      case pathname === '/' || pathname === '/chat':
        return 'Your Assistant';
      case pathname.startsWith('/agents'):
        return 'AI Agents';
      case pathname.startsWith('/documents'):
        return 'Documents';
      case pathname.startsWith('/contact'):
        return 'Contact';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-card/90 backdrop-blur-sm border-b border-border py-3.5 px-6 flex justify-between items-center shadow-md sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>
      <div className="flex items-center space-x-5">
        {/* Theme Toggle (placeholder for now) */}
        <ThemeToggle />
        
        {/* Settings button with gold accent */}
        <button className="text-muted hover:text-secondary p-2 rounded-lg hover:bg-border/80 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        
        {/* User avatar with gradient */}
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-medium shadow-md ring-1 ring-border/30">
          U
        </div>
      </div>
    </header>
  );
}