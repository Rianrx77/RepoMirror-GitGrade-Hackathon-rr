interface RoadmapCardProps {
  roadmap: string[]
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Roadmap</h2>
      
      <div className="space-y-4">
        {roadmap.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <p className="flex-1 text-gray-700 leading-relaxed pt-1">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

