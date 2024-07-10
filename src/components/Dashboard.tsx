"use client";
import { useEffect, useState } from "react";
import useFetch from "@/lib/MatchData";
import { MatchType, MatchesPerSeason } from "@/types/matchesTypes";
import BarCharts from "./charts/BarChart";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DoubleBarChart from "./charts/DoubleBarChart";
import DashboardHeader from "./DashboardHeader";
import {
  calculateTeamStats,
  countMatchesAndSuperOvers,
  countMatchesPerSeason,
  countTossDecisionsPerTeam,
} from "@/lib/helper";

const Dashboard = () => {
  const [matchData, setMatchData] = useState<MatchType[]>([]);
  const [deliveriesData, setDeliveriesData] = useState<any[]>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData("/matches.csv", setMatchData);
    fetchCsvData("/deliveries.csv", setDeliveriesData);
  }, []);
  const seasonCount = countMatchesPerSeason(matchData);
  const tossDecisions = countTossDecisionsPerTeam(matchData);
  const matchWins = calculateTeamStats(matchData);
  const matchSuper = countMatchesAndSuperOvers(matchData);
  console.log(matchSuper);
  return (
    <main className="flex flex-col h-screen overflow-y-auto rounded">
      <div className="w-full flex flex-col ml-6 justify-center items-center">
        <h1 className="text-xl md:text-4xl gap-6 tracking-wide antialiased font-light">
          Welcome to your{" "}
          <span className="font-bold text-[#7540A9]">Dashboard</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 items-baseline">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Total Matches</CardTitle>
              <CardDescription>By each season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto w-full px-4 border-y-2">
                <table className="min-w-full bg-white text-sm">
                  <thead className="text-left">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                        Team
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                        Wins
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                        Loss
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                        Average Runs per match
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
                        Matches Played
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {matchWins &&
                      matchWins.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-4 text-md font-semibold text-black">
                              {item.team}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md text-green-900">
                              <span className="bg-emerald-500/30 px-2 rounded-full">
                                {item.wins}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md text-red-9;00">
                              <span className="bg-red-500/30 px-2 rounded-full">
                                {item.losses}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md text-gray-700">
                              {item.avgRunsPerMatch}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md text-gray-700">
                              {item.matchesPlayed}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <Card className="">
              <CardHeader>
                <CardTitle>Total Matches</CardTitle>
                <CardDescription>Since 2008</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {matchSuper.totalMatches}
                </div>
                <div className="text-sm text-muted-foreground"></div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle>Total Super Overs</CardTitle>
                <CardDescription>Since 2008</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {matchSuper.superOvers}
                </div>
                <div className="text-sm text-muted-foreground"></div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DashboardHeader dataM={matchData} />
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
              <CardTitle>Toss Desision By Teams</CardTitle>
              <CardDescription>By Team</CardDescription>
            </CardHeader>
            <CardContent>
              <DoubleBarChart data={tossDecisions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
