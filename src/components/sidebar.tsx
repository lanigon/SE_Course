"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import '@mysten/dapp-kit/dist/index.css';
import { Connect } from "./connect-modal"

// 简化导航项
const navItems = [
  { name: 'Watchlist', path: '/watchlist' },
  { name: 'New Pairs', path: '/new-pairs' },
]

const chainItems = [
  { 
    name: 'Solana', 
    path: '/chain/solana'
  },
  { 
    name: 'Sui', 
    path: '/chain/sui'
  },
  { 
    name: 'Base', 
    path: '/chain/base'
  }
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[280px] bg-black">
          <SidebarContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </SheetContent>
      </Sheet>

      <nav className={cn("hidden lg:block bg-black text-white", className)}>
        <SidebarContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </nav>
    </>
  )
}

interface SidebarContentProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

function SidebarContent({ searchQuery, setSearchQuery }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4">
      {/* 搜索框 */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search trading pairs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-700"
          />
        </div>
      </div>

      {/* 主导航项 */}
      <div className="px-3 py-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start h-9 hover:bg-zinc-800/50 font-bold",
                pathname === item.path ? "bg-zinc-800/50" : "text-zinc-400"
              )}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>

      {/* 分隔线 */}
      <div className="h-px bg-zinc-800 my-2" />

      {/* 链列表 */}
      <div className="px-3 py-2">
        {chainItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start h-9 hover:bg-zinc-800/50 font-bold",
                pathname === item.path ? "bg-zinc-800/50" : "text-zinc-400"
              )}
            >
              <span className="flex-1 text-left">{item.name}</span>
            </Button>
          </Link>
        ))}
      </div>
        
      
      {/* 底部用户信息 */}
      <div className="mt-auto px-3 py-2 border-t border-zinc-800">
          <Connect />
      </div>
    </div>
  )
} 