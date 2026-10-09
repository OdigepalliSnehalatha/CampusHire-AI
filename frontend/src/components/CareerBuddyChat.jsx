import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../services/api';
import MascotIllustration from './illustrations/MascotIllustration';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Briefcase,
  FileText,
  Target,
  Mic,
  BookOpen,
  Lightbulb,
  Heart,
  TrendingUp,
  Award
} from 'lucide-react';

/**
 * Generates personalized performance-based encouragement & actionable suggestions
 * based on student dashboard metrics (CGPA, profile completion, department, target role).
 */
function getPerformanceEncouragement(user) {
  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Student';
  const cgpa = user?.cgpa || 8.5;
  const completion = user?.profileCompletion || 85;
  const dept = user?.department || 'Computer Science';
  const targetRole = user?.targetRole || 'Software Engineer';

  let tierHeader = '';
  let encouragementText = '';
  let suggestionsList = [];

  if (cgpa >= 9.0) {
    tierHeader = '🌟 Exceptional Placement Readiness (Top Tier)';
    encouragementText = `Outstanding consistency, **${firstName}**! With an elite **${cgpa} CGPA** and **${completion}% Profile Readiness**, you are in the 99th percentile in ${dept}! Top product firms (Microsoft, Google, Oracle) actively hunt for consistency like yours.`;
    suggestionsList = [
      '⚡ **High-Scale System Design:** Master Redis caching, Kafka queues, and microservices decomposition.',
      '☁️ **Cloud Portfolio Proof:** Deploy a full-stack Spring Boot + React service live on AWS or Docker with CI/CD.',
      '🎤 **Executive Communication:** Practice STAR-method technical leadership answers for managerial rounds.'
    ];
  } else if (cgpa >= 8.0) {
    tierHeader = '🚀 High Placement Potential (Top 10% Bracket)';
    encouragementText = `Fantastic progress, **${firstName}**! Your **${cgpa} CGPA** comfortably qualifies you for **95%+ campus placement drives** (Oracle, TCS Digital, Cognizant GenC Next)! With **${completion}% profile readiness**, you are in prime shape to convert high-package offers.`;
    suggestionsList = [
      '💻 **Daily DSA Momentum:** Solve 2 LeetCode Medium problems daily focusing on Arrays, HashMaps, and Binary Trees.',
      '☕ **Backend Framework Mastery:** Deepen your Spring Boot & REST APIs knowledge with database indexing and JPA optimizations.',
      '📄 **Resume ATS Impact:** Quantify outcomes on your resume (e.g. "Reduced query latency by 35% using indexing").'
    ];
  } else {
    tierHeader = '🌱 Steady Progress & Strong Practical Potential';
    encouragementText = `Keep your chin up, **${firstName}**! Modern tech recruiters value practical coding capability, GitHub proof-of-work, and problem-solving grit over raw grades! Your **${completion}% profile completion** demonstrates real commitment.`;
    suggestionsList = [
      '🛠️ **Build a Flagship GitHub Project:** Interviewers love candidates who build and deploy real products that solve problems.',
      '🎯 **Target Skill-First Assessments:** Service product drives (TCS Prime, GenC Next) and fast-growing product startups prioritize hands-on problem solving.',
      '🧠 **Solidify Core Fundamentals:** Master OOP polymorphism, memory models, SQL JOIN queries, and basic DSA.'
    ];
  }

  const welcomeText = `Hi ${firstName}! 🐰🎓 I'm **CareerBuddy**, your AI Scholar Companion!\n\n${tierHeader}\n• CGPA: **${cgpa}** | Profile: **${completion}% Ready**\n• Department: **${dept}**\n\n${encouragementText}\n\n### 🎯 Suggestions Based On Your Dashboard:\n${suggestionsList.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n💙 *You've got this! What would you like to prepare right now?*`;

  return {
    firstName,
    cgpa,
    completion,
    dept,
    targetRole,
    welcomeText,
    suggestionsList,
    encouragementText
  };
}

export default function CareerBuddyChat() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const feedback = getPerformanceEncouragement(user);
    return [
      {
        id: 1,
        sender: 'bot',
        text: feedback.welcomeText,
        time: 'Just now',
        actions: [
          '📊 Analyze my Dashboard Performance',
          '💡 Give me Encouragement & Advice',
          '🎯 Suggest Missing Skills for my Role',
          '🎤 Prepare for Technical Interview'
        ]
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState('AI Demo Mode');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update initial message dynamically whenever user logs in or profile changes
  useEffect(() => {
    if (user?.fullName) {
      const feedback = getPerformanceEncouragement(user);
      setMessages(prev => {
        if (prev.length === 1 && prev[0].sender === 'bot') {
          return [
            {
              ...prev[0],
              text: feedback.welcomeText
            }
          ];
        }
        return prev;
      });
    }
  }, [user]);

  // Global event listener to open CareerBuddy from any page or query
  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true);
      if (e.detail?.query) {
        handleSend(e.detail.query);
      }
    };
    window.addEventListener('open-career-buddy', handleOpenEvent);
    return () => window.removeEventListener('open-career-buddy', handleOpenEvent);
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText = null) => {
    const textToSend = (messageText || inputValue).trim();
    if (!textToSend) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInputValue('');
    setIsTyping(true);

    try {
      // Call backend AI chat endpoint
      const historyPayload = messages.map(m => ({ sender: m.sender, text: m.text }));
      const res = await aiApi.chat(textToSend, 'GENERAL', historyPayload);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: res.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: res.suggestedActions,
        careerSuggestions: res.careerSuggestions
      };
      if (res.aiMode) setAiMode(res.aiMode);
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      // Empathetic, performance-aware fallback
      setTimeout(() => {
        const feedback = getPerformanceEncouragement(user);
        const lower = textToSend.toLowerCase();

        let fallbackReply = `That's a great question, ${feedback.firstName}! 🌱\n\nBased on your dashboard (**CGPA: ${feedback.cgpa}**, **${feedback.completion}% profile ready**), every focused hour you invest in core problem solving and project building compounds your placement chances! Keep your momentum going! ✨`;

        if (
          lower.includes('performance') ||
          lower.includes('dashboard') ||
          lower.includes('suggestion') ||
          lower.includes('how am i doing') ||
          lower.includes('profile')
        ) {
          fallbackReply = `📊 **Performance Analysis for ${feedback.firstName}:**\n\n${feedback.encouragementText}\n\n### 💡 Key Action Steps for You:\n${feedback.suggestionsList.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nKeep focusing on practical problem solving! 🚀`;
        } else if (
          lower.includes('encourage') ||
          lower.includes('advice') ||
          lower.includes('motivation') ||
          lower.includes('nervous') ||
          lower.includes('scared') ||
          lower.includes('fear') ||
          lower.includes('wont get placed')
        ) {
          fallbackReply = `That's completely normal to feel, ${feedback.firstName}. 🌱\n\nPlacement preparation is a gradual marathon, not an overnight exam.\n\nLook at your dashboard: with a **${feedback.cgpa} CGPA** and **${feedback.completion}% readiness**, you are already steps ahead of where you were!\n\n1. Take a deep breath.\n2. Pick 1 topic today (e.g. Java Collections).\n3. Solve 2 problems and celebrate small wins.\n\nYou are capable, you are preparing, and your effort will show up in your interviews! 💙`;
        } else if (lower.includes('cgpa')) {
          fallbackReply = `Your **CGPA is ${feedback.cgpa}** in **${feedback.dept}**. ${
            feedback.cgpa >= 8.0
              ? 'This safely clears 95%+ of initial campus cutoffs! Focus 80% of your energy now on DSA and coding tests.'
              : 'Many product startups and top tech firms prioritize demonstrated problem-solving, projects, and coding ability above raw grades. Build a strong GitHub portfolio!'
          }`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: [
              '📊 Analyze my Dashboard Performance',
              '💡 Give me Encouragement & Advice',
              '🎯 Suggest Missing Skills for my Role',
              '🎤 Prepare for Technical Interview'
            ]
          }
        ]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  const performance = getPerformanceEncouragement(user);

  // CareerBuddy is only visible when logged into an account
  if (!user) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* RIGHT BOTTOM SIDE: 5CM BUDDY PICTURE + EQUAL-WIDTH TYPE BAR DIRECTLY BELOW */}
      {/* ========================================================================= */}
      <div
        className={`fixed bottom-5 right-5 z-50 flex flex-col items-end transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* 5 CM Buddy Picture (Length: 5cm, Height/Breadth: 5cm) with Gentle Moving Illusion */}
        <div
          onClick={() => setIsOpen(true)}
          style={{ width: '5cm', height: '5cm' }}
          className="relative cursor-pointer group flex items-center justify-center p-0.5 select-none transition-transform hover:scale-105 active:scale-95 drop-shadow-xl bg-transparent"
          title="CareerBuddy AI 🐰🎓 - Click to chat with your placement assistant"
        >
          <MascotIllustration className="w-full h-full" showGlow={false} />
          {/* Subtle online badge dot */}
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-md animate-pulse" />
        </div>

        {/* Type Bar Below Buddy (Constant 5cm size equal to buddy picture, does NOT enlarge on click) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!inputValue.trim()) {
              setIsOpen(true);
              return;
            }
            handleSend();
            setIsOpen(true);
          }}
          style={{ width: '5cm' }}
          className="mt-1 flex items-center bg-white/95 backdrop-blur-md rounded-xl shadow-lg border-2 border-purple-300/90 p-1 transition-colors focus-within:border-pink-500 group"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask CareerBuddy..."
            className="w-full min-w-0 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
          />
          <button
            type="submit"
            className="px-2.5 py-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shrink-0 transition-transform active:scale-95 shadow-xs flex items-center space-x-1"
            title="Send to CareerBuddy"
          >
            <span>Ask</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* REDUCED CHAT WINDOW SIZE: EXACTLY 12 CM LENGTH AND 12 CM HEIGHT */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          style={{
            width: '12cm',
            height: '12cm',
            maxWidth: 'calc(100vw - 1.5rem)',
            maxHeight: 'calc(100vh - 1.5rem)'
          }}
          className="fixed bottom-5 right-5 z-50 flex flex-col bg-white rounded-3xl shadow-2xl border-2 border-purple-300 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header (Compact & Elegant) */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-purple-700/50 shadow-sm shrink-0">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white/10 p-0.5 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-inner shrink-0">
                <MascotIllustration className="w-7 h-7" showGlow={false} />
              </div>
              <div className="min-w-0 truncate">
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-black text-xs sm:text-sm leading-snug truncate">
                    CareerBuddy 🐰🎓
                  </h3>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-pink-500/30 text-pink-200 rounded-full border border-pink-400/30 shrink-0">
                    {aiMode}
                  </span>
                </div>
                <p className="text-[10px] text-purple-200 font-medium truncate">
                  AI Placement & Career Guide
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => {
                  const fb = getPerformanceEncouragement(user);
                  setMessages([
                    {
                      id: Date.now(),
                      sender: 'bot',
                      text: `Reset complete! Ready to help you prepare, ${fb.firstName}! ✨\n\n${fb.welcomeText}`,
                      time: 'Just now',
                      actions: [
                        '📊 Analyze my Dashboard Performance',
                        '💡 Give me Encouragement & Advice',
                        '🎯 Suggest Missing Skills for my Role',
                        '🎤 Prepare for Technical Interview'
                      ]
                    }
                  ]);
                }}
                title="Restart Chat"
                className="p-1.5 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat (return to 5cm buddy)"
                className="p-1.5 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Performance Dashboard Status Strip */}
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-b border-purple-100 px-3 py-1 flex items-center justify-between text-[10px] text-purple-900 font-semibold shrink-0">
            <span className="flex items-center space-x-1 truncate">
              <TrendingUp className="w-3 h-3 text-pink-600 shrink-0" />
              <span className="truncate">
                CGPA: <strong className="text-indigo-700">{performance.cgpa}</strong> • Ready:{' '}
                <strong className="text-emerald-700">{performance.completion}%</strong>
              </span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-purple-200/60 text-purple-800 text-[9px] font-bold shrink-0">
              Batch 2026
            </span>
          </div>

          {/* Chat Messages List (Fits snugly in 12cm container) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-1.5 max-w-[92%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-lg bg-purple-100 p-0.5 flex items-center justify-center shrink-0 mb-1 border border-purple-200">
                      <MascotIllustration className="w-5 h-5" showGlow={false} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-xs'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line prose-xs max-w-none">
                      {msg.text}
                    </div>

                    {/* Career Suggestions Cards */}
                    {msg.careerSuggestions && msg.careerSuggestions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Suggested Career Tracks:
                        </div>
                        {msg.careerSuggestions.map((role, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-purple-50 border border-purple-100 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-purple-900">{role.roleName}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-200 text-purple-800 rounded-full font-bold">
                                {role.matchScore}% Match
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-600">{role.reason}</div>
                            {role.missingSkills && role.missingSkills.length > 0 && (
                              <div className="text-[9px] text-purple-700">
                                <strong>Skills to learn:</strong> {role.missingSkills.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>

                {/* Quick Action Chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 pl-7">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(act)}
                        className="text-[10px] font-medium bg-white hover:bg-purple-50 text-purple-700 hover:text-purple-900 border border-purple-200 rounded-lg px-2 py-1 shadow-2xs transition-all active:scale-95 text-left"
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 text-slate-500 text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-purple-100 p-0.5 flex items-center justify-center shrink-0 border border-purple-200">
                  <MascotIllustration className="w-5 h-5" showGlow={false} />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center space-x-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                  <span className="text-[10px] text-slate-400 ml-1">CareerBuddy is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Compact Input Bar */}
          <div className="p-2 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-1.5"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask CareerBuddy anything..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
