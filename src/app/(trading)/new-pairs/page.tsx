"use client"

import { useState } from "react"
import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"

// 假设这些是新上线的代币
const newPairsCoins = [
  { symbol: "PEPE/USDT", price: "0.000001234", change: "+15.5%", volume: "5M", marketCap: "100M" },
  { symbol: "DOGE/USDT", price: "0.12345", change: "+8.5%", volume: "2B", marketCap: "15B" },
]

export default function NewPairsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Pairs</h1>
      
      {selectedSymbol && (
        <div className="rounded-lg border bg-card">
          <TradingViewChart 
            symbol={selectedSymbol.toUpperCase().replace('/', '')} 
          />
        </div>
      )}

      <div className="mt-6">
        <CoinTable 
          data={newPairsCoins}
          onRowClick={(symbol) => setSelectedSymbol(symbol)}
          showFavoriteButton
        />
      </div>
    </div>
  )
} 