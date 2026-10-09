import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../services/api';
import {
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATIONS
} from '../services/mockData';
import {
  User,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  Plus,
  ExternalLink,
  GitBranch,
  Globe,
  Trash2,
  CheckCircle2,
  Sparkles,
  Edit2
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [certifications, setCertifications] = useState(INITIAL_CERTIFICATIONS);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  // New Project Form Modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    role: 'Lead Developer'
  });

  // New Skill Form
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState(75);

  const completion = profile?.profileCompletion || 85;

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const projectObj = { ...newProject, id: Date.now() };
    setProjects(prev => [...prev, projectObj]);
    setShowProjectModal(false);
    setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', role: 'Lead Developer' });

    try {
      await studentApi.addProject(projectObj);
    } catch (e) {}
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const skillObj = {
      id: Date.now(),
      skillName: newSkillName.trim(),
      proficiency: Number(newSkillProficiency),
      category: 'Technical'
    };
    setSkills(prev => [...prev, skillObj]);
    setNewSkillName('');

    try {
      await studentApi.addSkill(skillObj);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              {(user?.fullName || profile?.fullName) ? (user?.fullName || profile?.fullName)[0] : 'S'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-slate-900">{user?.fullName || profile?.fullName || 'Student Candidate'}</h1>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Candidate
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {user?.department || profile?.department || 'Engineering Department'} • Batch {profile?.graduationYear || 2026}
              </div>
              <div className="text-xs text-indigo-600 font-bold mt-1">
                Target Role: {user?.targetRole || profile?.targetRole || 'Software Engineer'}
              </div>
            </div>
          </div>

          {/* Profile Completion Circular Gauge */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center space-x-4 shrink-0">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                <circle
                  cx="28" cy="28" r="24"
                  stroke="#6366F1" strokeWidth="4" fill="transparent"
                  strokeDasharray={150.8}
                  strokeDashoffset={150.8 - (150.8 * completion) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">{completion}%</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Profile Readiness</div>
              <div className="text-[11px] text-slate-500">Recruiter Verified</div>
            </div>
          </div>
        </div>

        {/* Academic & Bio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-indigo-600">
              <GraduationCap className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Academic Standing</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Cumulative CGPA:</span>
                <span className="font-bold text-slate-900">{profile?.cgpa || 8.4} / 10.0</span>
              </div>
              <div className="flex justify-between">
                <span>Degree:</span>
                <span className="font-bold text-slate-900">B.Tech</span>
              </div>
              <div className="flex justify-between">
                <span>Graduation Batch:</span>
                <span className="font-bold text-slate-900">{profile?.graduationYear || 2026}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-indigo-600">
              <User className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Professional Bio</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile?.bio ||
                'Passionate pre-final year Computer Science student specializing in Java backend development, microservices, and distributed cloud systems.'}
            </p>
          </div>
        </div>

        {/* Project Showcase Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <span>Project Portfolio Showcase</span>
              </h2>
              <p className="text-xs text-slate-500">Showcase your technical builds directly to recruiters</p>
            </div>
            <button
              onClick={() => setShowProjectModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="text-[11px] font-mono text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
                    {proj.technologies}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60 text-xs">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-slate-700 hover:text-indigo-600 flex items-center space-x-1"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <span>Technical Skills & Proficiency</span>
              </h2>
              <p className="text-xs text-slate-500">Assessed skills and domain strengths</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((sk) => (
              <div key={sk.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{sk.skillName}</span>
                  <span className="font-mono text-indigo-700 font-bold">{sk.proficiency}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${sk.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Skill Form */}
          <form onSubmit={handleAddSkill} className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g., Docker, Redis)..."
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 min-w-[200px]"
            />
            <input
              type="number"
              min="10"
              max="100"
              value={newSkillProficiency}
              onChange={(e) => setNewSkillProficiency(e.target.value)}
              placeholder="Proficiency %"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-28"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-colors"
            >
              + Add Skill
            </button>
          </form>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Industry Certifications</span>
              </h2>
              <p className="text-xs text-slate-500">Verified credentials recognized by corporate partners</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{c.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{c.issuer} • Issued {c.issueDate}</div>
                </div>
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-indigo-600 hover:text-indigo-800"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Add Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-black text-slate-900">Add Portfolio Project</h3>
              <form onSubmit={handleAddProject} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Distributed Task Queue"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe problem solved, architecture, and impact..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Technologies Used</label>
                  <input
                    type="text"
                    required
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    placeholder="Java, Spring Boot, MySQL, Redis"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProjectModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
