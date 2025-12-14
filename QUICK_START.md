# Quick Start Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

4. **Try it out:**
   Enter a GitHub repository URL (e.g., `https://github.com/vercel/next.js`) and click "Analyze Repository"

## Optional: GitHub Token Setup

For higher API rate limits (5000/hour instead of 60/hour):

1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - No special permissions needed
   - Copy the token

2. Create `.env.local` file in the project root:
   ```
   GITHUB_TOKEN=your_token_here
   ```

3. Restart the development server

## Example Output

When you analyze a repository, you'll get:

### Score Card
- Numerical score (0-100)
- Label: Gold/Silver/Bronze or Advanced/Intermediate/Beginner

### Written Summary
- 3-5 sentences highlighting strengths and weaknesses
- Honest, mentor-like feedback

### Personalized Roadmap
- 5-7 actionable improvement recommendations
- Specific to the analyzed repository

### Evaluation Breakdown
- Detailed scores for each of the 6 dimensions
- Progress bars and specific feedback

## Troubleshooting

**"Repository not found" error:**
- Ensure the repository is public
- Check the URL format is correct
- Verify the repository exists

**"Rate limit exceeded" error:**
- Wait an hour or set up a GitHub token
- The token increases limits significantly

**Analysis takes too long:**
- Large repositories may take 10-30 seconds
- This is normal for comprehensive analysis

## Building for Production

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000` (or your configured port).

