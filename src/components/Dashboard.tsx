'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Heart, 
  Users, 
  Sparkles, 
  Plus, 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Code,
  BookOpen,
  Zap,
  MessageSquare
} from 'lucide-react'
import GroupChat from './GroupChat'

interface FlowItem {
  id: string
  type: 'prompt' | 'connection' | 'insight'
  content: string
  author: string
  authorAvatar: string
  authorStatus: string
  responses: number
  timestamp: string
}

interface ConnectionButton {
  id: string
  text: string
  icon: React.ReactNode
  category: string
}

const flowItems: FlowItem[] = [
  {
    id: '1',
    type: 'prompt',
    content: 'Anyone else building with AI agents this week? Would love to share learnings!',
    author: 'Alex Kim',
    authorAvatar: 'A',
    authorStatus: 'building',
    responses: 3,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'connection',
    content: 'Looking for a pair programming buddy to work on a React performance optimization project',
    author: 'Sarah Chen',
    authorAvatar: 'S',
    authorStatus: 'learning',
    responses: 1,
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'insight',
    content: 'Just discovered that using React.memo strategically can reduce re-renders by 40% in our app. Game changer!',
    author: 'Marcus Rodriguez',
    authorAvatar: 'M',
    authorStatus: 'exploring',
    responses: 5,
    timestamp: '6 hours ago'
  }
]

const connectionButtons: ConnectionButton[] = [
  {
    id: '1',
    text: 'Looking for a study buddy in Python',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'learning'
  },
  {
    id: '2',
    text: 'Excited about AI in education',
    icon: <Lightbulb className="w-5 h-5" />,
    category: 'innovation'
  },
  {
    id: '3',
    text: 'Need feedback on my side project',
    icon: <Code className="w-5 h-5" />,
    category: 'feedback'
  },
  {
    id: '4',
    text: 'Want to collaborate on open source',
    icon: <Users className="w-5 h-5" />,
    category: 'collaboration'
  }
]

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [showGroupChat, setShowGroupChat] = useState(false)

  const handleResonate = (itemId: string) => {
    // Handle resonance action
    console.log('Resonated with:', itemId)
  }

  const handleThanks = (itemId: string) => {
    // Handle thanks action
    console.log('Thanks for:', itemId)
  }

  const filteredButtons = selectedCategory 
    ? connectionButtons.filter(btn => btn.category === selectedCategory)
    : connectionButtons

  if (showGroupChat) {
    return <GroupChat onBack={() => setShowGroupChat(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Programmer Connection</h1>
              <p className="text-sm text-gray-500">Your resonance dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-green-700">J</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Connection Buttons */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Connections</h2>
            <button
              onClick={() => setShowConnectionModal(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {['all', 'learning', 'innovation', 'feedback', 'collaboration'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'all' ? null : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category || (category === 'all' && !selectedCategory)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Connection Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredButtons.map((button) => (
              <motion.button
                key={button.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                    {button.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{button.text}</p>
                    <p className="text-sm text-gray-500 capitalize">{button.category}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Flow Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Flow Feed</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>Curated for you</span>
            </div>
          </div>

          <div className="space-y-4">
            {flowItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                {/* Item Header */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.authorAvatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.author}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                        {item.authorStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.timestamp}</p>
                  </div>
                </div>

                {/* Item Content */}
                <p className="text-gray-800 mb-4 leading-relaxed">{item.content}</p>

                {/* Item Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleResonate(item.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
                    >
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Resonates</span>
                    </button>
                    <button
                      onClick={() => handleThanks(item.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Thanks</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{item.responses} responses</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resonance Stats */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Resonance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Connections Made</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowGroupChat(true)}
                className="w-full h-full flex flex-col items-center justify-center hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-500">Active Groups</p>
                <div className="flex items-center space-x-1 mt-1 text-blue-600 text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span>Chat</span>
                </div>
              </button>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-500">Resonance Actions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConnectionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Energy</h3>
              <textarea
                placeholder="What's on your mind? What are you working on? What excites you?"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowConnectionModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowConnectionModal(false)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
