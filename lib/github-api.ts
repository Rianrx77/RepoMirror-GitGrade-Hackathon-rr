import axios from 'axios'
import { RepositoryData, FileNode } from '@/types'

const GITHUB_API_BASE = 'https://api.github.com'

/**
 * Fetches repository data from GitHub API
 */
export async function analyzeRepository(owner: string, repo: string): Promise<RepositoryData> {
  const token = process.env.GITHUB_TOKEN // Optional token for higher rate limits

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  // Fetch basic repository info
  const repoResponse = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers })
  const repoInfo = repoResponse.data

  // Fetch languages
  const languagesResponse = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers })
  const languages = languagesResponse.data

  // Fetch README
  let readmeContent: string | null = null
  let hasReadme = false
  try {
    const readmeResponse = await axios.get(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      { headers }
    )
    readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8')
    hasReadme = true
  } catch (error) {
    // README not found or not accessible
    hasReadme = false
  }

  // Fetch file structure (limited depth to avoid rate limits)
  const fileStructure = await fetchFileStructure(owner, repo, '', headers, 0, 2)

  // Fetch commits (limited to recent commits for analysis)
  const commitsResponse = await axios.get(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`,
    { 
      headers,
      params: { per_page: 30 } // Limit to 30 most recent commits
    }
  )
  const commits = commitsResponse.data
  const commitCount = commits.length

  // Calculate commit frequency (commits per month)
  const firstCommit = commits[commits.length - 1]
  const lastCommit = commits[0]
  let commitFrequency = 0
  if (firstCommit && lastCommit) {
    const firstDate = new Date(firstCommit.commit.author.date)
    const lastDate = new Date(lastCommit.commit.author.date)
    const monthsDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    commitFrequency = monthsDiff > 0 ? commitCount / monthsDiff : commitCount
  }

  // Check for test files
  const testFiles = findTestFiles(fileStructure)
  const hasTests = testFiles.length > 0

  // Check for CI/CD files
  const hasCI = checkForCI(fileStructure)

  // Fetch branches
  const branchesResponse = await axios.get(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches`,
    { headers, params: { per_page: 100 } }
  )
  const branchCount = branchesResponse.data.length

  // Check for license
  const hasLicense = !!repoInfo.license

  return {
    name: repoInfo.name,
    fullName: repoInfo.full_name,
    description: repoInfo.description,
    language: repoInfo.language,
    languages,
    stars: repoInfo.stargazers_count,
    forks: repoInfo.forks_count,
    createdAt: repoInfo.created_at,
    updatedAt: repoInfo.updated_at,
    defaultBranch: repoInfo.default_branch,
    hasReadme,
    readmeContent,
    fileStructure,
    commitCount,
    commitFrequency,
    hasTests,
    testFiles,
    hasCI,
    branchCount,
    hasLicense,
    isFork: repoInfo.fork,
    size: repoInfo.size,
  }
}

/**
 * Recursively fetches file structure from GitHub API
 */
async function fetchFileStructure(
  owner: string,
  repo: string,
  path: string,
  headers: Record<string, string>,
  currentDepth: number,
  maxDepth: number
): Promise<FileNode[]> {
  if (currentDepth >= maxDepth) {
    return []
  }

  try {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`
    const response = await axios.get(url, { headers })
    const contents = Array.isArray(response.data) ? response.data : [response.data]

    const nodes: FileNode[] = []

    for (const item of contents) {
      if (item.type === 'file') {
        nodes.push({
          name: item.name,
          path: item.path,
          type: 'file',
          size: item.size,
        })
      } else if (item.type === 'dir') {
        const children = await fetchFileStructure(
          owner,
          repo,
          item.path,
          headers,
          currentDepth + 1,
          maxDepth
        )
        nodes.push({
          name: item.name,
          path: item.path,
          type: 'dir',
          children,
        })
      }
    }

    return nodes
  } catch (error) {
    // Directory might not be accessible or might not exist
    return []
  }
}

/**
 * Finds test files in the file structure
 */
function findTestFiles(fileStructure: FileNode[]): string[] {
  const testFiles: string[] = []
  const testPatterns = [
    /test/i,
    /spec/i,
    /__tests__/i,
    /\.test\./i,
    /\.spec\./i,
  ]

  function traverse(nodes: FileNode[]) {
    for (const node of nodes) {
      if (node.type === 'file') {
        const isTestFile = testPatterns.some(pattern => pattern.test(node.name) || pattern.test(node.path))
        if (isTestFile) {
          testFiles.push(node.path)
        }
      } else if (node.children) {
        traverse(node.children)
      }
    }
  }

  traverse(fileStructure)
  return testFiles
}

/**
 * Checks for CI/CD configuration files
 */
function checkForCI(fileStructure: FileNode[]): boolean {
  const ciFiles = [
    '.github/workflows',
    '.github/actions',
    '.travis.yml',
    '.circleci',
    'Jenkinsfile',
    '.gitlab-ci.yml',
    '.azure-pipelines.yml',
  ]

  function traverse(nodes: FileNode[]): boolean {
    for (const node of nodes) {
      if (node.type === 'file' || node.type === 'dir') {
        const pathLower = node.path.toLowerCase()
        if (ciFiles.some(ciFile => pathLower.includes(ciFile.toLowerCase()))) {
          return true
        }
      }
      if (node.children) {
        if (traverse(node.children)) {
          return true
        }
      }
    }
    return false
  }

  return traverse(fileStructure)
}

