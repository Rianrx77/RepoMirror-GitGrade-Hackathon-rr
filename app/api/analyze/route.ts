import { NextRequest, NextResponse } from 'next/server'
import { analyzeRepository } from '@/lib/github-api'
import { evaluateRepository } from '@/lib/evaluator'
import { generateSummary, generateRoadmap } from '@/lib/generator'

export async function POST(request: NextRequest) {
  try {
    const { repoUrl } = await request.json()

    if (!repoUrl) {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      )
    }

    // Extract owner and repo from URL
    const urlMatch = repoUrl.match(/github\.com\/([\w\-\.]+)\/([\w\-\.]+)/)
    if (!urlMatch) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      )
    }

    const [, owner, repo] = urlMatch

    // Fetch repository data
    const repoData = await analyzeRepository(owner, repo)

    // Evaluate repository
    const evaluation = evaluateRepository(repoData)

    // Generate summary and roadmap
    const summary = generateSummary(repoData, evaluation)
    const roadmap = generateRoadmap(repoData, evaluation)

    // Determine label based on score
    const label = getScoreLabel(evaluation.totalScore)

    return NextResponse.json({
      score: Math.round(evaluation.totalScore),
      label,
      summary,
      roadmap,
      dimensions: evaluation.dimensions,
      repository: {
        name: repoData.fullName,
        url: repoUrl,
        language: repoData.language,
      },
    })
  } catch (error) {
    console.error('Analysis error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        return NextResponse.json(
          { error: 'Repository not found. Please ensure the repository is public and the URL is correct.' },
          { status: 404 }
        )
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to analyze repository. Please try again.' },
      { status: 500 }
    )
  }
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Gold / Advanced'
  if (score >= 70) return 'Silver / Intermediate'
  if (score >= 50) return 'Bronze / Beginner'
  return 'Needs Improvement'
}

