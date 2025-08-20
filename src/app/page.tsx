'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Users, Heart, Zap, ArrowRight, CheckCircle, Home, UserPlus } from 'lucide-react'
import Image from 'next/image'
import Dashboard from '@/components/Dashboard'

interface ResonanceQuestion {
  id: string
  question: string
  options: string[]
}

interface UserResponse {
  questionId: string
  selectedOption: string
}

const resonanceQuestions: ResonanceQuestion[] = [
  {
    id: 'mood',
    question: 'What\'s your current programming mood?',
    options: ['Building something exciting', 'Learning new things', 'Debugging & problem-solving', 'Exploring ideas', 'Need inspiration']
  },
  {
    id: 'focus',
    question: 'What area are you focused on right now?',
    options: ['Frontend development', 'Backend systems', 'AI/ML', 'DevOps & infrastructure', 'Mobile apps', 'Open source']
  },
  {
    id: 'energy',
    question: 'What excites you most about programming?',
    options: ['Creating useful tools', 'Solving complex problems', 'Learning from others', 'Building communities', 'Innovation & experimentation']
  }
]

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [isPairing, setIsPairing] = useState(false)
  const [isPaired, setIsPaired] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  const handleResponse = (questionId: string, option: string) => {
    const newResponse = { questionId, selectedOption: option }
    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== questionId)
      return [...filtered, newResponse]
    })
  }

  const handleNext = () => {
    if (currentStep < resonanceQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Start pairing process
      setIsPairing(true)
      setTimeout(() => {
        setIsPairing(false)
        setIsPaired(true)
        setHasCompletedOnboarding(true)
      }, 3000)
    }
  }

  const canProceed = () => {
    return responses.some(r => r.questionId === resonanceQuestions[currentStep].id)
  }

  const getCurrentQuestion = () => resonanceQuestions[currentStep]

  const handleGoToDashboard = () => {
    setShowDashboard(true)
  }

  const handleBackToOnboarding = () => {
    setShowDashboard(false)
    setCurrentStep(0)
    setResponses([])
    setIsPaired(false)
    setHasCompletedOnboarding(false)
  }

  // Show dashboard if user has completed onboarding and wants to see it
  if (showDashboard && hasCompletedOnboarding) {
    return (
      <div>
        <div className="bg-white border-b border-gray-100 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8">
                <Image
                  src="/resonance-logo.jpg"
                  alt="Programmer Connection Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                  priority
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Programmer Connection</h2>
            </div>
            <button
              onClick={handleBackToOnboarding}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <UserPlus className="w-4 h-4" />
              <span>New Onboarding</span>
            </button>
          </div>
        </div>
        <Dashboard />
      </div>
    )
  }

  if (isPaired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You&apos;re Connected! 🎉</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve found some amazing programmers who resonate with your energy.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Your Resonance Group</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">S</div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-600">Building AI tools • Learning enthusiast</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">M</div>
                <div>
                  <p className="font-medium text-gray-900">Marcus Rodriguez</p>
                  <p className="text-sm text-gray-600">Full-stack dev • Problem solver</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoToDashboard}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </motion.button>
        </motion.div>
      </div>
    )
  }

  if (isPairing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding Your Tribe</h2>
          <p className="text-gray-600">Analyzing resonance patterns...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4">
            <Image
              src="/resonance-logo.jpg"
              alt="Programmer Connection Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Programmer Connection</h1>
          <p className="text-gray-600">Connect through genuine resonance, not vanity</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {resonanceQuestions.length}</span>
            <span>{Math.round(((currentStep + 1) / resonanceQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / resonanceQuestions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {getCurrentQuestion().question}
            </h2>
            
            <div className="space-y-3">
              {getCurrentQuestion().options.map((option, index) => {
                const isSelected = responses.some(r => 
                  r.questionId === getCurrentQuestion().id && r.selectedOption === option
                )
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse(getCurrentQuestion().id, option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              canProceed()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>
              {currentStep < resonanceQuestions.length - 1 ? 'Continue' : 'Find My Tribe'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Philosophy Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          <Heart className="w-4 h-4 inline mr-1" />
          No followers. No likes. Just genuine connections.
        </motion.p>
      </div>
    </div>
  )
}
