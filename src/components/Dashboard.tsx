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
import { countMatchesPerSeason, countTossDecisionsPerTeam } from '@/lib/helper';

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
  console.log(matchData)
  return (
    <main className="flex flex-col h-screen overflow-y-auto rounded">
      <div className='w-full flex flex-col ml-6 justify-center items-center'>
        <h1 className=' text-4xl gap-6 tracking-wide antialiased font-light'>Welcome to your <span className='font-bold text-[#7540A9]'>Dashboard</span></h1>
        <p className='py-1 text-sm font-semibold'>Here is an overview of the analysis, explore for detailed analysis</p>
      </div>
      <DashboardHeader dataM={matchData}/>

    <div className="grid flex-1 gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
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
            <CardTitle>New Customers</CardTitle>
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
      </div>
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
