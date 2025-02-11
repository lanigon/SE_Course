"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useCurrentAccount } from '@mysten/dapp-kit'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

interface FavoriteButtonProps {
  symbol: string
  chain?: string
}

export default function FavoriteButton({ symbol, chain }: FavoriteButtonProps) {
  const account = useCurrentAccount()
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: favorites } = useSWR<{ symbol: string }[]>(
    account?.address ? `/api/favorite?userId=${account.address}` : null,
    fetcher
  )

  const isFavorited = Array.isArray(favorites) 
    ? favorites.some(f => f.symbol === symbol)
    : false

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!account?.address) return

    const action = favorited ? 'unfavorite' : 'favorite'
    setLoading(true)
    try {
      const response = await fetch('/api/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: account.address, 
          symbol, 
          chain,
          action 
        })
      })

      if (response.ok) {
        setFavorited(!favorited)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleClick}
      disabled={!account?.address || loading}
      title={!account?.address ? "请先连接钱包" : ""}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Star 
          className={`h-4 w-4 ${favorited ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-400'}`}
        />
      )}
    </Button>
  )
} 