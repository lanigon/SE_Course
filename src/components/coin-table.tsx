"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import FavoriteButton from "./favorite-button";

interface Coin {
  symbol: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
}

interface CoinTableProps {
  data?: Coin[];
  onRowClick?: (symbol: string) => void;
  showFavoriteButton?: boolean;
}

// 默认数据
const defaultCoins = [
  { symbol: "BTC/USDT", price: "61,234.56", change: "+2.5%", volume: "25B", marketCap: "1.2T" },
  { symbol: "ETH/USDT", price: "3,234.56", change: "+1.5%", volume: "15B", marketCap: "380B" },
  { symbol: "SOL/USDT", price: "123.45", change: "-0.5%", volume: "5B", marketCap: "50B" },
];

export default function CoinTable({ 
  data = defaultCoins,
  onRowClick,
  showFavoriteButton = false
}: CoinTableProps) {
  const router = useRouter();

  const handleRowClick = (symbol: string) => {
    if (onRowClick) {
      onRowClick(symbol);
    } else {
      const formattedSymbol = symbol.toLowerCase().replace('/', '-');
      router.push(`/trading/${formattedSymbol}`);
    }
  };

  const handleFavoriteToggle = (symbol: string, favorited: boolean) => {
    // 这里可以添加收藏逻辑，比如保存到本地存储或发送到服务器
    console.log(`Toggle favorite for ${symbol}: ${favorited}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
          {data.map((coin) => (
            <TableRow 
              key={coin.symbol}
              className="cursor-pointer hover:bg-zinc-800/50"
              onClick={() => handleRowClick(coin.symbol)}
            >
              {showFavoriteButton && (
                <TableCell className="w-8">
                  <FavoriteButton 
                    symbol={coin.symbol}
                    onToggle={handleFavoriteToggle}
                  />
                </TableCell>
              )}
              <TableCell>{coin.symbol}</TableCell>
              <TableCell>${coin.price}</TableCell>
              <TableCell className={coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {coin.change}
              </TableCell>
              <TableCell>${coin.volume}</TableCell>
              <TableCell>${coin.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 