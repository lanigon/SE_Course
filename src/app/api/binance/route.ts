import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/24hr"
    );
    let filteredData = response.data;

    // 在现有过滤逻辑前添加symbols过滤
    const symbolsParam = searchParams.get("symbols");
    if (symbolsParam) {
      const symbols = symbolsParam.split(",");
      filteredData = filteredData.filter((item: any) =>
        symbols.includes(item.symbol.replace("USDT", "/USDT"))
      );
    }

    // 只保留USDT交易对
    filteredData = filteredData.filter((item: any) =>
      item.symbol.endsWith("USDT")
    );

    // 根据链过滤数据
    if (chain) {
      const chainFilters: Record<string, string[]> = {
        sol: [
          "SOL",
          "BONK",
          "JTO",
          "JUP",
          "RAY",
          "PYTH",
          "HNT",
          "STEP",
          "MNGO",
          "ORCA",
          "ATLAS",
          "POLIS",
          "SAMO",
          "COPE",
          "LIKE",
          "MEDIA",
          "OXY",
          "PORT",
        ],
        sui: [
          "SUI",
          "BUCK",
          "NAV",
          "CETUS",
          "TURBOS",
          "SUIA",
          "MOVE",
          "SCA",
          "SUISHI",
          "TOCEN",
          "SUIP",
          "SUIB",
          "XUI",
          "SSUI",
          "LAF",
          "SUIM",
          "SUDO",
          "SUILP",
        ],
        base: [
          "MEME",
          "TOSHI",
          "DEGEN",
          "BRETT",
          "BASED",
          "TYBG",
          "DRAK",
          "BRIUN",
          "BONSAI",
          "MOCHI",
          "CHILL",
          "NORMIE",
          "BOB",
          "BSX",
          "MODE",
          "AERO",
          "PRCL",
          "DMT",
        ],
      };
      const symbols = chainFilters[chain.toLowerCase()] || [];
      filteredData = filteredData.filter((item: any) =>
        symbols.some((symbol) => item.symbol.startsWith(symbol))
      );
    }

    // 在过滤逻辑中添加新币判断
    const newPairsFilter = (symbol: string) => {
      const newPairs = ["MEME", "BONK", "JTO", "DEGEN"]; // 示例新币列表
      return newPairs.some((pair) => symbol.startsWith(pair));
    };

    // 在返回数据前添加新币过滤
    if (searchParams.get("type") === "new") {
      filteredData = filteredData.filter((item: any) =>
        newPairsFilter(item.symbol)
      );
    }

    // 在现有过滤逻辑后添加分页逻辑
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 15;

    const start = (page - 1) * limit;
    const end = start + limit;
    filteredData = filteredData.slice(start, end);

    const formattedData = filteredData.map((item: any) => ({
      symbol: item.symbol.replace("USDT", "/USDT"),
      price: parseFloat(item.lastPrice).toFixed(2),
      change: `${parseFloat(item.priceChangePercent).toFixed(2)}%`,
      volume: `${(parseFloat(item.quoteVolume) / 1000000).toFixed(1)}M`,
      marketCap: "N/A", // 币安API不提供市值数据，需要其他数据源
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Binance" },
      { status: 500 }
    );
  }
}
