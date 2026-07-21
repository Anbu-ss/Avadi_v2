import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import type { ComplaintStatus } from '../../types';
import {
  CheckCircle2,
  MapPin,
  Phone,
  UserCheck,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const TrackComplaints: React.FC = () => {
  const { user } = useAuth();
  const { complaints, updateComplaintStatus, showToast } = useAppData();
  const [tab, setTab] = useState<'My Complaints' | 'Others'>('My Complaints');

  const myComplaints = complaints.filter(
    (c) => c.wardNumber === (user?.wardNumber || 12)
  );

  const displayList = tab === 'My Complaints' ? myComplaints : complaints;

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300';
      case 'Action Initiated':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-300';
      case 'In Progress':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300';
      case 'Resolved':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300';
    }
  };

  const handleSimulateStatusNext = (issueId: string, currentStatus: ComplaintStatus) => {
    const sequence: ComplaintStatus[] = ['Submitted', 'Action Initiated', 'In Progress', 'Resolved'];
    const currentIndex = sequence.indexOf(currentStatus);
    if (currentIndex < sequence.length - 1) {
      const next = sequence[currentIndex + 1];
      updateComplaintStatus(issueId, next);
      showToast(`Complaint ${issueId} updated to status: ${next}`, 'success');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Track Complaints</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live ward civic complaint dashboard & status resolution timeline
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex space-x-2">
          <button
            onClick={() => setTab('My Complaints')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === 'My Complaints'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            My Complaints ({myComplaints.length})
          </button>

          <button
            onClick={() => setTab('Others')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === 'Others'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Others in Avadi ({complaints.length})
          </button>
        </div>

        <div className="space-y-4">
          {displayList.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">No complaints logged yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit a report to track progress here.</p>
            </div>
          ) : (
            displayList.map((comp) => (
              <article
                key={comp.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
                        {comp.issueId}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Ward {comp.wardNumber} • {comp.wardName}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Category: {comp.category}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-500 shrink-0" />
                      <span>{comp.address}</span>
                    </p>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(comp.status)}`}>
                    {comp.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {comp.description}
                </p>

                {comp.images && comp.images.length > 0 && (
                  <div className="flex space-x-2">
                    {comp.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Complaint Evidence"
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Status Timeline Tracking
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Updated: {comp.updatedAt}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 relative">
                    {comp.timeline.map((step, idx) => (
                      <div key={step.status} className="flex flex-col items-center text-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                            step.isDone
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                          }`}
                        >
                          {step.isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[10px] font-bold ${step.isDone ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                          {step.status}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                          {step.date}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <UserCheck className="w-4 h-4 text-emerald-500 mr-1.5" />
                      <span className="font-semibold">{comp.assignedOfficial}</span>
                    </div>
                    <a
                      href={`tel:${comp.officialPhone}`}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      <span>Call Official</span>
                    </a>
                  </div>
                </div>

                {comp.status !== 'Resolved' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSimulateStatusNext(comp.issueId, comp.status)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-700 transition-colors flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Advance Status Demo ➔</span>
                    </button>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
