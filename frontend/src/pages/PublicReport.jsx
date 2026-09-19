import React from 'react';
import { FileText } from 'lucide-react';

export const PublicReport = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-700">
          <div className="p-2 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Report Security Incident</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Public secure reporting portal</p>
          </div>
        </div>
        <div className="mt-6 rounded-md border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          The public incident submission form is not yet available.
        </div>
      </div>
    </div>
  );
};

export default PublicReport;
