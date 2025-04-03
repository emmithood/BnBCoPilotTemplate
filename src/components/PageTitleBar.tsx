'use client';

import Link from 'next/link';

interface PageTitleBarProps {
  title: string;
  showBreadcrumbs?: boolean;
}

export default function PageTitleBar({ title, showBreadcrumbs = true }: PageTitleBarProps) {
  return (
    <div className="w-full bg-white shadow-sm border-b border-neutral-200">
      {showBreadcrumbs && (
        <div className="max-w-screen-lg mx-auto px-6 pt-3">
          <p className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-1.5">/</span>
            <span>{title}</span>
          </p>
        </div>
      )}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">{title}</h1>
      </div>
    </div>
  );
}