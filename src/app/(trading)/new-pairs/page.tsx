"use client"

import { useState, useEffect } from "react"
import CoinTable from "@/components/coin-table"
import TradingViewChart from "@/components/trading-view-chart"
import { useInView } from "react-intersection-observer"
import useSWRInfinite from "swr/infinite"
import { fetcher } from "@/lib/fetcher"
import { ScrollArea } from "@/components/ui/scroll-area"

const PAGE_SIZE = 15 // 每页加载数量

export default function NewPairsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const { ref, inView } = useInView()
  
  // 分页获取数据
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      return `/api/binance?type=new&page=${pageIndex + 1}&limit=${PAGE_SIZE}`
    },
    fetcher
  )

  const coins = data ? data.flat() : []
  const isLoadingInitial = !data && !error
  const isLoadingMore = isLoadingInitial || (size > 0 && data && typeof data[size - 1] === "undefined")
  const isReachingEnd = data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    if (inView && !isReachingEnd && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [inView, isLoadingMore, isReachingEnd, setSize, size])

  return (
    <div className="space-y-6 h-[calc(100vh-160px)] flex flex-col">
      <h1 className="text-2xl font-bold">New Pairs</h1>
      
      {selectedSymbol && (
        <div className="rounded-lg border bg-card">
          <TradingViewChart symbol={selectedSymbol.toUpperCase().replace('/', '')} />
        </div>
      )}

      <div className="flex-1 relative">
        <CoinTable
          data={coins}
          onRowClick={(symbol) => setSelectedSymbol(symbol)}
          showFavoriteButton
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
          className="h-full"
        />
        <div ref={ref} className="absolute bottom-4 left-0 right-0" />
      </div>
    </div>
  )
} 