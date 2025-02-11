"use client";

import useSWR from 'swr'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import FavoriteButton from "./favorite-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"

interface Coin {
  symbol: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
}

interface CoinTableProps {
  onRowClick?: (symbol: string) => void;
  showFavoriteButton?: boolean;
  filterChain?: string;
  isLoadingMore?: boolean;
  isReachingEnd?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement>;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CoinTable({ 
  onRowClick,
  showFavoriteButton = false,
  filterChain,
  isLoadingMore = false,
  isReachingEnd = false,
  loadMoreRef
}: CoinTableProps) {
  const router = useRouter();
  const apiUrl = filterChain 
    ? `/api/binance?chain=${filterChain.toLowerCase()}`
    : '/api/binance'

  const { data, error, isLoading, mutate } = useSWR<Coin[]>(apiUrl, fetcher, {
    refreshInterval: 30000 // 每30秒刷新数据
  });

  const handleRowClick = (symbol: string) => {
    if (onRowClick) {
      onRowClick(symbol);
    } else {
      const formattedSymbol = symbol.toLowerCase().replace('/', '-');
      router.push(`/trading/${formattedSymbol}`);
    }
  };

  if (error) return (
    <div className="text-center py-8">
      <div className="text-red-500 mb-2">数据加载失败</div>
      <Button 
        variant="outline"
        onClick={() => mutate()}
      >
        重试
      </Button>
    </div>
  );
  if (isLoading) return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full bg-zinc-800 rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader className="sticky top-0 bg-zinc-900">
            <TableRow>
              {showFavoriteButton && <TableHead className="w-8"></TableHead>}
              <TableHead>Coin</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((coin) => (
              <TableRow 
                key={coin.symbol}
                className="cursor-pointer hover:bg-zinc-800/50"
                onClick={() => handleRowClick(coin.symbol)}
              >
                {showFavoriteButton && (
                  <TableCell className="w-8">
                    <FavoriteButton 
                      symbol={coin.symbol}
                    />
                  </TableCell>
                )}
                <TableCell>{coin.symbol}</TableCell>
                <TableCell>${coin.price}</TableCell>
                <TableCell className={
                  coin.change.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }>
                  {coin.change}
                </TableCell>
                <TableCell>${coin.volume}</TableCell>
                <TableCell>${coin.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {isLoadingMore && (
          <div className="sticky bottom-0 bg-zinc-900/80 backdrop-blur-sm py-4">
            <div className="flex items-center justify-center space-x-2 text-zinc-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>正在加载更多...</span>
            </div>
          </div>
        )}
        {isReachingEnd && (
          <div className="sticky bottom-0 bg-zinc-900/80 backdrop-blur-sm py-4 text-center text-zinc-400">
            没有更多数据了
          </div>
        )}
      </ScrollArea>
    </div>
  );
} 