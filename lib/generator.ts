import { RepositoryData, EvaluationResult } from './evaluator'

/**
 * Generates a written summary of the repository evaluation
 */
export function generateSummary(
  repoData: RepositoryData,
  evaluation: EvaluationResult
): string {
  const strengths: string[] = []
  const weaknesses: string[] = []

  // Analyze dimensions to identify strengths and weaknesses
  evaluation.dimensions.forEach(dim => {
    const percentage = (dim.score / dim.maxScore) * 100
    
    if (percentage >= 70) {
      // Strength
      if (dim.name.includes('Documentation')) {
        strengths.push('strong documentation')
      } else if (dim.name.includes('Structure')) {
        strengths.push('well-organized project structure')
      } else if (dim.name.includes('Test')) {
        strengths.push('good test coverage')
      } else if (dim.name.includes('Code Quality')) {
        strengths.push('clean code organization')
      } else if (dim.name.includes('Consistency')) {
        strengths.push('consistent development practices')
      } else if (dim.name.includes('Relevance')) {
        strengths.push('real-world applicability')
      }
    } else if (percentage < 50) {
      // Weakness
      if (dim.name.includes('Documentation')) {
        weaknesses.push('lacks comprehensive documentation')
      } else if (dim.name.includes('Structure')) {
        weaknesses.push('needs better project organization')
      } else if (dim.name.includes('Test')) {
        weaknesses.push('missing test coverage')
      } else if (dim.name.includes('Code Quality')) {
        weaknesses.push('code organization could be improved')
      } else if (dim.name.includes('Consistency')) {
        weaknesses.push('inconsistent development activity')
      } else if (dim.name.includes('Relevance')) {
        weaknesses.push('limited real-world application')
      }
    }
  })

  // Build summary sentences
  let summary = ''

  if (strengths.length > 0) {
    summary += `The repository demonstrates ${strengths.join(', ')}. `
  } else {
    summary += 'The repository shows potential but needs improvement across several areas. '
  }

  if (weaknesses.length > 0) {
    summary += `However, it ${weaknesses.join(', ')}. `
  }

  // Add specific observations
  if (!repoData.hasReadme) {
    summary += 'A README file would significantly improve the project\'s accessibility. '
  }

  if (!repoData.hasTests && repoData.commitCount > 10) {
    summary += 'Given the project\'s activity, adding test coverage would enhance reliability. '
  }

  if (repoData.isFork) {
    summary += 'As a forked repository, consider contributing original features to stand out. '
  }

  // Final assessment
  if (evaluation.totalScore >= 80) {
    summary += 'Overall, this is a well-maintained project with strong fundamentals.'
  } else if (evaluation.totalScore >= 60) {
    summary += 'With some improvements, this project could reach professional standards.'
  } else if (evaluation.totalScore >= 40) {
    summary += 'This project has a solid foundation but requires focused improvements.'
  } else {
    summary += 'This project would benefit from significant enhancements to reach its potential.'
  }

  return summary.trim()
}

/**
 * Generates a personalized roadmap with actionable items
 */
export function generateRoadmap(
  repoData: RepositoryData,
  evaluation: EvaluationResult
): string[] {
  const roadmap: string[] = []

  // Documentation improvements
  if (!repoData.hasReadme) {
    roadmap.push('Create a comprehensive README.md with project description, setup instructions, and usage examples')
  } else if (repoData.readmeContent && repoData.readmeContent.length < 500) {
    roadmap.push('Expand README.md with detailed setup instructions, API documentation, and contribution guidelines')
  }

  if (!repoData.hasLicense) {
    roadmap.push('Add a LICENSE file to clarify usage rights and encourage contributions')
  }

  // Test coverage
  if (!repoData.hasTests) {
    roadmap.push('Add unit tests using a testing framework appropriate for your language (Jest, pytest, JUnit, etc.)')
  } else if (repoData.testFiles.length < 3) {
    roadmap.push('Expand test coverage to include edge cases and integration tests')
  }

  // CI/CD
  if (!repoData.hasCI) {
    roadmap.push('Set up CI/CD pipeline using GitHub Actions to automate testing and deployment')
  }

  // Project structure
  const hasSrc = repoData.fileStructure.some(f => 
    f.type === 'dir' && (f.name.toLowerCase() === 'src' || f.name.toLowerCase() === 'lib')
  )
  if (!hasSrc) {
    roadmap.push('Organize code into src/ or lib/ directory to separate source code from configuration files')
  }

  // Branch strategy
  if (repoData.branchCount <= 1) {
    roadmap.push('Implement a branching strategy (e.g., feature branches, develop branch) for better collaboration')
  }

  // Commit practices
  if (repoData.commitCount < 10) {
    roadmap.push('Make more frequent, meaningful commits with descriptive commit messages')
  } else if (repoData.commitFrequency < 2) {
    roadmap.push('Maintain more consistent commit frequency to show active development')
  }

  // Code quality
  const rootFiles = repoData.fileStructure.filter(f => f.type === 'file').length
  if (rootFiles > 15) {
    roadmap.push('Reorganize files: move source code into subdirectories and keep only essential files in root')
  }

  // Real-world relevance
  if (repoData.stars === 0 && repoData.forks === 0) {
    roadmap.push('Add project description, tags, and showcase key features to attract users and contributors')
  }

  // Language-specific recommendations
  if (repoData.language === 'JavaScript' || repoData.language === 'TypeScript') {
    if (!repoData.fileStructure.some(f => f.name === 'package.json')) {
      roadmap.push('Add package.json with proper dependencies and scripts')
    }
  } else if (repoData.language === 'Python') {
    if (!repoData.fileStructure.some(f => f.name === 'requirements.txt' || f.name === 'setup.py')) {
      roadmap.push('Add requirements.txt or setup.py for dependency management')
    }
  }

  // Ensure we have at least 3-5 items
  if (roadmap.length < 3) {
    roadmap.push('Add code comments and docstrings to improve code readability')
    roadmap.push('Consider adding a CONTRIBUTING.md file to guide potential contributors')
  }

  // Limit to 5-7 most important items
  return roadmap.slice(0, 7)
}

