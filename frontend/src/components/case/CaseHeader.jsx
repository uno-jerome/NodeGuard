import React, { useState } from 'react';
import { FileDown, RefreshCw } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import StatusUpdateModal from './StatusUpdateModal';
import axiosClient from '../../api/axiosClient';

const PRIORITY_STYLES = {
  CRITICAL: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
  HIGH: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  MEDIUM: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  LOW: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

export const CaseHeader = ({ incident, onStatusUpdated, onDossierExported }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const priorityClass = PRIORITY_STYLES[incident.priority] || PRIORITY_STYLES.MEDIUM;

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const res = await axiosClient.get(`/incidents/${incident._id}/dossier`, {
        responseType: 'blob',
      });
      const blobUrl = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `Dossier-${incident.trackingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      if (onDossierExported) onDossierExported();
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
              {incident.trackingId}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">
              {incident.category}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${priorityClass}`}>
              {incident.priority}
            </span>
            <StatusBadge status={incident.status} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {incident.title}
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Intake Date: {new Date(incident.createdAt || incident.incidentDate).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <RefreshCw className="h-4 w-4 text-slate-500" />
            Update Status
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <FileDown className="h-4 w-4" />
            {exporting ? 'Exporting PDF...' : 'Export Dossier (PDF)'}
          </button>
        </div>
      </div>

      <StatusUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentStatus={incident.status}
        incidentId={incident._id}
        onStatusUpdated={(updated) => {
          onStatusUpdated(updated);
        }}
      />
    </div>
  );
};

export default CaseHeader;
