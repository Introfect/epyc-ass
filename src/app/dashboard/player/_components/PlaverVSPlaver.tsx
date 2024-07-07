"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import useFetch from "@/lib/MatchData";
import React, { useEffect, useState } from "react";
import LineC from "./LineC";
import RadarC from "../../team/_components/RadarC";
import {
  compareBattingAverage,
  compareBattingStrikeRate,
  compareRunsScored,
  compareWicketsTaken,
  getTopRunScorers,
  getUniquePlayerNames,
} from "@/lib/helper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { YearlyPlaterMetric } from "@/types/playerTypes";
import { useToast } from "@/components/ui/use-toast";
import BarC from "./BarC";
type Props = {};

function PlaverVSPlaver({}: Props) {
  const { toast } = useToast();

  const { fetchCsvData } = useFetch();
  const [playerData, setPlayerData] = useState([]);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [battingAvg, setBattingAvg] = useState<YearlyPlaterMetric[]>([]);
  const [runsScored, setRunsScored] = useState<YearlyPlaterMetric[]>([]);
  const [wicketsTaken, setWicketsTaken] = useState<YearlyPlaterMetric[]>([]);
  const [strikeRate, setStrikeRate] = useState<YearlyPlaterMetric[]>([]);
  const uniquePlayer = getUniquePlayerNames(playerData);

  useEffect(() => {
    fetchCsvData("/cricket_data.csv", setPlayerData);
  }, []);
  const handlePlayer = () => {
    if (!inputOne || !inputTwo) {
      toast({
        variant: "default",
        title: "SELECT BOTH PLAYERS",
        description:
          "Select both players from dropdown to see a detailed analysis of both",
      });
    }
    const btAvg = compareBattingAverage(playerData, inputOne, inputTwo);
    btAvg && setBattingAvg(btAvg);
    const runs = compareRunsScored(playerData, inputOne, inputTwo);
    runs && setRunsScored(runs);
    const wickets = compareWicketsTaken(playerData, inputOne, inputTwo);
    wickets && setWicketsTaken(wickets);
    const strike = compareBattingStrikeRate(playerData, inputOne, inputTwo);
    strike && setStrikeRate(strike);
    const topBat=getTopRunScorers(playerData)
    console.log(topBat)
  };
  return (
    <div className="flex flex-col items-center mt-5 justify-around pb-20">
      <p className="text-2xl md:tetx-4xl font-bold antialiased">
        Lets see a Player <span className="text-[#7540A9]">VS</span> Player
        analysis
      </p>
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div>
          <Select onValueChange={setInputOne}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select the first theme" />
            </SelectTrigger>
            <SelectContent>
              {uniquePlayer?.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={setInputTwo}>
            <SelectTrigger className="w-[200px]">
              <SelectValue
                className="text-xs"
                placeholder="Select the second theme"
              />
            </SelectTrigger>
            <SelectContent>
              {uniquePlayer?.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handlePlayer} className="bg-[#7540A9]">
          Get Results
        </Button>
      </div>
      {!inputOne && !inputTwo ? (
        <div className="mt-10 flex items-center justify-center w-full">
       <h1 className="font-bold text-xl">Enter atleast one players to view data</h1>
        </div>
      ) : (
        <div className="flex flex-col space-y-10 w-full">
          <div className="w-full grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Batting Average comparison</CardTitle>
                <CardDescription>By average</CardDescription>
              </CardHeader>
              <CardContent>
                <LineC data={battingAvg} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Runs Scored</CardTitle>
                <CardDescription>By each season</CardDescription>
              </CardHeader>
              <CardContent>
                <BarC data={runsScored} />
              </CardContent>
            </Card>
          </div>
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Wickets Taken</CardTitle>
                <CardDescription>By Season</CardDescription>
              </CardHeader>
              <CardContent>
                <BarC data={wicketsTaken} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Team Wickets</CardTitle>
                <CardDescription>By each season</CardDescription>
              </CardHeader>
              <CardContent>
                <LineC data={strikeRate} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaverVSPlaver;
