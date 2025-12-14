import { AnalysisResult } from '@/types'
import ScoreCard from './ScoreCard'
import SummaryCard from './SummaryCard'
import RoadmapCard from './RoadmapCard'
import DimensionsCard from './DimensionsCard'

interface ResultsDisplayProps {
  results: AnalysisResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreCard score={results.score} label={results.label} />
        <SummaryCard summary={results.summary} repository={results.repository} />
      </div>
      
      <RoadmapCard roadmap={results.roadmap} />
      
      <DimensionsCard dimensions={results.dimensions} />
    </div>
  )
}

