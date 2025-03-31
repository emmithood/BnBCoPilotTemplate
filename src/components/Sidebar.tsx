'use client';

import Link from 'next/link';
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

// Map navigation items with icons
const iconMap: Record<string, JSX.Element> = {
  '/chat': <ChatIcon />,
  '/agents': <AgentIcon />,
  '/documents': <DocIcon />,
  '/contact': <ContactIcon />,
};

export default function Sidebar() {
  const pathname = usePathname();
  
  // Default to /chat if on home page
  const activePath = pathname === '/' ? '/chat' : pathname;
  
  return (
    <aside className="w-64 bg-white border-r border-[#e9ecef] flex flex-col">
      <div className="p-4 border-b border-[#e9ecef]">
        <Link 
          href="/" 
          className="text-lg font-bold text-primary hover:text-accent transition-colors"
        >
          {config.appName}
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {config.navigation.items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center w-full p-3 rounded-xl transition-colors ${
                  activePath.startsWith(item.path)
                    ? 'bg-secondary text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {iconMap[item.path]}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 text-sm text-gray-500 border-t border-[#e9ecef]">
        Version {config.appVersion}
      </div>
    </aside>
  );
}