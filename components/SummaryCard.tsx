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
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Written Summary</h2>
      
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          <a 
            href={repository.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {repository.name}
          </a>
        </h3>
        {repository.language && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {repository.language}
          </span>
        )}
      </div>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>
    </div>
  )
}

