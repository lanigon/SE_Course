"use client"

import { useState } from "react"
import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"

// 为每个链定义代币数据
const chainData = {
  solana: [
    { symbol: "SOL/USDT", price: "123.45", change: "+5.5%", volume: "2B", marketCap: "50B" },
    { symbol: "BONK/USDT", price: "0.00001234", change: "+12.5%", volume: "10M", marketCap: "100M" },
    { symbol: "JTO/USDT", price: "2.45", change: "-1.5%", volume: "5M", marketCap: "200M" },
  ],
  sui: [
    { symbol: "SUI/USDT", price: "1.23", change: "+3.5%", volume: "500M", marketCap: "2B" },
    { symbol: "BUCK/USDT", price: "0.99", change: "-0.1%", volume: "1M", marketCap: "10M" },
    { symbol: "NAV/USDT", price: "0.45", change: "+8.5%", volume: "2M", marketCap: "20M" },
  ],
  base: [
    { symbol: "MEME/USDT", price: "0.0123", change: "+25.5%", volume: "100M", marketCap: "500M" },
    { symbol: "TOSHI/USDT", price: "1.45", change: "+15.5%", volume: "50M", marketCap: "150M" },
    { symbol: "DEGEN/USDT", price: "0.89", change: "-2.5%", volume: "20M", marketCap: "80M" },
  ]
}

// 链的显示名称映射
const chainNames = {
  solana: "Solana",
  sui: "Sui",
  base: "Base"
}

export default function ChainPage({
  params
}: {
  params: { chain: string }
}) {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  
  // 获取当前链的代币数据
  const coins = chainData[params.chain as keyof typeof chainData] || []
  const chainName = chainNames[params.chain as keyof typeof chainNames] || params.chain

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {chainName} Ecosystem
        </h1>
      </div>

      {/* 如果选择了代币，显示图表 */}
      {selectedSymbol && (
        <div className="rounded-lg border bg-card">
          <TradingViewChart 
            symbol={selectedSymbol.toUpperCase().replace('/', '')} 
          />
        </div>
      )}

      {/* 代币列表 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {chainName} Tokens
        </h2>
        <CoinTable 
          data={coins}
          onRowClick={(symbol) => setSelectedSymbol(symbol)}
          showFavoriteButton
        />
      </div>
    </div>
  )
} 