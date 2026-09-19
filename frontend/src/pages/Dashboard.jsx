import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import MetricCards from '../components/dashboard/MetricCards';
import CaseLedgerTable from '../components/dashboard/CaseLedgerTable';

export const Dashboard = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchIncidents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/incidents?limit=100');
        if (isMounted) {
          setIncidents(res.data.incidents || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to load case queue.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIncidents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Case Queue</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name || user?.email} ({user?.role}).
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 text-slate-500 dark:text-slate-400">
          <ShieldAlert className="h-6 w-6 animate-pulse text-blue-600 mr-2" />
          <span className="text-sm font-medium">Loading case queue...</span>
        </div>
      ) : (
        <>
          <MetricCards incidents={incidents} />
          <CaseLedgerTable incidents={incidents} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
