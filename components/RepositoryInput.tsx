'use client'

import { useState } from 'react'

interface RepositoryInputProps {
  onAnalyze: (url: string) => void
  disabled: boolean
}

export default function RepositoryInput({ onAnalyze, disabled }: RepositoryInputProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validateUrl = (url: string): boolean => {
    const githubRepoPattern = /^https?:\/\/(www\.)?github\.com\/[\w\-\.]+\/[\w\-\.]+(\/)?$/
    return githubRepoPattern.test(url.trim())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedUrl = url.trim()
    
    if (!trimmedUrl) {
      setError('Please enter a GitHub repository URL')
      return
    }

    if (!validateUrl(trimmedUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)')
      return
    }

    onAnalyze(trimmedUrl)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository URL
          </label>
          <div className="flex gap-4">
            <input
              id="repo-url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError(null)
              }}
              placeholder="https://github.com/username/repository"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={disabled}
            />
            <button
              type="submit"
              disabled={disabled}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              {disabled ? 'Analyzing...' : 'Analyze Repository'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </form>
    </div>
  )
}

