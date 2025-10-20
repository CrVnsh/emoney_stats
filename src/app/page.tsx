'use client'
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/dashboardData  ', fetcher)

  const totalSupply = 400_000_000
  const circulatingSupply = data?.cs
  const totalStaked = data?.totalStaked

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📊 EMYC Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Supply" value={`${totalSupply.toLocaleString()} EMYC`} />
          <StatCard
            title="Circulating Supply"
            value={
              error
                ? 'Error fetching'
                : circulatingSupply
                ? `${circulatingSupply.toLocaleString()} EMYC`
                : 'Loading...'
            }
          />
          <StatCard title="Locked Tokens" value={
              error
                ? 'Error fetching'
                : totalStaked
                ? `${totalStaked.toLocaleString()} EMYC`
                : 'Loading...'
            } />
          <StatCard title="Average Lock Time" value="Coming Soon" />
          <StatCard title="Staking APY" value="Coming Soon" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  )
}
