import { RepositoryData, DimensionScore, FileNode } from '@/types'

export interface EvaluationResult {
  totalScore: number
  dimensions: DimensionScore[]
}

/**
 * Evaluates a repository across multiple dimensions
 */
export function evaluateRepository(repoData: RepositoryData): EvaluationResult {
  const dimensions: DimensionScore[] = []

  // 1. Code Quality & Readability
  const codeQuality = evaluateCodeQuality(repoData)
  dimensions.push(codeQuality)

  // 2. Project Structure & Organization
  const structure = evaluateStructure(repoData)
  dimensions.push(structure)

  // 3. Documentation & Clarity
  const documentation = evaluateDocumentation(repoData)
  dimensions.push(documentation)

  // 4. Test Coverage & Maintainability
  const testCoverage = evaluateTestCoverage(repoData)
  dimensions.push(testCoverage)

  // 5. Real-world Relevance
  const relevance = evaluateRelevance(repoData)
  dimensions.push(relevance)

  // 6. Commit & Development Consistency
  const consistency = evaluateConsistency(repoData)
  dimensions.push(consistency)

  // Calculate weighted total score
  const totalScore = dimensions.reduce((sum, dim) => {
    return sum + (dim.score * dim.weight)
  }, 0)

  return {
    totalScore: Math.min(100, Math.max(0, totalScore)), // Clamp between 0-100
    dimensions,
  }
}

/**
 * Dimension 1: Code Quality & Readability
 */
function evaluateCodeQuality(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 20
  const details: string[] = []

  // Language diversity (multiple languages can indicate complexity)
  const languageCount = Object.keys(repoData.languages).length
  if (languageCount > 0) {
    score += Math.min(5, languageCount * 1.5)
    details.push(`Uses ${languageCount} programming language(s)`)
  }

  // File organization (not everything in root)
  const rootFiles = repoData.fileStructure.filter(f => f.type === 'file').length
  const hasStructure = repoData.fileStructure.some(f => f.type === 'dir')
  if (hasStructure && rootFiles < 10) {
    score += 5
    details.push('Well-organized file structure')
  } else if (rootFiles > 20) {
    details.push('Too many files in root directory')
  }

  // Repository size (reasonable size indicates proper organization)
  if (repoData.size > 0 && repoData.size < 1000) {
    score += 3
    details.push('Reasonable repository size')
  } else if (repoData.size > 10000) {
    details.push('Very large repository - consider splitting')
  }

  // Naming conventions (check for common patterns)
  const hasGoodNaming = checkNamingConventions(repoData.fileStructure)
  if (hasGoodNaming) {
    score += 4
    details.push('Good file naming conventions')
  } else {
    details.push('Could improve file naming conventions')
  }

  // Code complexity indicator (file count vs structure depth)
  const avgDepth = calculateAverageDepth(repoData.fileStructure)
  if (avgDepth > 1) {
    score += 3
    details.push('Proper directory hierarchy')
  }

  return {
    name: 'Code Quality & Readability',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.20,
    details,
  }
}

/**
 * Dimension 2: Project Structure & Organization
 */
function evaluateStructure(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 15
  const details: string[] = []

  // Has proper directory structure
  const hasSrc = repoData.fileStructure.some(f => 
    f.type === 'dir' && (f.name.toLowerCase() === 'src' || f.name.toLowerCase() === 'lib')
  )
  if (hasSrc) {
    score += 4
    details.push('Has src/lib directory structure')
  } else {
    details.push('Consider organizing code in src/ or lib/ directory')
  }

  // Has config files
  const hasConfig = repoData.fileStructure.some(f => 
    f.type === 'file' && (
      f.name.includes('config') || 
      f.name.includes('package.json') || 
      f.name.includes('requirements.txt') ||
      f.name.includes('pom.xml') ||
      f.name.includes('Cargo.toml')
    )
  )
  if (hasConfig) {
    score += 3
    details.push('Has dependency/configuration files')
  }

  // Not a fork (original work)
  if (!repoData.isFork) {
    score += 2
    details.push('Original repository (not a fork)')
  } else {
    details.push('This is a forked repository')
  }

  // Has multiple branches
  if (repoData.branchCount > 1) {
    score += 3
    details.push(`Uses ${repoData.branchCount} branches`)
  } else {
    details.push('Consider using feature branches')
  }

  // Has CI/CD
  if (repoData.hasCI) {
    score += 3
    details.push('Has CI/CD configuration')
  } else {
    details.push('Consider adding CI/CD pipeline')
  }

  return {
    name: 'Project Structure & Organization',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.15,
    details,
  }
}

/**
 * Dimension 3: Documentation & Clarity
 */
function evaluateDocumentation(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 20
  const details: string[] = []

  // Has README
  if (repoData.hasReadme) {
    score += 8
    details.push('Has README.md file')
    
    // README quality (length and content)
    if (repoData.readmeContent) {
      const readmeLength = repoData.readmeContent.length
      if (readmeLength > 500) {
        score += 5
        details.push('README has substantial content')
      } else if (readmeLength > 200) {
        score += 3
        details.push('README has basic content')
      } else {
        details.push('README could be more detailed')
      }

      // Check for common sections
      const hasSetup = /setup|install|getting started/i.test(repoData.readmeContent)
      const hasUsage = /usage|example|how to/i.test(repoData.readmeContent)
      const hasContributing = /contribut|license/i.test(repoData.readmeContent)

      if (hasSetup) {
        score += 2
        details.push('README includes setup instructions')
      }
      if (hasUsage) {
        score += 2
        details.push('README includes usage examples')
      }
      if (hasContributing) {
        score += 1
        details.push('README includes contribution guidelines')
      }
    }
  } else {
    details.push('Missing README.md file')
  }

  // Has license
  if (repoData.hasLicense) {
    score += 2
    details.push('Has license file')
  } else {
    details.push('Consider adding a license')
  }

  // Has description
  if (repoData.description && repoData.description.length > 20) {
    score += 1
    details.push('Repository has description')
  }

  return {
    name: 'Documentation & Clarity',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.20,
    details,
  }
}

/**
 * Dimension 4: Test Coverage & Maintainability
 */
function evaluateTestCoverage(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 15
  const details: string[] = []

  // Has test files
  if (repoData.hasTests) {
    score += 8
    details.push(`Has ${repoData.testFiles.length} test file(s)`)
    
    // Test file organization
    const hasTestDir = repoData.testFiles.some(f => 
      f.includes('test') || f.includes('spec') || f.includes('__tests__')
    )
    if (hasTestDir) {
      score += 3
      details.push('Tests are well-organized')
    }
  } else {
    details.push('No test files found')
  }

  // Has CI (which often runs tests)
  if (repoData.hasCI) {
    score += 2
    details.push('CI/CD likely runs tests')
  }

  // Repository activity (maintained projects have tests)
  if (repoData.commitCount > 10 && repoData.hasTests) {
    score += 2
    details.push('Active development with test coverage')
  }

  return {
    name: 'Test Coverage & Maintainability',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.15,
    details,
  }
}

/**
 * Dimension 5: Real-world Relevance
 */
function evaluateRelevance(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 15
  const details: string[] = []

  // Stars (community interest)
  if (repoData.stars > 100) {
    score += 5
    details.push(`High community interest (${repoData.stars} stars)`)
  } else if (repoData.stars > 10) {
    score += 3
    details.push(`Some community interest (${repoData.stars} stars)`)
  } else if (repoData.stars > 0) {
    score += 1
    details.push(`Has ${repoData.stars} star(s)`)
  }

  // Forks (reusability)
  if (repoData.forks > 50) {
    score += 4
    details.push(`High reusability (${repoData.forks} forks)`)
  } else if (repoData.forks > 5) {
    score += 2
    details.push(`Some reusability (${repoData.forks} forks)`)
  }

  // Project size (substantial projects are more relevant)
  const fileCount = countFiles(repoData.fileStructure)
  if (fileCount > 20) {
    score += 3
    details.push(`Substantial project (${fileCount} files)`)
  } else if (fileCount > 5) {
    score += 1
    details.push(`Moderate project size (${fileCount} files)`)
  } else {
    details.push('Small project - consider expanding functionality')
  }

  // Recent updates
  const daysSinceUpdate = (Date.now() - new Date(repoData.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceUpdate < 30) {
    score += 3
    details.push('Recently updated')
  } else if (daysSinceUpdate < 180) {
    score += 1
    details.push('Moderately maintained')
  } else {
    details.push('Project appears inactive')
  }

  return {
    name: 'Real-world Relevance',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.15,
    details,
  }
}

/**
 * Dimension 6: Commit & Development Consistency
 */
function evaluateConsistency(repoData: RepositoryData): DimensionScore {
  let score = 0
  const maxScore = 15
  const details: string[] = []

  // Commit count
  if (repoData.commitCount > 50) {
    score += 5
    details.push(`Active development (${repoData.commitCount} commits analyzed)`)
  } else if (repoData.commitCount > 20) {
    score += 3
    details.push(`Moderate activity (${repoData.commitCount} commits)`)
  } else if (repoData.commitCount > 5) {
    score += 1
    details.push(`Some commits (${repoData.commitCount} commits)`)
  } else {
    details.push('Very few commits - project may be new or inactive')
  }

  // Commit frequency
  if (repoData.commitFrequency > 10) {
    score += 5
    details.push('High commit frequency')
  } else if (repoData.commitFrequency > 3) {
    score += 3
    details.push('Regular commit frequency')
  } else if (repoData.commitFrequency > 0) {
    score += 1
    details.push('Some commit activity')
  }

  // Branch usage
  if (repoData.branchCount > 3) {
    score += 3
    details.push('Uses multiple branches effectively')
  } else if (repoData.branchCount > 1) {
    score += 1
    details.push('Uses branches')
  } else {
    details.push('Only using default branch')
  }

  // Project age (older projects with activity are better)
  const projectAge = (Date.now() - new Date(repoData.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)
  if (projectAge > 6 && repoData.commitCount > 20) {
    score += 2
    details.push('Established project with ongoing development')
  }

  return {
    name: 'Commit & Development Consistency',
    score: Math.min(maxScore, score),
    maxScore,
    weight: 0.15,
    details,
  }
}

// Helper functions

function checkNamingConventions(fileStructure: FileNode[]): boolean {
  let hasGoodNaming = true
  const badPatterns = [/^[A-Z]/, /[A-Z]{2,}/, /[^a-z0-9\-_\.]/]

  function traverse(nodes: FileNode[]) {
    for (const node of nodes) {
      if (node.type === 'file') {
        // Check for common bad naming patterns (simplified check)
        const name = node.name.toLowerCase()
        if (name.includes(' ') || name.length > 50) {
          hasGoodNaming = false
          return
        }
      }
      if (node.children) {
        traverse(node.children)
      }
    }
  }

  traverse(fileStructure)
  return hasGoodNaming
}

function calculateAverageDepth(fileStructure: FileNode[]): number {
  let totalDepth = 0
  let fileCount = 0

  function traverse(nodes: FileNode[], depth: number) {
    for (const node of nodes) {
      if (node.type === 'file') {
        totalDepth += depth
        fileCount++
      }
      if (node.children) {
        traverse(node.children, depth + 1)
      }
    }
  }

  traverse(fileStructure, 0)
  return fileCount > 0 ? totalDepth / fileCount : 0
}

function countFiles(fileStructure: FileNode[]): number {
  let count = 0
  function traverse(nodes: FileNode[]) {
    for (const node of nodes) {
      if (node.type === 'file') {
        count++
      }
      if (node.children) {
        traverse(node.children)
      }
    }
  }
  traverse(fileStructure)
  return count
}

