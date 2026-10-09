import React, { useState, useEffect } from 'react';
import { companiesApi, jobsApi } from '../services/api';
import { INITIAL_JOBS } from '../services/mockData';
import {
  Building2,
  MapPin,
  Globe,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

import { REAL_COMPANIES } from '../services/mockData';

export default function CompaniesPage({ setActivePage }) {
  const [companies, setCompanies] = useState(REAL_COMPANIES);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await companiesApi.getAll();
        if (data && data.length > 0) setCompanies(data);
      } catch (e) {}
    }
    loadCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Corporate Recruitment Partners</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Partner Companies & Recruiters
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Learn about hiring culture, average packages, and active campus drives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner">
                      {comp.logoUrl || '🏢'}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">{comp.name}</h2>
                      <div className="text-xs text-indigo-600 font-bold">{comp.industry}</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {comp.description}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Package</span>
                    <span className="font-black text-slate-900">₹{comp.averagePackage} LPA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Alumni Hired</span>
                    <span className="font-black text-emerald-700">{comp.totalHired}+ Placed</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{comp.location}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
                <button
                  onClick={() => setActivePage('jobs')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                >
                  <span>View Open Drives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
