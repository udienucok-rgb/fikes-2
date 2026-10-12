import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { NavigationTab } from '../types';

interface BreadcrumbItem {
  label: string;
  tab?: NavigationTab;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (tab: NavigationTab) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 sm:px-6 bg-slate-50/90 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1.5">
        <button
          onClick={() => onNavigate('beranda')}
          className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded px-1 py-0.5"
          aria-label="Kembali ke Beranda"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </button>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.tab ? (
                <span
                  className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.tab && onNavigate(item.tab)}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded px-1 py-0.5"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
