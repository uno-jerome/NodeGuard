import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export const TrackCase = () => {
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-700">
          <div className="p-2 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Track Incident Status</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Search using your tracking ID</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="trackingId" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Tracking ID
            </label>
            <input
              id="trackingId"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. CASE-2026-00001"
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Check Status
          </button>
        </form>

        <div className="mt-6 rounded-md border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Case tracking lookup is not yet available.
        </div>
      </div>
    </div>
  );
};

export default TrackCase;
