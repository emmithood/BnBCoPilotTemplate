'use client';

import Link from 'next/link';

interface PageTitleBarProps {
  title: string;
  showBreadcrumbs?: boolean;
}

export default function PageTitleBar({ title, showBreadcrumbs = true }: PageTitleBarProps) {
  return (
    <div className="w-full bg-white shadow-sm border-b border-neutral-200 dark:bg-card dark:border-border dark:shadow-md">
      {showBreadcrumbs && (
        <div className="max-w-screen-lg mx-auto px-6 pt-3">
          <p className="text-sm text-muted-foreground dark:text-foreground/70">
            <Link href="/" className="hover:text-primary transition-colors dark:hover:text-primary">Home</Link>
            <span className="mx-1.5 dark:text-foreground/50">/</span>
            <span className="dark:text-foreground/70">{title}</span>
          </p>
        </div>
      )}
      <div className="text-center py-3">
        <h1 className="text-xl font-semibold tracking-tight text-primary dark:text-primary">{title}</h1>
      </div>
    </div>
  );
}