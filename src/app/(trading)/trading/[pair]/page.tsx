import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"
import FavoriteButton from "@/components/favorite-button"

export default function TradingPage({
  params
}: {
  params: { pair: string }
}) {
  // 转换pair格式以匹配TradingView的格式
  const symbol = params.pair.toUpperCase().replace('-', '')
  const displaySymbol = params.pair.toUpperCase().replace('-', '/')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Trading {displaySymbol}
        </h1>
        <FavoriteButton symbol={displaySymbol} />
      </div>
      
      {/* TradingView图表 */}
      <div className="rounded-lg border bg-card">
        <TradingViewChart symbol={symbol} />
      </div>

      {/* 相关币种表格 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Related Pairs</h2>
        <CoinTable showFavoriteButton />
      </div>
    </div>
  )
} 