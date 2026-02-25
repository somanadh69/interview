'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Infinity, 
  Shield, 
  User, 
  Briefcase, 
  Mic, 
  TrendingUp, 
  ChevronDown, 
  BarChart3,
  Activity,
  PieChart,
  Menu // Added Menu icon for mobile
} from 'lucide-react'

// --- COMPONENTS ---

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-zinc-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-cyan-400' : 'text-zinc-200 group-hover:text-white'}`}>
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* --- TOP NAVIGATION BAR (RIBBON) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/5">
        
        {/* LEFT: BRAND NAME */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
             <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Mock<span className="text-cyan-400">.ai</span>
          </span>
        </div>

        {/* RIGHT: OPTIONS */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Login Link (Visual Only) */}
          <button className="hidden md:block text-zinc-400 hover:text-white text-sm font-medium transition-colors">
            Login / Sign Up
          </button>

          {/* Use as Guest (Main Action) */}
          <Link href="/setup">
            <button className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-cyan-500/50 transition-all text-sm font-bold flex items-center gap-2 group">
              Use as Guest
              <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] -z-10 opacity-50" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Interview Preparation
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Ace Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Interview
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Our interview prep tool makes it easy to get ready for interviews and helps you succeed in real interviews with AI-powered practice and feedback.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/setup">
              <button className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center gap-2">
                Create Your Free Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-bold text-lg hover:bg-zinc-800 transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It <span className="text-cyan-400">Works</span></h2>
            <p className="text-zinc-400">Get started with our simple 4-step process and ace your next interview</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: User, title: "Sign Up", desc: "Create a free account on our AI platform." },
              { icon: Briefcase, title: "Choose Role", desc: "Unlock tailored AI interview questions." },
              { icon: Mic, title: "Practice", desc: "Start an AI mock interview and get feedback." },
              { icon: TrendingUp, title: "Enhance", desc: "Review AI insights to refine your answers." },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-xl group-hover:bg-cyan-500/10 transition-colors" />
                <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl h-full hover:border-cyan-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 font-bold text-xl">
                    {i + 1}
                  </div>
                  <div className="mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES (WHY AURA) --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Clock, 
              title: "24/7 Accessibility", 
              desc: "Practice at 3 AM or 3 PM. Aura is always available, on-demand, whenever you need it. No scheduling required." 
            },
            { 
              icon: Infinity, 
              title: "Unlimited Practice", 
              desc: "A single mock interview is not enough. Aura provides unlimited sessions to build muscle memory and true confidence." 
            },
            { 
              icon: Shield, 
              title: "Private & Objective", 
              desc: "Practice in a safe, private environment. Our feedback is 100% objective and data-driven, free from human bias." 
            }
          ].map((feature, i) => (
            <div key={i} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
              <feature.icon className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW --- */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Improvement From <span className="text-cyan-400">Insight</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              A score is just a number. Real improvement comes from detailed, personalized feedback.
            </p>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Aura provides a complete post-session dashboard that breaks down your performance, highlights areas of weakness, and offers targeted suggestions and micro-lessons to help you improve.
            </p>
          </div>
          
          {/* Mock Dashboard UI */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl opacity-20 blur-lg" />
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                <h3 className="font-bold">Performance Metrics Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm">
                    <BarChart3 className="w-4 h-4" /> Response Quality
                  </div>
                  <div className="h-16 flex items-end gap-1 mt-4">
                    {[40, 60, 50, 75, 90, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm hover:bg-cyan-500 transition-colors" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm">
                    <TrendingUp className="w-4 h-4" /> Progress Over Time
                  </div>
                  <div className="h-16 flex items-center mt-4">
                     <div className="w-full h-1 bg-zinc-800 rounded-full relative overflow-hidden">
                       <div className="absolute left-0 top-0 h-full bg-cyan-500 w-[70%]" />
                     </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm">
                    <PieChart className="w-4 h-4" /> Skill Breakdown
                  </div>
                  <div className="flex justify-center mt-2">
                    <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-cyan-500 rotate-45" />
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                   <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm">
                    <Activity className="w-4 h-4" /> Session Activity
                  </div>
                   <div className="h-12 flex items-end gap-1 mt-4 opacity-50">
                    {[30, 40, 35, 50, 45, 60, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-zinc-500 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -z-10" />
          
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold mb-6 border border-cyan-500/20">
              Start for free
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their interview skills with our AI-powered platform.
            </p>
            <Link href="/setup">
              <button className="px-10 py-5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-105">
                Create Your Free Account Now
                <ArrowRight className="inline-block ml-2 w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Frequently Asked <span className="text-cyan-400">Questions</span>
        </h2>
        <p className="text-center text-zinc-400 mb-16">Everything you need to know about our platform</p>
        
        <div className="space-y-2">
          <FaqItem 
            question="How does the AI interview practice work?" 
            answer="Our AI simulates a real video interview. It asks you relevant questions based on your chosen role, listens to your answers in real-time using speech-to-text, and analyzes your response for content, tone, and clarity."
          />
          <FaqItem 
            question="Is my practice session data private?" 
            answer="Absolutely. Your video and audio data is processed securely and is never shared with third parties. We prioritize your privacy so you can practice without fear."
          />
          <FaqItem 
            question="Can I practice for specific industries or roles?" 
            answer="Yes! During setup, you can input any job role (e.g., 'Product Manager', 'React Developer', 'Investment Banker') and paste a job description. The AI generates questions specifically for that context."
          />
          <FaqItem 
            question="What kind of feedback will I receive?" 
            answer="You get a comprehensive report card covering Technical Accuracy, Communication Clarity, Confidence, and Pace. We also provide specific tips on how to improve your answers."
          />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm">
        <p>&copy; 2025 Mock.ai. All rights reserved.</p>
      </footer>

    </main>
  )
}