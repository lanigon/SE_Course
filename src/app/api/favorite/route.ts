import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export async function POST(req: Request) {
  const { userId, symbol, chain, action } = await req.json();

  if (!userId || !symbol) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // 添加CORS头
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET",
    "Content-Type": "application/json",
  };

  try {
    if (action === "favorite") {
      await prisma.favorite.create({
        data: { userId, symbol, chain },
      });
    } else {
      await prisma.favorite.deleteMany({
        where: { userId, symbol },
      });
    }
    return new NextResponse(JSON.stringify({ success: true }), { headers });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers,
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    // 获取收藏列表
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: { symbol: true },
    });

    // 获取代币详细信息
    const symbols = favorites.map((f) => f.symbol);
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const coinsResponse = await fetch(
      `${baseUrl}/api/binance?symbols=${symbols.join(",")}`
    );
    
    if (!coinsResponse.ok) {
      throw new Error('Failed to fetch coin data');
    }
    
    const coinsData = await coinsResponse.json();
    
    // 返回币安数据而不是原始收藏记录
    return NextResponse.json(coinsData);
  } catch (error) {
    console.error('Database Error:')
    console.error('Request URL:', req.url)
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
