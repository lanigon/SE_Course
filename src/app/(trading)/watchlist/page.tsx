"use client"

import { useState, useEffect } from "react"
import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"
import { useCurrentAccount } from "@mysten/dapp-kit"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function WatchlistPage() {
  const account = useCurrentAccount()
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  
  // 获取收藏的代币列表（仅在已连接钱包时请求）
  const { data: watchlistCoins, error, isLoading } = useSWR(
    account?.address ? `/api/favorite?userId=${account.address}` : null,
    fetcher
  )

  if (!account?.address) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <div className="text-center py-8 text-zinc-400">
          请先连接钱包查看收藏列表
        </div>
      </div>
    )
  }

  // 确保数据结构正确
  const coins = Array.isArray(watchlistCoins) ? watchlistCoins : []

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
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Failed to load watchlist</div>
        ) : (
          <CoinTable 
            data={coins}
            onRowClick={(symbol) => setSelectedSymbol(symbol)}
            showFavoriteButton
          />
        )}
      </div>
    </div>
  )
} 