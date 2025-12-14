export interface RepositoryData {
  name: string
  fullName: string
  description: string | null
  language: string | null
  languages: Record<string, number>
  stars: number
  forks: number
  createdAt: string
  updatedAt: string
  defaultBranch: string
  hasReadme: boolean
  readmeContent: string | null
  fileStructure: FileNode[]
  commitCount: number
  commitFrequency: number
  hasTests: boolean
  testFiles: string[]
  hasCI: boolean
  branchCount: number
  hasLicense: boolean
  isFork: boolean
  size: number
}

export interface FileNode {
  name: string
  path: string
  type: 'file' | 'dir'
  size?: number
  children?: FileNode[]
}

export interface DimensionScore {
  name: string
  score: number
  maxScore: number
  weight: number
  details: string[]
}

export interface AnalysisResult {
  score: number
  label: string
  summary: string
  roadmap: string[]
  dimensions: DimensionScore[]
  repository: {
    name: string
    url: string
    language: string | null
  }
}

