'use client'
import { generateQuestions } from '../actions'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Camera, AlertTriangle, Maximize, CheckCircle2, Loader2 } from 'lucide-react'
import Webcam from 'react-webcam'
import { useRouter } from 'next/navigation'
import { useProctoring } from '../hooks/use-proctoring'

// FALLBACK QUESTIONS (If AI fails or loading takes too long)
const MOCK_QUESTIONS = [
  "Tell me about a time you failed and how you handled it.",
  "Explain the difference between TCP and UDP.",
  "How do you handle conflict in a team setting?",
  "Describe a challenging technical problem you solved recently."
]

export default function InterviewPage() {
  const router = useRouter()
  const { cheatCount, warnings, isFullscreen } = useProctoring()
  
  // State
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<string[]>(MOCK_QUESTIONS)
  const [jobRole, setJobRole] = useState("Software Engineer")

  // Refs for Deepfake Video Swap
  const idleVideoRef = useRef<HTMLVideoElement>(null)
  const talkingVideoRef = useRef<HTMLVideoElement>(null)

  // ... inside InterviewPage component

  useEffect(() => {
    const loadData = async () => {
      // Get data from Setup Page
      const savedRole = localStorage.getItem('mock_job_role') || "Software Engineer"
      const savedResume = localStorage.getItem('mock_resume') || ""
      
      setJobRole(savedRole)

      try {
        // 🟢 THIS IS THE LINE YOU ASKED ABOUT
        // We fetch real questions from Gemini based on the role
        console.log("Generating questions for:", savedRole)
        const aiQuestions = await generateQuestions(savedRole, savedResume)
        
        // If Gemini works, update the state
        if (aiQuestions && aiQuestions.length > 0) {
          setQuestions(aiQuestions)
        }
      } catch (error) {
        console.error("AI Generation Failed, using fallback:", error)
        // If it fails (e.g. API key error), it stays on MOCK_QUESTIONS automatically
      }
    }

    loadData()
  }, [])

  // 🗣️ TEXT TO SPEECH ENGINE (The Voice)
  const speakText = (text: string) => {
    window.speechSynthesis.cancel() // Stop previous speech
    
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    
    // Try to find a high-quality Google Female voice to match HeyGen avatar
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Premium')) && 
      v.name.includes('Female')
    )
    
    utterance.voice = preferredVoice || voices[0]
    utterance.rate = 1.0 // Adjust speed

    utterance.onstart = () => {
      setIsAiSpeaking(true)
      // Force talking video to play from start
      if (talkingVideoRef.current) {
        talkingVideoRef.current.currentTime = 0
        talkingVideoRef.current.play()
      }
    }

    utterance.onend = () => {
      setIsAiSpeaking(false)
      if (talkingVideoRef.current) talkingVideoRef.current.pause()
      setIsUserSpeaking(true) // User's turn begins
    }

    window.speechSynthesis.speak(utterance)
  }

  // 🎮 GAME CONTROLS
  const handleStart = () => {
    // Force Fullscreen for Anti-Cheat
    document.documentElement.requestFullscreen().catch(e => console.log("Fullscreen denied", e))
    speakText(questions[questionIndex])
  }

  const handleNextQuestion = () => {
    setIsUserSpeaking(false)
    
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1)
      // Small delay for realism
      setTimeout(() => {
        speakText(questions[questionIndex + 1])
      }, 1500)
    } else {
      // End Interview
      router.push('/result')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- ANTI-CHEAT LOCKOUT --- */}
      {!isFullscreen && (
        <div className="absolute inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <Maximize className="w-20 h-20 text-rose-500 mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-white mb-2">SESSION LOCKED</h1>
          <p className="text-zinc-400 mb-8 max-w-md">
            Anti-cheat protocols active. You must remain in fullscreen mode.
          </p>
          <button 
            onClick={() => document.documentElement.requestFullscreen()}
            className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(225,29,72,0.4)]"
          >
            RESUME SESSION
          </button>
        </div>
      )}

      {/* --- CHEATING WARNING TOAST --- */}
      <AnimatePresence>
        {warnings.length > 0 && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-rose-500/90 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-3 backdrop-blur-md border border-rose-400/50"
          >
            <AlertTriangle className="w-5 h-5 fill-white text-rose-600" />
            VIOLATION: {warnings[0]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            LIVE SIMULATION
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            {jobRole} • Q{questionIndex + 1}/{questions.length}
          </p>
        </div>
        <div className={`px-4 py-1 rounded-full border backdrop-blur-md transition-colors ${cheatCount > 0 ? 'border-rose-500/50 bg-rose-500/10 text-rose-400' : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'}`}>
          <span className="text-xs font-mono font-bold">INTEGRITY: {Math.max(100 - (cheatCount * 15), 0)}%</span>
        </div>
      </div>

      {/* --- MAIN COCKPIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[75vh]">
        
        {/* LEFT: AI AVATAR (Deepfake Swap) */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group min-h-[400px] lg:min-h-0">
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-cyan-400 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isAiSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-500'}`} />
            AI INTERVIEWER
          </div>

          {/* Video 1: IDLE LOOP */}
          <video
            ref={idleVideoRef}
            src="/videos/idle.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Video 2: TALKING LOOP (Overlay) */}
          <video
            ref={talkingVideoRef}
            src="/videos/talking.mp4"
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${isAiSpeaking ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Watermark Hider */}
          <div className="absolute bottom-4 right-4 z-20 px-2 py-1 bg-black text-[9px] text-zinc-600 rounded">
            MOCK.AI ENGINE
          </div>

          {/* Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent">
             <motion.p 
               key={questions[questionIndex]}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-lg md:text-2xl font-medium text-zinc-100 leading-relaxed"
             >
               "{questions[questionIndex]}"
             </motion.p>
          </div>
        </div>

        {/* RIGHT: USER WEBCAM */}
        <div className="relative rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
          <Webcam 
            audio={false}
            className="w-full h-full object-cover mirror-mode"
            screenshotFormat="image/jpeg"
          />
          
          {/* HUD Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/grid.svg')]" />
          <div className="absolute inset-0 border-[4px] border-zinc-900/50 rounded-3xl" />
          
          {/* Recording Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-zinc-400 flex items-center gap-2">
            <Camera className="w-3 h-3" />
            REC
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          </div>

          {/* CONTROLS */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-30">
             {/* START BUTTON */}
             {questionIndex === 0 && !isAiSpeaking && !isUserSpeaking ? (
                <button 
                  onClick={handleStart}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  INITIALIZE INTERVIEW
                </button>
             ) : (
                // SUBMIT ANSWER BUTTON
                <button 
                  onClick={handleNextQuestion}
                  disabled={isAiSpeaking}
                  className={`px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center gap-3 ${isAiSpeaking ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/30 hover:scale-105'}`}
                >
                  {isAiSpeaking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      LISTENING...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      SUBMIT ANSWER
                    </>
                  )}
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}