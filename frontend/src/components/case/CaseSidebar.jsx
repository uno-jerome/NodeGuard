import React, { useState } from 'react';
import { Send, FileText, Globe, DollarSign, User } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

export const CaseSidebar = ({ incident, onNotesUpdated }) => {
  const [noteText, setNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await axiosClient.post(`/incidents/${incident._id}/notes`, { text: noteText.trim() });
      setNoteText('');
      if (onNotesUpdated) {
        onNotesUpdated(res.data.notes);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-700">
          Intake Details
        </h3>
        <div className="mt-3 space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <Globe className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold block text-slate-800 dark:text-slate-200">Platform:</span>
              <span>{incident.platform || 'Web Application'}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold block text-slate-800 dark:text-slate-200">Estimated Loss:</span>
              <span>₱{Number(incident.estimatedLoss || 0).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold block text-slate-800 dark:text-slate-200">Complainant Contact:</span>
              <span>{incident.complainantName || 'Anonymous'}</span>
              {incident.complainantEmail && (
                <span className="block text-slate-500 dark:text-slate-400">{incident.complainantEmail}</span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold block text-slate-800 dark:text-slate-200">Suspect Identifiers:</span>
              <span className="break-all">{incident.suspectIdentifiers || 'None reported'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-700">
          Investigator Notes
        </h3>

        <div className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-1">
          {(!incident.notes || incident.notes.length === 0) ? (
            <p className="text-xs text-slate-400 italic">No investigator notes attached to this case.</p>
          ) : (
            incident.notes.map((n, idx) => (
              <div key={n._id || idx} className="rounded border border-slate-100 bg-slate-50 p-2.5 text-xs dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{n.author}</span>
                  <span>{new Date(n.date).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{n.text}</p>
              </div>
            ))
          )}
        </div>

        {error && (
          <div className="mt-2 text-xs text-rose-600 dark:text-rose-400">{error}</div>
        )}

        <form onSubmit={handleAddNote} className="mt-4">
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Record investigative finding..."
            className="w-full rounded-md border border-slate-300 bg-white p-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={submitting || !noteText.trim()}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="h-3 w-3" />
            {submitting ? 'Adding...' : 'Add Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaseSidebar;
