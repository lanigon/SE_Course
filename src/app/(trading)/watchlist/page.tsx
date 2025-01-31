"use client"

import { useState } from "react"
import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"

// 假设这些是用户收藏的代币
const watchlistCoins = [
  { symbol: "BTC/USDT", price: "61,234.56", change: "+2.5%", volume: "25B", marketCap: "1.2T" },
  { symbol: "ETH/USDT", price: "3,234.56", change: "+1.5%", volume: "15B", marketCap: "380B" },
]

export default function WatchlistPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      
      {selectedSymbol && (
        <div className="rounded-lg border bg-card">
          <TradingViewChart 
            symbol={selectedSymbol.toUpperCase().replace('/', '')} 
          />
        </div>
      )}

      <div className="mt-6">
        <CoinTable 
          data={watchlistCoins}
          onRowClick={(symbol) => setSelectedSymbol(symbol)}
          showFavoriteButton
        />
      </div>
    </div>
  )
} 