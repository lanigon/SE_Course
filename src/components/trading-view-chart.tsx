"use client"

import { useEffect, useRef } from 'react'

let tvScriptLoadingPromise: Promise<void> | null = null

export default function TradingViewChart({ symbol = "BTCUSDT" }) {
  const onLoadScriptRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve as () => void
        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

    return () => {
      onLoadScriptRef.current = null
    }

    function createWidget() {
      if (document.getElementById('tradingview-widget') && 'TradingView' in window) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",

          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview-widget",
        })
      }
    }
  }, [symbol])

  return (
    <div className='h-[600px]' id='tradingview-widget' />
  )
} 