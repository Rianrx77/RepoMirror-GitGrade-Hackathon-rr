# 🌟 RepoMirror - AI-Powered Repository Evaluator

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An AI-powered web application that evaluates public GitHub repositories and provides honest feedback, actionable guidance, and personalized roadmaps for improvement.**

[🚀 Live Demo](https://drive.google.com/file/d/1Vg1vGIlE9oEviOHrwB77Q7a54Gn-esQV/view?usp=sharing) • [📖 Documentation](#getting-started) • [🐛 Report Bug](https://github.com/Rianrx77/RepoMirror-GitGrade-Hackathon-rr/issues) • [💡 Request Feature](https://github.com/Rianrx77/RepoMirror-GitGrade-Hackathon-rr/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Evaluation Dimensions](#-evaluation-dimensions)
- [Tech Stack](#-tech-stack)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About

RepoMirror acts as your **AI coding mentor**, providing honest and actionable feedback on your GitHub projects. Whether you're a student learning to code, a developer preparing for interviews, or a team lead reviewing projects, RepoMirror helps you understand your repository's strengths and weaknesses.

### Why RepoMirror?

- ✅ **Honest Feedback**: Get unbiased, mentor-like evaluations of your code
- ✅ **Actionable Insights**: Receive specific, realistic improvement recommendations
- ✅ **Multi-Dimensional Analysis**: Comprehensive evaluation across 6 key dimensions
- ✅ **Zero Setup Required**: Works with public repositories without authentication
- ✅ **Privacy First**: No data storage - all analysis happens in real-time
- ✅ **Beautiful UI**: Modern, responsive design with dark mode support

## ✨ Key Features

### 🎨 User Interface
- **🌓 Dark Mode**: Seamless theme switching with smooth transitions
- **🎭 Floating Background Elements**: Animated, theme-aware decorative elements
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎯 Interactive Components**: Hover animations and smooth transitions throughout
- **💫 Loading States**: Beautiful animated indicators during analysis

### 📊 Analysis & Evaluation
- **🔍 Comprehensive Analysis**: Evaluates repositories across 6 weighted dimensions
- **📈 Scoring System**: 0-100 score with Gold/Silver/Bronze ratings
- **📝 Written Summaries**: 3-5 sentence feedback highlighting strengths and weaknesses
- **🗺️ Personalized Roadmaps**: 5-7 actionable improvement recommendations
- **📋 Detailed Breakdown**: Dimension-by-dimension evaluation with progress bars

### 🛠️ Developer Experience
- **⚡ Fast Performance**: Optimized API calls and efficient data processing
- **🔄 Real-time Analysis**: Instant feedback without data storage
- **🛡️ Error Handling**: Graceful error messages for edge cases
- **📚 FAQ Section**: Comprehensive answers to common questions
- **🔗 Social Links**: Easy access to GitHub and LinkedIn profiles

### 🧪 Quality Assurance
- **✅ Unit Tests**: Comprehensive test coverage using Vitest
- **🎯 Type Safety**: Full TypeScript implementation
- **🔒 Edge Case Handling**: Robust handling of empty repos, forks, and more

## 📸 Screenshots

*Add screenshots of your application here*

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- (Optional) **GitHub Personal Access Token** for higher API rate limits (5000/hour vs 60/hour)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rianrx77/RepoMirror-GitGrade-Hackathon-rr.git
   cd RepoMirror-GitGrade-Hackathon-rr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **(Optional) Set up GitHub token for higher rate limits:**
   - Create a `.env.local` file in the root directory
   - Add your GitHub token:
     ```
     GITHUB_TOKEN=your_github_token_here
     ```
   - Create a token at: [GitHub Settings](https://github.com/settings/tokens)
   - No special permissions needed for public repositories

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 🏗️ Project Structure

```
RepoMirror-GitGrade-Hackathon-rr/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for repository analysis
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                 # Root layout with theme provider
│   └── page.tsx                   # Main page component
├── components/
│   ├── DimensionsCard.tsx        # Evaluation breakdown display
│   ├── FAQ.tsx                    # Frequently asked questions
│   ├── FloatingElements.tsx       # Animated background elements
│   ├── Footer.tsx                 # Footer with social links
│   ├── LoadingState.tsx           # Loading indicator
│   ├── RepositoryInput.tsx        # URL input component
│   ├── ResultsDisplay.tsx         # Results container
│   ├── RoadmapCard.tsx            # Roadmap display
│   ├── ScoreCard.tsx              # Score display
│   ├── SummaryCard.tsx            # Summary display
│   └── ThemeToggle.tsx            # Dark mode toggle
├── contexts/
│   └── ThemeContext.tsx           # Theme context and provider
├── lib/
│   ├── evaluator.ts               # Scoring algorithm
│   ├── generator.ts                # Summary and roadmap generation
│   └── github-api.ts              # GitHub API integration
├── types/
│   └── index.ts                   # TypeScript type definitions
├── __tests__/
│   ├── evaluator.test.ts          # Evaluator unit tests
│   └── generator.test.ts          # Generator unit tests
└── README.md
```

## 📊 Evaluation Dimensions

RepoMirror evaluates repositories across **6 weighted dimensions**:

### 1. Code Quality & Readability (20% weight)
- Language diversity and usage
- File organization and structure
- Naming conventions
- Code complexity indicators

### 2. Project Structure & Organization (15% weight)
- Directory structure (src/lib organization)
- Configuration files presence
- Branch usage and strategy
- CI/CD pipeline setup

### 3. Documentation & Clarity (20% weight)
- README presence and quality
- Setup instructions
- Usage examples
- License file presence

### 4. Test Coverage & Maintainability (15% weight)
- Test files presence and organization
- CI integration for testing
- Test coverage indicators

### 5. Real-world Relevance (15% weight)
- Community interest (stars, forks)
- Project size and scope
- Recent updates and activity
- Practical applicability

### 6. Commit & Development Consistency (15% weight)
- Commit frequency and patterns
- Branch usage and strategy
- Project age and maintenance
- Development activity level

## 🔧 How It Works

### 1. Input Validation
- User enters a GitHub repository URL
- Frontend validates URL format using regex
- Ensures it's a valid GitHub repository URL

### 2. Repository Data Fetching
The backend uses **GitHub REST API** to fetch:
- Repository metadata (name, description, stars, forks, etc.)
- File and folder structure (limited depth to avoid rate limits)
- Programming languages used
- README content (base64 decoded)
- Commit history (recent 30 commits)
- Branch information
- Test files detection (pattern matching)
- CI/CD configuration detection

### 3. Evaluation Process
The system evaluates the repository across 6 dimensions:
- Each dimension has specific criteria and scoring rules
- Points are awarded based on heuristics (e.g., "Has README" = +8 points)
- Scores are weighted and combined into a final 0-100 score
- Detailed feedback is generated for each dimension

### 4. Output Generation
- **Score**: Numerical score (0-100) with label (Gold/Silver/Bronze or Advanced/Intermediate/Beginner)
- **Summary**: 3-5 sentence written feedback highlighting strengths and weaknesses
- **Roadmap**: 5-7 actionable, specific improvement recommendations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Axios** - HTTP client for GitHub API
- **GitHub REST API** - Repository data fetching

### Testing
- **Vitest** - Fast unit test framework
- **Coverage Reports** - Code coverage tracking

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🧪 Testing

The project includes comprehensive unit tests for core functionality:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- ✅ **Evaluator Tests**: Tests for scoring algorithm and dimension evaluation
- ✅ **Generator Tests**: Tests for summary and roadmap generation
- ✅ **Edge Cases**: Empty repos, missing files, forks, etc.

### Example Test

```typescript
import { evaluateRepository } from '@/lib/evaluator'

it('should score higher for repositories with README', () => {
  const repoWithReadme = createMockRepo({ hasReadme: true })
  const repoWithoutReadme = createMockRepo({ hasReadme: false })
  
  const resultWith = evaluateRepository(repoWithReadme)
  const resultWithout = evaluateRepository(repoWithoutReadme)
  
  expect(resultWith.totalScore).toBeGreaterThan(resultWithout.totalScore)
})
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable `GITHUB_TOKEN` (optional)
4. Deploy!

### Other Platforms

The application can be deployed to:
- **Netlify**
- **Railway**
- **Any Node.js hosting service**

Make sure to set the `GITHUB_TOKEN` environment variable if you want higher API rate limits.

## 🔒 Edge Cases Handled

- ✅ Empty repositories
- ✅ Repositories without README
- ✅ Single-file projects
- ✅ Forked repositories
- ✅ Very few commits
- ✅ Large repositories (limited file analysis depth)
- ✅ Rate limit errors
- ✅ Private/inaccessible repositories
- ✅ Missing configuration files
- ✅ No test files

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rian Renju**

- GitHub: [@Rianrx77](https://github.com/Rianrx77)
- LinkedIn: [Rian Renju](https://www.linkedin.com/in/rian-renju-96b1142b3/)

## 🙏 Acknowledgments

- Built for **GitGrade Hackathon**
- Inspired by the need for honest code feedback
- Thanks to all contributors and users

---

<div align="center">

**Built with ❤️ for developers who want honest feedback on their GitHub projects**

⭐ Star this repo if you find it helpful!

</div>
