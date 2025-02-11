import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
    )
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
} 