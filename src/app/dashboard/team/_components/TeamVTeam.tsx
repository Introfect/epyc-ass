"use client";
import React, { useEffect, useState } from "react";
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

function TeamVTeam({matchData}: any) {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const uniqueTeams = getUniqueTeams(matchData);

    const TeamOnePerformance = calculateMetricsComparison(
      matchData,
      inputOne,
      inputTwo
    );
    const avgRuns = calculateYearlyAvgRuns(matchData, inputOne, inputTwo);
    const yW = calculateYearlyWins(matchData, inputOne, inputTwo);
    const yearlyWic = calculateYearlyWickets(matchData, inputOne, inputTwo);
  
  return (
    <div className="w-full h-full pb-20 grid grid-cols-5 gap-6">
      <div className="overflow-y-auto col-span-1">
        {uniqueTeams?.map((item, index) => {
          return (
            <div
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
            <RadarC data={TeamOnePerformance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Runs Per Match</CardTitle>
            <CardDescription>By each season</CardDescription>
          </CardHeader>
          <CardContent>
            <BarC data={avgRuns} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Wins</CardTitle>
            <CardDescription>By Season</CardDescription>
          </CardHeader>
          <CardContent>
            <BarC data={yW} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Wickets</CardTitle>
            <CardDescription>By each season</CardDescription>
          </CardHeader>
          <CardContent>
            <BarC data={yearlyWic} />
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
