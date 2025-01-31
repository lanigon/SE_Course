import CoinTable from "@/components/coin-table"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Overview</h1>
      <CoinTable />
    </div>
  )
}
