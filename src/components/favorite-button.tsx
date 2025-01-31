"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useState } from "react"

interface FavoriteButtonProps {
  symbol: string
  initialFavorited?: boolean
  onToggle?: (symbol: string, favorited: boolean) => void
}

export default function FavoriteButton({ 
  symbol, 
  initialFavorited = false,
  onToggle 
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 防止触发表格行的点击事件
    setFavorited(!favorited)
    onToggle?.(symbol, !favorited)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleClick}
    >
      <Star 
        className={`h-4 w-4 ${favorited ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-400'}`}
      />
    </Button>
  )
} 