import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../services/api';
import MascotIllustration from './illustrations/MascotIllustration';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronRight, Briefcase, FileText, Target, Mic, BookOpen, Lightbulb, Heart } from 'lucide-react';

export default function CareerBuddyChat() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi ${user?.fullName ? user.fullName.split(' ')[0] : 'friend'}! ✨\n\nI'm **CareerBuddy**! Your friendly AI placement companion. 🎓\n\nI'm here to cheer you on, review your resume, practice interviews, and guide your roadmap.\n\nWhat would you like help with today?`,
      time: 'Just now',
      actions: [
        '💼 Find suitable jobs',
        '📄 Improve my resume',
        '🎯 Check my skills',
        '🎤 Prepare for interview',
        '📚 What should I learn?',
        '💡 Give me career advice'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState('AI Demo Mode');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      // Offline fallback handling with rich empathetic response
      setTimeout(() => {
        let fallbackReply = `That's a wonderful question, ${user?.fullName ? user.fullName.split(' ')[0] : 'friend'}! 🌱\n\nEvery day you invest in structured problem-solving, Java fundamentals, and portfolio projects brings you closer to your dream placement. Focus on mastering the basics first! ✨`;
        
        const lower = textToSend.toLowerCase();
        if (lower.includes('scared') || lower.includes('won\'t get placed') || lower.includes('wont get placed') || lower.includes('fear')) {
          fallbackReply = `That's completely normal, ${user?.fullName ? user.fullName.split(' ')[0] : 'friend'}. 🌱\n\nYou don't need to know everything today. Placement prep is a gradual marathon, not an overnight sprint.\n\nLet's focus on one manageable step at a time:\n1. Strengthen your core Java fundamentals (OOP, Collections).\n2. Practice 2 coding problems every day.\n3. Build one strong, deployed project showcasing clean architecture.\n4. Practice explaining your projects with clarity.\n\nYou are making real progress by showing up and preparing. Keep going! 💙`;
        } else if (lower.includes('cgpa')) {
          fallbackReply = `While some companies set initial CGPA cutoffs (often 6.5 or 7.0), many modern product startups and high-growth recruiters prioritize demonstrated problem-solving, real projects, and coding ability above raw grades.\n\nFocus on your GitHub portfolio and DSA practice! 🚀`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: ['💼 Find suitable jobs', '📄 Improve my resume', '🎯 Check my skills']
          }
        ]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Cute Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-purple-500/35 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/30 group ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Open CareerBuddy AI"
      >
        <div className="relative">
          <MascotIllustration className="w-9 h-9" showGlow={false} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-300 border-2 border-purple-700 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-300 border-2 border-purple-700 rounded-full" />
        </div>
        <div className="text-left">
          <div className="text-sm font-black tracking-tight flex items-center space-x-1">
            <span>CareerBuddy</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded text-white font-mono">✨</span>
          </div>
          <div className="text-[10px] text-pink-100 leading-none">Your Career Companion</div>
        </div>
      </button>

      {/* Slide-over / Modal Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[440px] sm:h-[660px] w-full h-full flex flex-col bg-white sm:rounded-3xl shadow-2xl border border-purple-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white p-4 flex items-center justify-between border-b border-purple-700/50 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-inner">
                <MascotIllustration className="w-10 h-10" showGlow={false} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-base leading-snug">CareerBuddy ✨</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-pink-500/30 text-pink-200 rounded-full border border-pink-400/30">
                    {aiMode}
                  </span>
                </div>
                <p className="text-xs text-purple-200 font-medium">Your AI Placement Companion</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: Date.now(),
                      sender: 'bot',
                      text: `Reset complete! Ready to help you prepare, ${user?.fullName ? user.fullName.split(' ')[0] : 'friend'}! ✨ What's on your mind?`,
                      time: 'Just now',
                      actions: ['💼 Find suitable jobs', '📄 Improve my resume', '🎯 Check my skills']
                    }
                  ]);
                }}
                title="Restart Chat"
                className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Window"
                className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Safety & Realism Banner */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-purple-100 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-purple-800">
            <span className="flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 shrink-0" />
              <span>Friendly & realistic guidance • Cheering for you</span>
            </span>
            <span className="text-purple-600 font-semibold text-[10px]">Session Active</span>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[88%]">
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-purple-100 p-0.5 flex items-center justify-center shrink-0 mb-1 border border-purple-200">
                      <MascotIllustration className="w-7 h-7" showGlow={false} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/90 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line prose-sm max-w-none">
                      {msg.text}
                    </div>

                    {/* Career path suggestion cards if returned by AI */}
                    {msg.careerSuggestions && msg.careerSuggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.careerSuggestions.map((path, idx) => (
                          <div key={idx} className="bg-purple-50/70 border border-purple-100 rounded-xl p-2.5 text-xs text-slate-700">
                            <div className="font-bold text-purple-900 text-sm mb-1">{path.roleTitle}</div>
                            <div className="text-slate-600 mb-1.5">{path.matchReason}</div>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {path.requiredSkills.map((sk, sidx) => (
                                <span key={sidx} className="bg-white px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-700 border border-slate-200">
                                  {sk}
                                </span>
                              ))}
                            </div>
                            <div className="text-[11px] text-purple-700 font-medium">Path: {path.learningPath}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Quick Action Chips attached to bot message */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action)}
                        className="text-xs bg-white hover:bg-purple-50 text-purple-700 hover:text-purple-900 font-medium px-3 py-1.5 rounded-full border border-purple-200/80 shadow-xs hover:border-purple-400 transition-all flex items-center space-x-1"
                      >
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs py-1">
                <div className="w-8 h-8 rounded-xl bg-purple-100 p-0.5 flex items-center justify-center shrink-0 border border-purple-200">
                  <MascotIllustration className="w-7 h-7" showGlow={false} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center space-x-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                  <span className="text-[11px] text-slate-400 ml-1">CareerBuddy is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask CareerBuddy anything..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
