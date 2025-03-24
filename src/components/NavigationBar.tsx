'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-[#e9ecef] shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-xl font-bold text-primary hover:text-accent transition-colors"
          >
            STR AI Dashboard
          </Link>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              pathname === '/' 
                ? 'bg-secondary text-primary' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </Link>
          
          <Link 
            href="/documents" 
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              pathname === '/documents' 
                ? 'bg-secondary text-primary' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Documents
          </Link>
        </div>
      </div>
    </nav>
  );
}