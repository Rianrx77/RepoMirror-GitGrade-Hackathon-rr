import { describe, it, expect } from 'vitest'
import { evaluateRepository } from '@/lib/evaluator'
import { RepositoryData } from '@/types'

describe('evaluateRepository', () => {
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
    readmeContent: 'This is a test README with setup instructions and usage examples.',
    fileStructure: [
      { name: 'src', path: 'src', type: 'dir', children: [] },
      { name: 'package.json', path: 'package.json', type: 'file', size: 1000 },
    ],
    commitCount: 20,
    commitFrequency: 2,
    hasTests: true,
    testFiles: ['test/test.spec.ts'],
    hasCI: true,
    branchCount: 3,
    hasLicense: true,
    isFork: false,
    size: 500,
    ...overrides,
  })

  it('should return a valid evaluation result', () => {
    const repo = createMockRepo()
    const result = evaluateRepository(repo)

    expect(result).toHaveProperty('totalScore')
    expect(result).toHaveProperty('dimensions')
    expect(result.totalScore).toBeGreaterThanOrEqual(0)
    expect(result.totalScore).toBeLessThanOrEqual(100)
    expect(result.dimensions).toHaveLength(6)
  })

  it('should score higher for repositories with README', () => {
    const repoWithReadme = createMockRepo({ hasReadme: true, readmeContent: 'Detailed README' })
    const repoWithoutReadme = createMockRepo({ hasReadme: false, readmeContent: null })

    const resultWith = evaluateRepository(repoWithReadme)
    const resultWithout = evaluateRepository(repoWithoutReadme)

    const docScoreWith = resultWith.dimensions.find(d => d.name.includes('Documentation'))?.score || 0
    const docScoreWithout = resultWithout.dimensions.find(d => d.name.includes('Documentation'))?.score || 0

    expect(docScoreWith).toBeGreaterThan(docScoreWithout)
  })

  it('should score higher for repositories with tests', () => {
    const repoWithTests = createMockRepo({ hasTests: true, testFiles: ['test.spec.ts'] })
    const repoWithoutTests = createMockRepo({ hasTests: false, testFiles: [] })

    const resultWith = evaluateRepository(repoWithTests)
    const resultWithout = evaluateRepository(repoWithoutTests)

    const testScoreWith = resultWith.dimensions.find(d => d.name.includes('Test'))?.score || 0
    const testScoreWithout = resultWithout.dimensions.find(d => d.name.includes('Test'))?.score || 0

    expect(testScoreWith).toBeGreaterThan(testScoreWithout)
  })

  it('should score higher for non-forked repositories', () => {
    const originalRepo = createMockRepo({ isFork: false })
    const forkedRepo = createMockRepo({ isFork: true })

    const resultOriginal = evaluateRepository(originalRepo)
    const resultForked = evaluateRepository(forkedRepo)

    expect(resultOriginal.totalScore).toBeGreaterThanOrEqual(resultForked.totalScore)
  })

  it('should score higher for repositories with CI/CD', () => {
    const repoWithCI = createMockRepo({ hasCI: true })
    const repoWithoutCI = createMockRepo({ hasCI: false })

    const resultWith = evaluateRepository(repoWithCI)
    const resultWithout = evaluateRepository(repoWithoutCI)

    const structureScoreWith = resultWith.dimensions.find(d => d.name.includes('Structure'))?.score || 0
    const structureScoreWithout = resultWithout.dimensions.find(d => d.name.includes('Structure'))?.score || 0

    expect(structureScoreWith).toBeGreaterThanOrEqual(structureScoreWithout)
  })

  it('should handle empty repositories', () => {
    const emptyRepo = createMockRepo({
      fileStructure: [],
      commitCount: 0,
      stars: 0,
      forks: 0,
      hasReadme: false,
      hasTests: false,
    })

    const result = evaluateRepository(emptyRepo)

    expect(result.totalScore).toBeGreaterThanOrEqual(0)
    expect(result.totalScore).toBeLessThanOrEqual(100)
  })

  it('should calculate weighted total score correctly', () => {
    const repo = createMockRepo()
    const result = evaluateRepository(repo)

    const calculatedScore = result.dimensions.reduce(
      (sum, dim) => sum + dim.score * dim.weight,
      0
    )

    expect(Math.abs(result.totalScore - calculatedScore)).toBeLessThan(0.01)
  })

  it('should include details for each dimension', () => {
    const repo = createMockRepo()
    const result = evaluateRepository(repo)

    result.dimensions.forEach((dimension) => {
      expect(dimension).toHaveProperty('name')
      expect(dimension).toHaveProperty('score')
      expect(dimension).toHaveProperty('maxScore')
      expect(dimension).toHaveProperty('weight')
      expect(dimension).toHaveProperty('details')
      expect(Array.isArray(dimension.details)).toBe(true)
    })
  })
})

