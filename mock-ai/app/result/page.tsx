'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, RefreshCcw, Home, Share2 } from 'lucide-react'
import Link from 'next/link'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

// MOCK DATA (In a real app, this comes from the AI analysis)
const CHART_DATA = [
  { subject: 'Confidence', A: 85, fullMark: 100 },
  { subject: 'Technical', A: 65, fullMark: 100 },
  { subject: 'Clarity', A: 90, fullMark: 100 },
  { subject: 'Pacing', A: 70, fullMark: 100 },
  { subject: 'Integrity', A: 100, fullMark: 100 },
]

export default function ResultPage() {
  const score = 82 // Mock Score

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8">
        
        {/* LEFT: THE SCORECARD */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <div className="w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Performance Analysis</h1>
            <p className="text-zinc-400 mb-8">Session ID: #8X-9291 • Software Engineer</p>

            <div className="flex items-center gap-8 mb-8">
              {/* Big Score Circle */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-800"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    strokeDasharray={`${score}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-4xl font-bold">{score}</span>
                   <span className="text-xs text-zinc-500 font-bold uppercase">Score</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Assessment Passed</h3>
                <p className="text-emerald-400 text-sm font-medium mt-1">Ready for onsite interview</p>
                <div className="flex gap-2 mt-3">
                   <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">Top 15%</span>
                   <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">High Integrity</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                   <div>
                     <p className="font-medium text-white">Strong Technical Foundation</p>
                     <p className="text-sm text-zinc-500 mt-1">You correctly identified the key differences in the TCP/UDP protocol question.</p>
                   </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div className="flex items-start gap-3">
                   <XCircle className="w-5 h-5 text-rose-400 mt-0.5" />
                   <div>
                     <p className="font-medium text-white">Improve Eye Contact</p>
                     <p className="text-sm text-zinc-500 mt-1">You looked away from the camera 12 times. Try to maintain focus on the lens.</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="/setup" className="flex-1">
                <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  Retry Sim
                </button>
              </Link>
              <button className="px-4 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 border border-zinc-800 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>


        {/* RIGHT: THE RADAR CHART */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-6 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Biometric Analysis
          </h3>
          
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CHART_DATA}>
                <PolarGrid stroke="#3f3f46" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Candidate"
                  dataKey="A"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  fill="#22d3ee"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
             <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
               <p className="text-xs text-zinc-500 uppercase">Speaking Pace</p>
               <p className="text-2xl font-bold text-white">140 <span className="text-xs text-zinc-500 font-normal">wpm</span></p>
             </div>
             <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
               <p className="text-xs text-zinc-500 uppercase">Filler Words</p>
               <p className="text-2xl font-bold text-white">Low <span className="text-xs text-zinc-500 font-normal">(2%)</span></p>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}