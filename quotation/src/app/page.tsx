import Card from "./components/Card"

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-800">
      <div className="flex justify-around flex-wrap gap-2">
        <Card quotation="BTC-USD"></Card>
        <Card quotation="BTC-BRL"></Card>
        <Card quotation="USD-BRL"></Card>
        <Card quotation="CAD-BRL"></Card>
      </div>
    </main>

  )
}
