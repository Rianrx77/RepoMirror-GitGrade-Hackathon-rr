export default function LoadingState() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-12">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Repository...</h3>
        <p className="text-gray-600 text-center max-w-md">
          Fetching repository data, analyzing code structure, and generating insights...
        </p>
        <div className="mt-6 flex gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

