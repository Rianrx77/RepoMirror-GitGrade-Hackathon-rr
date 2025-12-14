import { describe, it, expect } from 'vitest'
import { generateSummary, generateRoadmap } from '@/lib/generator'
import { evaluateRepository } from '@/lib/evaluator'
import { RepositoryData } from '@/types'

describe('generateSummary', () => {
  const createMockRepo = (overrides: Partial<RepositoryData> = {}): RepositoryData => ({
    name: 'test-repo',
    fullName: 'test/test-repo',
    description: 'A test repository',
    language: 'TypeScript',
    languages: { TypeScript: 100 },
    stars: 10,
    forks: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    defaultBranch: 'main',
    hasReadme: true,
    readmeContent: 'This is a test README',
    fileStructure: [],
    commitCount: 20,
    commitFrequency: 2,
    hasTests: true,
    testFiles: ['test.spec.ts'],
    hasCI: true,
    branchCount: 3,
    hasLicense: true,
    isFork: false,
    size: 500,
    ...overrides,
  })

  it('should generate a non-empty summary', () => {
    const repo = createMockRepo()
    const evaluation = evaluateRepository(repo)
    const summary = generateSummary(repo, evaluation)

    expect(summary).toBeTruthy()
    expect(summary.length).toBeGreaterThan(0)
    expect(typeof summary).toBe('string')
  })

  it('should mention missing README when absent', () => {
    const repo = createMockRepo({ hasReadme: false })
    const evaluation = evaluateRepository(repo)
    const summary = generateSummary(repo, evaluation)

    expect(summary.toLowerCase()).toContain('readme')
  })

  it('should mention test coverage when missing', () => {
    const repo = createMockRepo({ hasTests: false, commitCount: 15 })
    const evaluation = evaluateRepository(repo)
    const summary = generateSummary(repo, evaluation)

    expect(summary.toLowerCase()).toContain('test')
  })

  it('should mention fork status for forked repositories', () => {
    const repo = createMockRepo({ isFork: true })
    const evaluation = evaluateRepository(repo)
    const summary = generateSummary(repo, evaluation)

    expect(summary.toLowerCase()).toContain('fork')
  })

  it('should generate different summaries for different repositories', () => {
    const repo1 = createMockRepo({ hasReadme: true, hasTests: true })
    const repo2 = createMockRepo({ hasReadme: false, hasTests: false })

    const eval1 = evaluateRepository(repo1)
    const eval2 = evaluateRepository(repo2)

    const summary1 = generateSummary(repo1, eval1)
    const summary2 = generateSummary(repo2, eval2)

    expect(summary1).not.toBe(summary2)
  })
})

describe('generateRoadmap', () => {
  const createMockRepo = (overrides: Partial<RepositoryData> = {}): RepositoryData => ({
    name: 'test-repo',
    fullName: 'test/test-repo',
    description: 'A test repository',
    language: 'TypeScript',
    languages: { TypeScript: 100 },
    stars: 10,
    forks: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    defaultBranch: 'main',
    hasReadme: true,
    readmeContent: 'This is a test README',
    fileStructure: [],
    commitCount: 20,
    commitFrequency: 2,
    hasTests: true,
    testFiles: ['test.spec.ts'],
    hasCI: true,
    branchCount: 3,
    hasLicense: true,
    isFork: false,
    size: 500,
    ...overrides,
  })

  it('should generate a non-empty roadmap', () => {
    const repo = createMockRepo()
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    expect(roadmap).toBeTruthy()
    expect(Array.isArray(roadmap)).toBe(true)
    expect(roadmap.length).toBeGreaterThan(0)
  })

  it('should suggest README when missing', () => {
    const repo = createMockRepo({ hasReadme: false })
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    const hasReadmeSuggestion = roadmap.some(item => 
      item.toLowerCase().includes('readme')
    )

    expect(hasReadmeSuggestion).toBe(true)
  })

  it('should suggest tests when missing', () => {
    const repo = createMockRepo({ hasTests: false })
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    const hasTestSuggestion = roadmap.some(item => 
      item.toLowerCase().includes('test')
    )

    expect(hasTestSuggestion).toBe(true)
  })

  it('should suggest CI/CD when missing', () => {
    const repo = createMockRepo({ hasCI: false })
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    const hasCISuggestion = roadmap.some(item => 
      item.toLowerCase().includes('ci') || item.toLowerCase().includes('pipeline')
    )

    expect(hasCISuggestion).toBe(true)
  })

  it('should suggest license when missing', () => {
    const repo = createMockRepo({ hasLicense: false })
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    const hasLicenseSuggestion = roadmap.some(item => 
      item.toLowerCase().includes('license')
    )

    expect(hasLicenseSuggestion).toBe(true)
  })

  it('should limit roadmap items to reasonable number', () => {
    const repo = createMockRepo()
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    expect(roadmap.length).toBeLessThanOrEqual(7)
    expect(roadmap.length).toBeGreaterThanOrEqual(3)
  })

  it('should generate actionable items', () => {
    const repo = createMockRepo({ hasReadme: false, hasTests: false })
    const evaluation = evaluateRepository(repo)
    const roadmap = generateRoadmap(repo, evaluation)

    roadmap.forEach((item) => {
      expect(item.length).toBeGreaterThan(10) // Should be descriptive
      expect(item).not.toBe('') // Should not be empty
    })
  })
})

