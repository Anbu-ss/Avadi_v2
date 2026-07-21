import React, { useState } from 'react';
import { JOB_POSTINGS, AVADI_WARDS } from '../../mock/mockData';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import type { JobPosting } from '../../types';
import {
  Briefcase,
  Search,
  MapPin,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  X,
  Send,
  Plus,
  Building,
  UserCheck,
  Clock,
} from 'lucide-react';

export const JobsListing: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useAppData();

  const [jobList, setJobList] = useState<JobPosting[]>(JOB_POSTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New Job Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('₹15,000 - ₹20,000 / month');
  const [newJobType, setNewJobType] = useState<'Full-Time' | 'Part-Time' | 'Contract' | 'Work from Home' | 'Entry Level'>('Full-Time');
  const [newLocation, setNewLocation] = useState('Market Road, Avadi');
  const [newWard, setNewWard] = useState('Ward 12');
  const [newRequirements, setNewRequirements] = useState('10th/12th Pass, Basic computer knowledge');
  const [newContactPhone, setNewContactPhone] = useState(user?.mobile || '9876543210');

  const categories = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Work from Home', 'Entry Level'];

  const filteredJobs = jobList.filter((job) => {
    const matchesType = activeType === 'All' || job.jobType === activeType;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.some((req) => req.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleApplyConfirm = (jobTitle: string) => {
    showToast(`Application submitted for "${jobTitle}"! The employer will contact you at ${user?.mobile || 'your registered number'}.`, 'success');
    setSelectedJob(null);
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const reqArray = newRequirements.split(',').map((s) => s.trim()).filter(Boolean);

    const createdJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: newTitle,
      company: newCompany,
      salary: newSalary,
      jobType: newJobType,
      location: newLocation,
      ward: newWard,
      requirements: reqArray.length > 0 ? reqArray : ['Relevant experience preferred'],
      contactPhone: newContactPhone,
      postedDate: 'Just now',
    };

    setJobList((prev) => [createdJob, ...prev]);
    showToast(`Job opening "${newTitle}" posted successfully in Avadi Jobs Directory!`, 'success');

    setNewTitle('');
    setNewCompany('');
    setIsPostModalOpen(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-700 text-white rounded-3xl p-6 shadow-xl space-y-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-purple-100">
              Local Employment Portal
            </span>
            <h2 className="text-2xl font-black mt-2 flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-purple-200" />
              Avadi Jobs Directory
            </h2>
            <p className="text-xs text-purple-100/90 mt-0.5">
              Explore local job openings in Avadi retail shops, TIDEL Park IT hub, factories & neighborhood businesses
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search job roles, companies, skills (e.g., Cashier, TIDEL Park, Delivery, Tally)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm dark:text-white focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
          />
        </div>

        {/* Filter Chips Scrollable */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeType === type
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-purple-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Job Postings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-3 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {job.jobType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {job.postedDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5 flex items-center">
                  <Building className="w-3.5 h-3.5 mr-1" />
                  {job.company}
                </p>

                <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1.5 text-xs">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-extrabold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>{job.location} ({job.ward})</span>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Requirements:</span>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-1.5 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1 transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply Now</span>
                </button>

                <a
                  href={`tel:${job.contactPhone}`}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 font-bold text-xs hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center justify-center space-x-1 border border-slate-200 dark:border-slate-700"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Floating Fixed Position Post Job Opening Button (Right Side Middle) */}
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 right-3 sm:right-6 z-40 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-600/50 flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 cursor-pointer"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline sm:inline">Post Job Opening</span>
          <span className="xs:hidden sm:hidden">Post Job</span>
        </button>

        {/* Apply Confirmation Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 border border-purple-500 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <UserCheck className="w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Quick Job Application</h3>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
                <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm">{selectedJob.title}</h4>
                <p className="text-purple-700 dark:text-purple-300 font-semibold">{selectedJob.company}</p>
                <p className="text-slate-500 dark:text-slate-400 font-mono">{selectedJob.salary}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p className="font-bold text-slate-800 dark:text-slate-200">Applicant Details:</p>
                <p>Name: {user?.name || 'Resident'}</p>
                <p>Mobile: +91 {user?.mobile || '9876543210'}</p>
                <p>Ward: Ward {user?.wardNumber || 12} ({user?.wardName || 'Kamaraj Nagar'})</p>
              </div>

              <p className="text-[11px] text-slate-400">
                Your profile details will be submitted directly to {selectedJob.company} hiring team.
              </p>

              <button
                onClick={() => handleApplyConfirm(selectedJob.title)}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Application</span>
              </button>
            </div>
          </div>
        )}

        {/* Post a Job Vacancy Modal */}
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsPostModalOpen(false)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 border border-purple-500 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Post a Job Opening</h3>
                </div>
                <button onClick={() => setIsPostModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateJobSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Retail Sales Staff / Delivery Executive"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Avadi Textiles & Traders"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Employment Type</label>
                    <select
                      value={newJobType}
                      onChange={(e) => setNewJobType(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none font-semibold"
                    >
                      {['Full-Time', 'Part-Time', 'Contract', 'Work from Home', 'Entry Level'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                    <input
                      type="text"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location & Ward</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Market Road"
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                    <select
                      value={newWard}
                      onChange={(e) => setNewWard(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    >
                      {AVADI_WARDS.map((w) => (
                        <option key={w.number} value={`Ward ${w.number}`}>
                          Ward {w.number} - {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Key Requirements (Comma Separated)</label>
                  <input
                    type="text"
                    value={newRequirements}
                    onChange={(e) => setNewRequirements(e.target.value)}
                    placeholder="e.g. 10th Pass, Driving License, Smartphone"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">HR / Employer Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Vacancy</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
