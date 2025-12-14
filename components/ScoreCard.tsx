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
    if (label.includes('Gold') || label.includes('Advanced')) return 'bg-yellow-100 text-yellow-800'
    if (label.includes('Silver') || label.includes('Intermediate')) return 'bg-gray-100 text-gray-800'
    return 'bg-orange-100 text-orange-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Score & Rating</h2>
      
      <div className="flex flex-col items-center justify-center">
        <div className={`relative w-48 h-48 mb-6 rounded-full bg-gradient-to-br ${getScoreColor(score)} flex items-center justify-center shadow-lg`}>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-5xl font-bold text-gray-800">{score}</span>
          </div>
        </div>
        
        <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getLabelColor(label)}`}>
          {label}
        </div>
      </div>
    </div>
  )
}

