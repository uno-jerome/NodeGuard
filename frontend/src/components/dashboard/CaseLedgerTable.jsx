import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const CATEGORIES = ['All Categories', 'Phishing', 'Financial Fraud', 'Extortion', 'Identity Theft', 'Unauthorized Access', 'Other'];
const STATUSES = ['All Statuses', 'Reported', 'Under Review', 'Investigating', 'Resolved', 'Closed'];

export const CaseLedgerTable = ({ incidents = [] }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const navigate = useNavigate();

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        search === '' ||
        inc.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        inc.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'All Categories' || inc.category === selectedCategory;
      const matchStat = selectedStatus === 'All Statuses' || inc.status === selectedStatus;
      return matchSearch && matchCat && matchStat;
    });
  }, [incidents, search, selectedCategory, selectedStatus]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Tracking ID or Title..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Tracking ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No cases match the specified filters.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((inc) => (
                <tr key={inc._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {inc.trackingId}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                    {inc.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{inc.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{inc.platform || 'Web'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-semibold text-xs text-slate-600 dark:text-slate-300">{inc.priority}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={inc.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                    {new Date(inc.createdAt || inc.incidentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/case/${inc._id}`)}
                      className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                      Review
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseLedgerTable;
