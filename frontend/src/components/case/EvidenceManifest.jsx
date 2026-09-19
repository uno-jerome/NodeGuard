import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Download, HardDrive } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

export const EvidenceManifest = ({ evidenceFiles = [], onIntegrityVerified }) => {
  const [verifying, setVerifying] = useState({});
  const [verifyStatus, setVerifyStatus] = useState({});

  const handleVerify = async (evidenceId) => {
    setVerifying((prev) => ({ ...prev, [evidenceId]: true }));
    try {
      const res = await axiosClient.post(`/evidence/${evidenceId}/verify`);
      setVerifyStatus((prev) => ({
        ...prev,
        [evidenceId]: res.data.match ? 'pass' : 'fail',
      }));
      if (onIntegrityVerified) onIntegrityVerified();
    } catch (err) {
      setVerifyStatus((prev) => ({ ...prev, [evidenceId]: 'fail' }));
    } finally {
      setVerifying((prev) => ({ ...prev, [evidenceId]: false }));
    }
  };

  const handleDownload = async (evidenceId, originalFilename) => {
    try {
      const res = await axiosClient.get(`/evidence/${evidenceId}/download`, { responseType: 'blob' });
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = originalFilename || 'evidence_artifact';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Evidence download failed:', err);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
        <HardDrive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Forensic Evidence Manifest</h2>
      </div>

      {evidenceFiles.length === 0 ? (
        <p className="mt-4 text-xs text-slate-500 italic">No forensic evidence files attached to this incident.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {evidenceFiles.map((ev) => {
            const status = verifyStatus[ev._id];
            const isVerifying = verifying[ev._id];
            return (
              <div key={ev._id} className="rounded-md border border-slate-200 p-4 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{ev.originalFilename}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(Number(ev.fileSize || 0) / 1024).toFixed(2)} KB • {ev.mimeType || 'Unknown MIME'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerify(ev._id)}
                      disabled={isVerifying}
                      className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      {isVerifying ? 'Hashing...' : 'Verify Disk Integrity'}
                    </button>
                    <button
                      onClick={() => handleDownload(ev._id, ev.originalFilename)}
                      className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                    >
                      <Download className="h-3.5 w-3.5 text-slate-500" />
                      Download
                    </button>
                  </div>
                </div>

                <div className="mt-3 rounded bg-slate-100 p-2 text-xs font-mono text-slate-800 dark:bg-slate-900 dark:text-slate-300 break-all">
                  <span className="font-semibold text-slate-500 select-none">SHA-256: </span>
                  {ev.sha256Hash || 'N/A'}
                </div>

                {status === 'pass' && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Integrity Intact: SHA-256 Match
                  </div>
                )}

                {status === 'fail' && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-800 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    Tampering Detected: Hash Mismatch
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EvidenceManifest;
