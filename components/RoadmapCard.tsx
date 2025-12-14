interface RoadmapCardProps {
  roadmap: string[]
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Personalized Roadmap</h2>
      
      <div className="space-y-4">
        {roadmap.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <p className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed pt-1 transition-colors duration-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

