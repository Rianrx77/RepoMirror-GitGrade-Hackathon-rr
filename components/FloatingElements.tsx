'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function FloatingElements() {
  const { theme } = useTheme()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Light Mode Elements */}
      {theme === 'light' && (
        <>
          {/* Floating circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float-medium"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/40 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-100/30 rounded-full blur-xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-blue-200/20 rounded-full blur-xl animate-float-slow"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-60 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rotate-45 animate-rotate-slow"></div>
          <div className="absolute bottom-40 left-1/2 w-12 h-12 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rotate-12 animate-rotate-medium"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-lg rotate-45 animate-rotate-slow"></div>
        </>
      )}

      {/* Dark Mode Elements */}
      {theme === 'dark' && (
        <>
          {/* Glowing orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float-medium"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-600/10 rounded-full blur-2xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl animate-float-slow"></div>
          
          {/* Glowing stars/particles */}
          <div className="absolute top-60 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow shadow-lg shadow-blue-400/50"></div>
          <div className="absolute bottom-40 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse-medium shadow-lg shadow-purple-400/50"></div>
          <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse-slow shadow-lg shadow-blue-300/50"></div>
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-purple-300 rounded-full animate-pulse-medium shadow-lg shadow-purple-300/50"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-pulse-slow shadow-lg shadow-indigo-400/50"></div>
          
          {/* Subtle gradient orbs */}
          <div className="absolute top-80 left-1/5 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl animate-float-medium"></div>
          <div className="absolute bottom-60 right-1/5 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full blur-xl animate-float-slow"></div>
        </>
      )}
    </div>
  )
}

