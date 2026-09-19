import React from 'react';
import { ShieldAlert, Clock, Search, CheckCircle } from 'lucide-react';

export const MetricCards = ({ incidents = [] }) => {
  const total = incidents.length;
  const underReview = incidents.filter((i) => i.status === 'Under Review').length;
  const investigating = incidents.filter((i) => i.status === 'Investigating').length;
  const resolved = incidents.filter((i) => i.status === 'Resolved').length;

  const cards = [
    { label: 'Total Cases', value: total, icon: ShieldAlert, iconClass: 'text-blue-600 dark:text-blue-400' },
    { label: 'Under Review', value: underReview, icon: Clock, iconClass: 'text-amber-600 dark:text-amber-400' },
    { label: 'Active Investigations', value: investigating, icon: Search, iconClass: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Resolved Cases', value: resolved, icon: CheckCircle, iconClass: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
              <Icon className={`h-5 w-5 ${card.iconClass}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
