export function RailwayLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-1">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
              IR
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full pulse-data"></div>
        </div>
      </div>
    </div>
  )
}
