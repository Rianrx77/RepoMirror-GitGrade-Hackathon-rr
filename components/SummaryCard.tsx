interface SummaryCardProps {
  summary: string
  repository: {
    name: string
    url: string
    language: string | null
  }
}

export default function SummaryCard({ summary, repository }: SummaryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Written Summary</h2>
      
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
          <a 
            href={repository.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-300"
          >
            {repository.name}
          </a>
        </h3>
        {repository.language && (
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium transition-colors duration-300">
            {repository.language}
          </span>
        )}
      </div>
      
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line transition-colors duration-300">
          {summary}
        </p>
      </div>
    </div>
  )
}

