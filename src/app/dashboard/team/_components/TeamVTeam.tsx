"use client";
import useFetch from "@/lib/MatchData";
import {
  MatchType,
  MetricComparison,
  TeamPerformance,
  YearlyMetric,
} from "@/types/matchesTypes";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateAvgRunsPerSeason,
  calculateMetricsComparison,
  calculateYearlyAvgRuns,
  calculateYearlyWickets,
  calculateYearlyWins,
  getUniqueTeams,
} from "@/lib/helper";
import { Button } from "@/components/ui/button";
import RadarC from "./RadarC";
import BarC from "./BarC";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import TeamCard from "./TeamCard";
type Props = {};

function TeamVTeam({}: Props) {
  const { toast } = useToast();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [p1, setP1] = useState<MetricComparison[]>([]);
  const [matchData, setMatchData] = useState<MatchType[]>([]);
  const [yearlyRuns, setYearlyRuns] = useState<YearlyMetric[]>([]);
  const [yearlyWins, setYearlyWins] = useState<YearlyMetric[]>([]);
  const [yearlyWickets, setYearlyWickets] = useState<YearlyMetric[]>([]);
  const [deliveriesData, setDeliveriesData] = useState<any[]>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData("/matches.csv", setMatchData);
    // fetchCsvData('/deliveries.csv', setDeliveriesData)
  }, []);
  const uniqueTeams = getUniqueTeams(matchData);

  const handleTeam = () => {
    if (!inputOne || !inputTwo) {
      toast({
        variant: "default",
        title: "SELECT BOTH PLAYERS",
        description:
          "Select both players from dropdown to see a detailed analysis of both",
      });
    }
    const TeamOnePerformance = calculateMetricsComparison(
      matchData,
      inputOne,
      inputTwo
    );
    const avgRuns = calculateYearlyAvgRuns(matchData, inputOne, inputTwo);
    const yW = calculateYearlyWins(matchData, inputOne, inputTwo);
    const yearlyWic = calculateYearlyWickets(matchData, inputOne, inputTwo);
    avgRuns && setYearlyRuns(avgRuns);
    TeamOnePerformance && setP1(TeamOnePerformance);
    yW && setYearlyWins(yW);
    yearlyWic && setYearlyWickets(yearlyWic);
  };
  useEffect(() => {
    if (!inputOne || !inputTwo) {
      toast({
        variant: "default",
        title: "SELECT BOTH PLAYERS",
        description:
          "Select both players from dropdown to see a detailed analysis of both",
      });
    }
    const TeamOnePerformance = calculateMetricsComparison(
      matchData,
      inputOne,
      inputTwo
    );
    const avgRuns = calculateYearlyAvgRuns(matchData, inputOne, inputTwo);
    const yW = calculateYearlyWins(matchData, inputOne, inputTwo);
    const yearlyWic = calculateYearlyWickets(matchData, inputOne, inputTwo);
    avgRuns && setYearlyRuns(avgRuns);
    TeamOnePerformance && setP1(TeamOnePerformance);
    yW && setYearlyWins(yW);
    yearlyWic && setYearlyWickets(yearlyWic);
  }, [inputOne, inputTwo]);
  return (
    <div className="w-full h-full pb-20 grid grid-cols-5 gap-6">
      <div className="overflow-y-auto col-span-1">
        {uniqueTeams?.map((item, index) => {
          return (
            <div
              className={`cursor-pointer`}
              onClick={() => setInputOne(item?.name)}
              key={index}
            >
              <TeamCard data={item} />;
            </div>
          );
        })}
      </div>
      <div className=" col-span-3 w-full grid grid-cols-1 gap-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Overall a Comparison</CardTitle>
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
        {/* hb */}

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
      <div className="overflow-y-auto col-span-1">
        {uniqueTeams?.map((item, index) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => setInputTwo(item?.name)}
              key={index}
            >
              <TeamCard data={item} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamVTeam;
