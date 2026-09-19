import React from 'react';

const STATUS_STYLES = {
  Reported: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  'Under Review': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  Investigating: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  Resolved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  Closed: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600',
};

const DOT_STYLES = {
  Reported: 'bg-slate-500 dark:bg-slate-400',
  'Under Review': 'bg-amber-500 dark:bg-amber-400',
  Investigating: 'bg-blue-500 dark:bg-blue-400',
  Resolved: 'bg-emerald-500 dark:bg-emerald-400',
  Closed: 'bg-zinc-500 dark:bg-zinc-400',
};

export const StatusBadge = ({ status = 'Reported', className = '' }) => {
  const badgeClasses = STATUS_STYLES[status] || STATUS_STYLES.Reported;
  const dotClasses = DOT_STYLES[status] || DOT_STYLES.Reported;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClasses} ${className}`}
      role="status"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
