# GitGrade - AI-Powered Repository Evaluator

GitGrade is an AI-powered web application that evaluates public GitHub repositories and provides honest feedback, actionable guidance, and personalized roadmaps for improvement.

## 🎯 Features

- **Repository Analysis**: Automatically fetches and analyzes GitHub repository data
- **Multi-Dimensional Scoring**: Evaluates repositories across 6 key dimensions
- **Honest Feedback**: Provides mentor-like written summaries highlighting strengths and weaknesses
- **Actionable Roadmap**: Generates personalized, specific improvement recommendations
- **Modern UI**: Clean, responsive design built with Next.js and Tailwind CSS

## 📊 Evaluation Dimensions

GitGrade evaluates repositories across 6 weighted dimensions:

1. **Code Quality & Readability** (20% weight)
   - Language diversity
   - File organization
   - Naming conventions
   - Code structure

2. **Project Structure & Organization** (15% weight)
   - Directory structure
   - Configuration files
   - Branch usage
   - CI/CD setup

3. **Documentation & Clarity** (20% weight)
   - README presence and quality
   - License file
   - Setup instructions
   - Usage examples

4. **Test Coverage & Maintainability** (15% weight)
   - Test files presence
   - Test organization
   - CI integration

5. **Real-world Relevance** (15% weight)
   - Community interest (stars, forks)
   - Project size
   - Recent updates
   - Activity level

6. **Commit & Development Consistency** (15% weight)
   - Commit frequency
   - Branch usage
   - Project age and activity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- (Optional) GitHub Personal Access Token for higher API rate limits

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gitgrade
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up GitHub token for higher rate limits:
   - Create a `.env.local` file in the root directory
   - Add your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```
   - You can create a token at: https://github.com/settings/tokens
   - No special permissions needed for public repositories

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
gitgrade/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for repository analysis
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page component
├── components/
│   ├── DimensionsCard.tsx         # Evaluation breakdown display
│   ├── LoadingState.tsx           # Loading indicator
│   ├── RepositoryInput.tsx        # URL input component
│   ├── ResultsDisplay.tsx         # Results container
│   ├── RoadmapCard.tsx            # Roadmap display
│   ├── ScoreCard.tsx              # Score display
│   └── SummaryCard.tsx            # Summary display
├── lib/
│   ├── evaluator.ts               # Scoring algorithm
│   ├── generator.ts                # Summary and roadmap generation
│   └── github-api.ts              # GitHub API integration
├── types/
│   └── index.ts                   # TypeScript type definitions
└── README.md
```

## 🔧 How It Works

### 1. Input Validation
- User enters a GitHub repository URL
- Frontend validates URL format
- Ensures it's a valid GitHub repository URL

### 2. Repository Data Fetching
The backend uses GitHub REST API to fetch:
- Repository metadata (name, description, stars, forks, etc.)
- File and folder structure (limited depth to avoid rate limits)
- Programming languages used
- README content
- Commit history (recent commits)
- Branch information
- Test files detection
- CI/CD configuration detection

### 3. Evaluation Process
The system evaluates the repository across 6 dimensions:
- Each dimension has specific criteria and scoring rules
- Scores are weighted and combined into a final 0-100 score
- Detailed feedback is generated for each dimension

### 4. Output Generation
- **Score**: Numerical score (0-100) with label (Gold/Silver/Bronze or Advanced/Intermediate/Beginner)
- **Summary**: 3-5 sentence written feedback highlighting strengths and weaknesses
- **Roadmap**: 5-7 actionable, specific improvement recommendations

## 📝 Scoring Algorithm

The scoring system uses rule-based heuristics:

- Each dimension has a maximum score (typically 15-20 points)
- Points are awarded based on specific criteria (e.g., "Has README" = +8 points)
- Dimension scores are weighted and summed for final score
- Final score is clamped between 0-100

### Example Scoring:
- **Documentation**: README (8pts) + Content quality (5pts) + Setup instructions (2pts) + License (2pts) = 17/20
- **Test Coverage**: Has tests (8pts) + Test organization (3pts) + CI integration (2pts) = 13/15

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Animated loading indicators during analysis
- **Error Handling**: Clear error messages for invalid URLs or API issues
- **Visual Feedback**: Color-coded scores and progress bars
- **Card-based Layout**: Organized display of results

## 🔒 Edge Cases Handled

- Empty repositories
- Repositories without README
- Single-file projects
- Forked repositories
- Very few commits
- Large repositories (limited file analysis depth)
- Rate limit errors
- Private/inaccessible repositories

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **API**: GitHub REST API
- **HTTP Client**: Axios

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting service**

Make sure to set the `GITHUB_TOKEN` environment variable if you want higher API rate limits.

## 🧪 Testing with Sample Repositories

Try analyzing these repositories:
- `https://github.com/vercel/next.js`
- `https://github.com/facebook/react`
- `https://github.com/microsoft/TypeScript`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for developers who want honest feedback on their GitHub projects**

