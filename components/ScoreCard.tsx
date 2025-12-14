interface ScoreCardProps {
  score: number
  label: string
}

export default function ScoreCard({ score, label }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    if (score >= 40) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-700'
  }

  const getLabelColor = (label: string) => {
    if (label.includes('Gold') || label.includes('Advanced')) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    if (label.includes('Silver') || label.includes('Intermediate')) return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Score & Rating</h2>
      
      <div className="flex flex-col items-center justify-center">
        <div className={`relative w-48 h-48 mb-6 rounded-full bg-gradient-to-br ${getScoreColor(score)} flex items-center justify-center shadow-lg`}>
          <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
            <span className="text-5xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{score}</span>
          </div>
        </div>
        
        <div className={`inline-block px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${getLabelColor(label)}`}>
          {label}
        </div>
      </div>
    </div>
  )
}

