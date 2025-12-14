# Tests

This directory contains unit tests for RepoMirror.

## Test Structure

- `evaluator.test.ts` - Tests for the repository evaluation logic
- `generator.test.ts` - Tests for summary and roadmap generation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Coverage Goals

- ✅ Core evaluation functions
- ✅ Summary generation
- ✅ Roadmap generation
- ✅ Edge cases (empty repos, missing files, etc.)

## Writing New Tests

When adding new features, please add corresponding tests:

1. Create test file in `__tests__/` directory
2. Use Vitest testing framework
3. Follow existing test patterns
4. Aim for >80% code coverage

