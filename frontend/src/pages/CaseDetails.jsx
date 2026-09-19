import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import CaseHeader from '../components/case/CaseHeader';
import CaseSidebar from '../components/case/CaseSidebar';
import EvidenceManifest from '../components/case/EvidenceManifest';
import AuditLedgerTimeline from '../components/case/AuditLedgerTimeline';

export const CaseDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [custodyLogs, setCustodyLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCase = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/incidents/${id}`);
      setIncident(res.data.incident);
      setCustodyLogs(res.data.custodyLogs || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load case dossier.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  const handleStatusUpdated = (updated) => {
    setIncident((prev) => ({ ...prev, ...updated }));
    fetchCase();
  };

  const handleNotesUpdated = (notes) => {
    setIncident((prev) => ({ ...prev, notes }));
    fetchCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500 dark:text-slate-400">
        <ShieldAlert className="h-6 w-6 animate-pulse text-blue-600 mr-2" />
        <span className="text-sm font-medium">Loading case dossier...</span>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="space-y-4">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
          <ArrowLeft className="h-4 w-4" /> Back to Queue
        </Link>
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {error || 'Case not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Queue
        </Link>
      </div>

      <CaseHeader
        incident={incident}
        onStatusUpdated={handleStatusUpdated}
        onDossierExported={fetchCase}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EvidenceManifest
            evidenceFiles={incident.evidenceFiles || []}
            onIntegrityVerified={fetchCase}
          />
          <AuditLedgerTimeline custodyLogs={custodyLogs} />
        </div>
        <div className="lg:col-span-1">
          <CaseSidebar
            incident={incident}
            onNotesUpdated={handleNotesUpdated}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
