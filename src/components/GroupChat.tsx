'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Users, Heart, MessageCircle, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface ChatMessage {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  type: 'message' | 'resonance' | 'thanks'
}

interface GroupMember {
  id: string
  name: string
  avatar: string
  status: string
  isOnline: boolean
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    authorAvatar: 'S',
    content: 'Hey everyone! I\'m working on a new AI tool for code review. Anyone interested in testing it out?',
    timestamp: '2:30 PM',
    type: 'message'
  },
  {
    id: '2',
    author: 'Marcus Rodriguez',
    authorAvatar: 'M',
    content: 'That sounds amazing! I\'d love to help test it. What tech stack are you using?',
    timestamp: '2:32 PM',
    type: 'message'
  },
  {
    id: '3',
    author: 'Alex Kim',
    authorAvatar: 'A',
    content: 'Count me in too! I\'ve been looking for better code review tools.',
    timestamp: '2:35 PM',
    type: 'message'
  },
  {
    id: '4',
    author: 'You',
    authorAvatar: 'J',
    content: 'This is exactly what I needed! Can\'t wait to see it in action.',
    timestamp: '2:37 PM',
    type: 'message'
  }
]

const groupMembers: GroupMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'S',
    status: 'building',
    isOnline: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'M',
    status: 'learning',
    isOnline: true
  },
  {
    id: '3',
    name: 'Alex Kim',
    avatar: 'A',
    status: 'exploring',
    isOnline: false
  },
  {
    id: '4',
    name: 'You',
    avatar: 'J',
    status: 'learning',
    isOnline: true
  }
]

interface GroupChatProps {
  onBack: () => void
}

export default function GroupChat({ onBack }: GroupChatProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        author: 'You',
        authorAvatar: 'J',
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'message'
      }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
    }
  }

  const handleResonance = (messageId: string) => {
    const newResonance: ChatMessage = {
      id: Date.now().toString(),
      author: 'You',
      authorAvatar: 'J',
      content: '💙 Resonates with this',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'resonance'
    }
    setMessages(prev => [...prev, newResonance])
  }

  const handleThanks = (messageId: string) => {
    const newThanks: ChatMessage = {
      id: Date.now().toString(),
      author: 'You',
      authorAvatar: 'J',
      content: '🙏 Thanks for sharing this',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'thanks'
    }
    setMessages(prev => [...prev, newThanks])
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">AI Code Review Group</h1>
            <p className="text-sm text-gray-500">4 members • Active now</p>
          </div>
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
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.author === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.author === 'You' ? 'order-2' : 'order-1'}`}>
                  {msg.author !== 'You' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {msg.authorAvatar}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{msg.author}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.type === 'resonance' || msg.type === 'thanks'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : msg.author === 'You'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  
                  {msg.author === 'You' && (
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
                
                {msg.author === 'You' && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-semibold ml-2 order-1">
                    {msg.authorAvatar}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-center space-x-4 mt-3">
              <button
                onClick={() => handleResonance('')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Heart className="w-4 h-4" />
                <span>Resonates</span>
              </button>
              <button
                onClick={() => handleThanks('')}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Thanks</span>
              </button>
            </div>
          </div>
        </div>

        {/* Members Sidebar */}
        <div className="w-64 bg-white border-l border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Group Members</h3>
          <div className="space-y-3">
            {groupMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{member.status}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 text-sm mb-2">Group Purpose</h4>
            <p className="text-xs text-blue-700">
              Building and testing AI-powered code review tools. Share learnings, feedback, and collaborate on improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
