'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'How do I use RepoMirror?',
    answer: 'Simply paste a public GitHub repository URL into the input field and click "Analyze Repository". Our AI-powered system will automatically fetch and analyze the repository across multiple dimensions including code quality, documentation, test coverage, and more. Within seconds, you\'ll receive a comprehensive score, written summary, and personalized roadmap for improvement.'
  },
  {
    question: 'Why should I use RepoMirror?',
    answer: 'RepoMirror acts as your AI coding mentor, providing honest and actionable feedback on your GitHub projects. Whether you\'re a student learning to code, a developer preparing for interviews, or a team lead reviewing projects, RepoMirror helps you understand your repository\'s strengths and weaknesses. It offers specific, actionable recommendations to improve your code quality, documentation, testing practices, and overall project structure.'
  },
  {
    question: 'What does RepoMirror analyze?',
    answer: 'RepoMirror evaluates repositories across 6 key dimensions: Code Quality & Readability, Project Structure & Organization, Documentation & Clarity, Test Coverage & Maintainability, Real-world Relevance, and Commit & Development Consistency. Each dimension contributes to an overall score (0-100) with detailed feedback and improvement suggestions.'
  },
  {
    question: 'Do I need a GitHub token?',
    answer: 'No, RepoMirror works with public repositories without any authentication. However, if you want to avoid rate limits (60 requests/hour), you can optionally add a GitHub Personal Access Token in your environment variables. This increases the limit to 5000 requests/hour.'
  },
  {
    question: 'Is my repository data stored?',
    answer: 'No, RepoMirror does not store any repository data. All analysis is performed in real-time using GitHub\'s public API, and no information is saved on our servers. Your privacy is important to us.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors duration-300">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
      </h2>
      
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70 hover:scale-[1.02] cursor-pointer group"
            onClick={() => toggleFAQ(index)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'max-h-96 opacity-100 mt-4'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

