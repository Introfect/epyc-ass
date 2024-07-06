'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import useFetch from '@/lib/MatchData';
import React, { useEffect, useState } from 'react'
import BarC from './BarC';
import RadarC from '../../team/_components/RadarC';
import { compareBattingAverage, compareRunsScored, getUniquePlayerNames } from '@/lib/helper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { YearlyPlaterMetric } from '@/types/playerTypes';
import { useToast } from "@/components/ui/use-toast"
type Props = {}

function PlaverVSPlaver({}: Props) {
const {toast} =useToast()

    const { fetchCsvData } = useFetch();
    const [playerData,setPlayerData]=useState([])
    const [inputOne,setInputOne]=useState('')
    const [inputTwo,setInputTwo]=useState('')
    const [battingAvg, setBattingAvg]=useState<YearlyPlaterMetric[]>([])
    const uniquePlayer=getUniquePlayerNames(playerData)

    useEffect(() => {
        fetchCsvData('/cricket_data.csv', setPlayerData)
    }, []);
    const handlePlayer=()=>{
      if(!inputOne || !inputTwo){

        toast({
          variant:"default",
          title: "select both players",
          description: "Select both players from dropdown to continue",
        })
      }
        const btAvg= compareBattingAverage(playerData,inputOne,inputTwo)
        btAvg && setBattingAvg(btAvg)
        const runs=compareRunsScored(playerData,inputOne,inputTwo)

    }
  return (
            <div className='flex flex-col items-center mt-5 justify-around'>
            <p className='text-2xl md:tetx-4xl font-bold antialiased'>Lets see a Player <span className='text-[#7540A9]'>VS</span> Player analysis</p>
            <div className='flex flex-col md:flex-row gap-4 my-4'>
            <div>
                <Select onValueChange={setInputOne}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select the first theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniquePlayer?.map((item,index) => (
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
                        {uniquePlayer?.map((item,index) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handlePlayer} className='bg-[#7540A9]' >
                Get Results
            </Button>
            </div>
            <div className='flex flex-col space-y-10 w-full'>

            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
          <CardHeader>
            <CardTitle>Batting Average comparison</CardTitle>
            <CardDescription>By average</CardDescription>
          </CardHeader>
          <CardContent>
          <BarC data={battingAvg} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Runs Per Match</CardTitle>
            <CardDescription>By each season</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <BarC data={yearlyRuns} /> */}
          </CardContent>
        </Card>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
          <CardHeader>
            <CardTitle>Team Wins</CardTitle>
            <CardDescription>By Season</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <BarC data={yearlyWins} /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Wickets</CardTitle>
            <CardDescription>By each season</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <BarC data={yearlyWickets} /> */}
          </CardContent>
        </Card>
            </div>
            </div>


        </div>
  )
}

export default PlaverVSPlaver