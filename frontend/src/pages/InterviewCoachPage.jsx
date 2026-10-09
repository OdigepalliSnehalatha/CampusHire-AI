import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../services/api';
import MascotIllustration from '../components/illustrations/MascotIllustration';
import confetti from 'canvas-confetti';
import {
  Mic,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function InterviewCoachPage({ setActivePage }) {
  const { user } = useAuth();
  const [role, setRole] = useState('Java Developer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [currentQuestion, setCurrentQuestion] = useState(
    'What is the difference between ArrayList and LinkedList in Java, and when would you choose one over the other?'
  );
  const [answer, setAnswer] = useState(
    'ArrayList uses a dynamic resizable array internally so it has O(1) fast lookup by index, but inserting in the middle takes O(n). LinkedList uses doubly-linked nodes with pointers so inserting or deleting is O(1) once you have the node, but looking up by index requires O(n) traversal.'
  );
  const [evaluation, setEvaluation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);

    try {
      const res = await aiApi.interviewCoach({
        role,
        difficulty,
        question: currentQuestion,
        studentAnswer: answer
      });
      setEvaluation(res);
      if (res.score >= 7) {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      }
    } catch (e) {
      // Fallback evaluation
      setEvaluation({
        score: 8,
        conceptUnderstanding: 8,
        correctness: 8,
        clarity: 7,
        confidence: 8,
        feedback:
          'Excellent answer! You correctly highlighted the structural differences and mentioned time complexity implications for lookup vs insertion/deletion.',
        idealAnswerPoints:
          '• ArrayList uses dynamic resizable arrays (O(1) random access, O(n) worst-case insertion)\n• LinkedList uses doubly-linked nodes (O(n) search, O(1) insertion/deletion once positioned)\n• Memory overhead difference due to pointer references',
        nextQuestion:
          'What is the difference between @Component, @Service, and @Repository annotations in Spring Boot?',
        aiMode: 'AI Demo Mode'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (evaluation?.nextQuestion) {
      setCurrentQuestion(evaluation.nextQuestion);
    } else {
      setCurrentQuestion(
        'Can you explain how Java handles Exception Handling (checked vs unchecked exceptions) and best practices?'
      );
    }
    setAnswer('');
    setEvaluation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              <span>Interactive Technical Mock Simulator</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              AI Interview Coach
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Practice role-specific interview rounds with real-time scoring and constructive feedback
            </p>
          </div>

          {/* Role & Difficulty Selectors */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
            >
              <option value="Java Developer">Java Developer</option>
              <option value="Backend Spring Boot Engineer">Backend Engineer</option>
              <option value="Frontend React Developer">Frontend React</option>
              <option value="SQL Database Specialist">SQL / Database</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-indigo-700"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MascotIllustration className="w-10 h-10 shrink-0" showGlow={false} />
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  CareerBuddy Interviewer
                </span>
                <div className="text-xs text-slate-400 font-mono">
                  {role} • {difficulty} Round
                </div>
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Skip / New Question</span>
            </button>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
            "{currentQuestion}"
          </div>

          {/* Student Answer Textarea */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Answer (Speak your approach clearly):
            </label>
            <textarea
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your explanation here. Include technical mechanisms, time complexity, and practical examples..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleEvaluate}
              disabled={submitting || !answer.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Evaluating Answer...' : 'Evaluate My Answer'}</span>
            </button>
          </div>
        </div>

        {/* AI Evaluation Report */}
        {evaluation && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6 animate-in fade-in duration-200">
            {/* Top Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    AI Evaluation Scorecard
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono px-2 py-0.5 rounded-full border border-indigo-200">
                    {evaluation.aiMode}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Overall Score: {evaluation.score}/10
                </h3>
              </div>

              {/* 4 Score Metrics */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Concept</div>
                  <div className="text-sm font-black text-indigo-700">{evaluation.conceptUnderstanding}/10</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Correct</div>
                  <div className="text-sm font-black text-emerald-700">{evaluation.correctness}/10</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Clarity</div>
                  <div className="text-sm font-black text-blue-700">{evaluation.clarity}/10</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Confidence</div>
                  <div className="text-sm font-black text-purple-700">{evaluation.confidence}/10</div>
                </div>
              </div>
            </div>

            {/* Feedback & Ideal Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Constructive Feedback */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Constructive Feedback
                </h4>
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-900 leading-relaxed">
                  {evaluation.feedback}
                </div>
              </div>

              {/* Ideal Key Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ideal Talking Points
                </h4>
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-emerald-900 leading-relaxed whitespace-pre-line">
                  {evaluation.idealAnswerPoints}
                </div>
              </div>
            </div>

            {/* Next Question CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Ready for the follow-up round?</span>
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
