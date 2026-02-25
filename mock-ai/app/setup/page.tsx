'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [resumeMode, setResumeMode] = useState<'upload' | 'paste'>('upload')
  const [file, setFile] = useState<File | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    role: '',
    description: '',
    resumeText: ''
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // 1. Save data to LocalStorage
    localStorage.setItem('mock_job_role', formData.role || 'Software Engineer')
    localStorage.setItem('mock_job_desc', formData.description)
    localStorage.setItem('mock_resume', formData.resumeText)

    // 2. Simulate "AI Processing" delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 3. Go to Interview
    router.push('/interview')
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT SIDE: JOB DETAILS */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Initialize <span className="text-cyan-400">Simulation</span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Configure your interview parameters. Our AI will generate questions based on this context.
            </p>
          </div>

          <div className="space-y-6">
            {/* Job Role Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                Target Role
              </label>
              <input 
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Job Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Paste the job description here..."
                className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>
          </div>
        </motion.div>


        {/* RIGHT SIDE: RESUME UPLOAD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Resume Context</h2>
            
            {/* TABS */}
            <div className="flex bg-zinc-900 p-1 rounded-lg">
              <button 
                onClick={() => setResumeMode('upload')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${resumeMode === 'upload' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Upload
              </button>
              <button 
                onClick={() => setResumeMode('paste')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${resumeMode === 'paste' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Paste Text
              </button>
            </div>
          </div>

          <div className="h-64 relative">
            <AnimatePresence mode="wait">
              
              {/* MODE 1: FILE UPLOAD */}
              {resumeMode === 'upload' && (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <label className={`h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900/50'}`}>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    
                    {file ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <p className="text-emerald-400 font-medium">{file.name}</p>
                        <p className="text-zinc-500 text-sm mt-1">Ready for analysis</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <p className="text-zinc-300 font-medium">Drop your resume here</p>
                      </>
                    )}
                  </label>
                </motion.div>
              )}

              {/* MODE 2: PASTE TEXT */}
              {resumeMode === 'paste' && (
                <motion.div 
                  key="paste"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <textarea 
                    value={formData.resumeText}
                    onChange={(e) => setFormData({...formData, resumeText: e.target.value})}
                    placeholder="Paste your resume text here..."
                    className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 resize-none font-mono"
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* GENERATE BUTTON */}
          <button 
            onClick={handleSubmit}
            disabled={loading || (!formData.role && !file && !formData.resumeText)}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Initializing..."
            ) : (
              <>
                Generate Interview
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

        </motion.div>

      </div>
    </div>
  )
}