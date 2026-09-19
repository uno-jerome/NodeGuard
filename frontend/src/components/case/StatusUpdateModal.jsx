import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

const ALLOWED_STATUSES = ['Reported', 'Under Review', 'Investigating', 'Resolved', 'Closed'];

export const StatusUpdateModal = ({ isOpen, onClose, currentStatus, incidentId, onStatusUpdated }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'Reported');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStatus === currentStatus) {
      onClose();
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await axiosClient.patch(`/incidents/${incidentId}/status`, { status: selectedStatus });
      onStatusUpdated(res.data.incident);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update incident status.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Update Incident Status</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Incident Status
            </label>
            <div className="mt-2 space-y-2">
              {ALLOWED_STATUSES.map((status) => (
                <label
                  key={status}
                  className={`flex items-center gap-3 p-2.5 rounded-md border cursor-pointer text-sm transition-colors ${
                    selectedStatus === status
                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-500'
                      : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="incidentStatus"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Confirm Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
