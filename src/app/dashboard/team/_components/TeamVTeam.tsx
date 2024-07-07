'use client'
import useFetch from '@/lib/MatchData'
import { MatchType, MetricComparison, TeamPerformance, YearlyMetric } from '@/types/matchesTypes'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { calculateAvgRunsPerSeason, calculateMetricsComparison, calculateYearlyAvgRuns, calculateYearlyWickets, calculateYearlyWins, getUniqueTeams } from '@/lib/helper'
import { Button } from '@/components/ui/button'
import RadarC from './RadarC'
import BarC from './BarC'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
type Props = {}

function TeamVTeam({}: Props) {
  const {toast}=useToast()
    const [inputOne,setInputOne]=useState('')
    const [inputTwo,setInputTwo]=useState('')
    const [p1, setP1] =useState<MetricComparison[]>([])
    const [matchData, setMatchData] = useState<MatchType[]>([])
    const [yearlyRuns, setYearlyRuns]=useState<YearlyMetric[]>([])
    const[yearlyWins,setYearlyWins]=useState<YearlyMetric[]>([])
    const [yearlyWickets,setYearlyWickets]=useState<YearlyMetric[]>([])
    const [deliveriesData, setDeliveriesData] = useState<any[]>([])
    const { fetchCsvData } = useFetch();
  
    useEffect(() => {
        fetchCsvData('/matches.csv', setMatchData)
        // fetchCsvData('/deliveries.csv', setDeliveriesData)
    }, []);
    const uniqueTeams = getUniqueTeams(matchData);


    const handleTeam=()=>{
      if (!inputOne || !inputTwo) {
        toast({
          variant: "default",
          title: "SELECT BOTH PLAYERS",
          description:
            "Select both players from dropdown to see a detailed analysis of both",
        });
      }
        const TeamOnePerformance=calculateMetricsComparison(matchData, inputOne,inputTwo);
        const avgRuns= calculateYearlyAvgRuns(matchData,inputOne,inputTwo)
        const yW=calculateYearlyWins(matchData,inputOne,inputTwo)
        const yearlyWic=calculateYearlyWickets(matchData,inputOne,inputTwo)
        avgRuns && setYearlyRuns(avgRuns)
        TeamOnePerformance&& setP1(TeamOnePerformance)
        yW && setYearlyWins(yW)
        yearlyWic && setYearlyWickets(yearlyWic)
    }
    return (
        <div className='flex flex-col items-center mt-5 justify-around pb-20'>
            <p className='text-2xl md:tetx-4xl font-bold antialiased'>Lets see a Team <span className='text-[#7540A9]'>VS</span> Team analysis</p>
            <div className='flex flex-col md:flex-row gap-4 my-4'>
            <div>
                <Select onValueChange={setInputOne}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select the first theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueTeams?.map((item,index) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>
            <div>
                <Select onValueChange={setInputTwo}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue className='text-xs' placeholder="Select the second theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueTeams?.map((item,index) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleTeam} className='bg-[#7540A9]' >
                Get Results
            </Button>
            </div>
            {
              !inputOne && !inputTwo ?<div className='flex w-full items-center justify-center mt-10 '><p className='text-xl font-bold'>Enter atleast one team to view data</p></div>:            <div className='flex flex-col space-y-10 w-full '>

              <div className="w-full grid grid-cols-1 gap-4 xl:grid-cols-2">
              <Card>
            <CardHeader>
              <CardTitle>Overall Comparison</CardTitle>
              <CardDescription>By average</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarC data={p1} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Runs Per Match</CardTitle>
              <CardDescription>By each season</CardDescription>
            </CardHeader>
            <CardContent>
              <BarC data={yearlyRuns} />
            </CardContent>
          </Card>
              </div>
              <div className="w-full grid grid-cols-1 gap-4 xl:grid-cols-2">
              <Card>
            <CardHeader>
              <CardTitle>Team Wins</CardTitle>
              <CardDescription>By Season</CardDescription>
            </CardHeader>
            <CardContent>
              <BarC data={yearlyWins} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Wickets</CardTitle>
              <CardDescription>By each season</CardDescription>
            </CardHeader>
            <CardContent>
              <BarC data={yearlyWickets} />
            </CardContent>
          </Card>
              </div>
              </div>
            }



        </div>
    )
}

export default TeamVTeam


