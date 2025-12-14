import { DimensionScore } from '@/types'

interface DimensionsCardProps {
  dimensions: DimensionScore[]
}

export default function DimensionsCard({ dimensions }: DimensionsCardProps) {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Evaluation Breakdown</h2>
      
      <div className="space-y-6">
        {dimensions.map((dimension, index) => {
          const percentage = (dimension.score / dimension.maxScore) * 100
          
          return (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">{dimension.name}</h3>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {dimension.score.toFixed(1)} / {dimension.maxScore} 
                  <span className="ml-2 text-blue-600 dark:text-blue-400 transition-colors duration-300">({percentage.toFixed(0)}%)</span>
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 transition-colors duration-300">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getScoreColor(dimension.score, dimension.maxScore)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              {dimension.details.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {dimension.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 transition-colors duration-300">
                      <span className="text-blue-500 dark:text-blue-400 mt-1 transition-colors duration-300">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

