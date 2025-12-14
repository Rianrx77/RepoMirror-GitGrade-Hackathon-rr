export default function LoadingState() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-12 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full transition-colors duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin transition-colors duration-300"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Analyzing Repository...</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md transition-colors duration-300">
          Fetching repository data, analyzing code structure, and generating insights...
        </p>
        <div className="mt-6 flex gap-2">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

