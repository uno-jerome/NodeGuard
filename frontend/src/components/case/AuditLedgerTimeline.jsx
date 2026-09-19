import React from 'react';
import { Clock, ShieldCheck, AlertCircle, CheckCircle2, FileText, FileDown, ArrowRightLeft } from 'lucide-react';

const ACTION_CONFIG = {
  INGESTION: { color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800', icon: ShieldCheck },
  VERIFY_PASS: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800', icon: CheckCircle2 },
  VERIFY_FAIL: { color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800', icon: AlertCircle },
  STATUS_CHANGE: { color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800', icon: ArrowRightLeft },
  NOTE_ADDED: { color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700', icon: FileText },
  DOSSIER_EXPORT: { color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800', icon: FileDown },
  DOWNLOAD: { color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700', icon: FileDown },
};

export const AuditLedgerTimeline = ({ custodyLogs = [] }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Immutable Chain of Custody Audit Ledger</h2>
      </div>

      {custodyLogs.length === 0 ? (
        <p className="mt-4 text-xs text-slate-500 italic">No chain of custody logs found.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="border-b border-slate-200 bg-slate-50 uppercase font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5">Timestamp</th>
                <th className="px-3 py-2.5">Action</th>
                <th className="px-3 py-2.5">Actor Role</th>
                <th className="px-3 py-2.5">IP Address</th>
                <th className="px-3 py-2.5">Details & Checksum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {custodyLogs.map((log) => {
                const conf = ACTION_CONFIG[log.action] || ACTION_CONFIG.NOTE_ADDED;
                const Icon = conf.icon;
                return (
                  <tr key={log._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="px-3 py-2.5 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium ${conf.color}`}>
                        <Icon className="h-3 w-3" />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-medium text-slate-800 dark:text-slate-200">
                      {log.performedBy?.role || 'SYSTEM'}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-slate-500 dark:text-slate-400">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="text-slate-800 dark:text-slate-200">{log.details}</div>
                      {log.calculatedHash && (
                        <div className="mt-1 font-mono text-[10px] text-slate-500 dark:text-slate-400 break-all">
                          Checksum: {log.calculatedHash}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLedgerTimeline;
