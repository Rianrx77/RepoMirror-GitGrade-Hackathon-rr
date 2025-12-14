'use client'

import { useState } from 'react'
import RepositoryInput from '@/components/RepositoryInput'
import LoadingState from '@/components/LoadingState'
import ResultsDisplay from '@/components/ResultsDisplay'
import ThemeToggle from '@/components/ThemeToggle'
import FloatingElements from '@/components/FloatingElements'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { AnalysisResult } from '@/types'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (repoUrl: string) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze repository')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 relative">
      <FloatingElements />
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              RepoMirror
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            AI-powered repository evaluator that provides honest feedback and actionable guidance
          </p>
        </div>

        <RepositoryInput onAnalyze={handleAnalyze} disabled={loading} />

        {loading && <LoadingState />}

        {error && (
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 transition-colors duration-300">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-300 font-medium transition-colors duration-300">{error}</p>
            </div>
          </div>
        )}

        {results && <ResultsDisplay results={results} />}

        <FAQ />
      </div>
      
      <Footer />
    </main>
  )
}

