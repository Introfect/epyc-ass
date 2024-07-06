"use client"
import { useEffect, useState } from 'react';
import useFetch from '@/lib/MatchData';
import { MatchType, MatchesPerSeason } from '@/types/matchesTypes'
import BarCharts from './charts/BarChart';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import DoubleBarChart from './charts/DoubleBarChart';
import DashboardHeader from './DashboardHeader';
import { calculateTeamStats, countMatchesPerSeason, countTossDecisionsPerTeam} from '@/lib/helper';

const Dashboard= () => {
  const [matchData, setMatchData] = useState<MatchType[]>([])
  const [deliveriesData, setDeliveriesData] = useState<any[]>([])
  const { fetchCsvData }  = useFetch();


  useEffect(() => {
    fetchCsvData('/matches.csv', setMatchData)
    fetchCsvData('/deliveries.csv', setDeliveriesData)
  }, []);
  const seasonCount = countMatchesPerSeason(matchData);
  const tossDecisions = countTossDecisionsPerTeam(matchData);
  const matchWins=calculateTeamStats(matchData)
  console.log(matchWins)
  return (
    <main className="flex flex-col h-screen overflow-y-auto rounded">
      <div className='w-full flex flex-col ml-6 justify-center items-center'>
        <h1 className='text-xl md:text-4xl gap-6 tracking-wide antialiased font-light'>Welcome to your <span className='font-bold text-[#7540A9]'>Dashboard</span></h1>
      </div>
      <div className='flex flex-col xl:flex-row w-full justify-around items-center'>
      {/* <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 max-w-max">
        <Card className=''>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$125,000</div>
            <div className="text-sm text-muted-foreground">+15% from previous period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Players</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">+10% from previous period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3.6%</div>
            <div className="text-sm text-muted-foreground">+0.5% from previous period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Order Value</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$85</div>
            <div className="text-sm text-muted-foreground">+$5 from previous period</div>
          </CardContent>
        </Card>
      </div> */}


<div className="overflow-x-auto w-full xl:w-1/2 px-4">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Team</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Wins</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Loss</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Average Runs per match</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Matches Played</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {
        matchWins && matchWins.map((item,index)=>{
          return(

      <tr key={index}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item.team}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.wins}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.losses}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.avgRunsPerMatch}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.matchesPlayed}</td>
      </tr>
          )
        })
      }

    </tbody>
  </table>
</div>

      <DashboardHeader dataM={matchData}/>
      </div>

    <div className="grid flex-1 gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Matches</CardTitle>
            <CardDescription>By each season</CardDescription>
          </CardHeader>
          <CardContent>
            <BarCharts data={seasonCount} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <DoubleBarChart data={tossDecisions} />
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[3/2]" />
          </CardContent>
        </Card> */}
      </div>
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <HeatmapChart className="aspect-[3/2]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Marketing Campaigns</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="aspect-[3/2]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Net Promoter Score</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="aspect-[3/2]" />
          </CardContent>
        </Card>
      </div> */}
    </div>
      </main>
 
  );
};


export default Dashboard
