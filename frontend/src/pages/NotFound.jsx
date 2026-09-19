import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The requested forensic route does not exist or has been relocated.
      </p>
      <Link
        to="/report"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Return to Report Incident
      </Link>
    </div>
  );
};

export default NotFound;
