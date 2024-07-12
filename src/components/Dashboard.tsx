"use client";
import { useEffect, useState } from "react";
import useFetch from "@/lib/MatchData";
import { MatchType, MatchesPerSeason } from "@/types/matchesTypes";
import BarCharts from "./charts/BarChart";
import {motion} from "framer-motion"
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
  totalExtraRuns,
  totalWicketCount,
} from "@/lib/helper";

const Dashboard = () => {
  const [matchData, setMatchData] = useState<MatchType[]>([]);
  const [deliveriesData, setDeliveriesData] = useState<any[]>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData("/matches.csv", setMatchData);
    fetchCsvData("/deliveries.csv", setDeliveriesData);
  }, []);
  console.log(deliveriesData)
  const seasonCount = countMatchesPerSeason(matchData);
  const tossDecisions = countTossDecisionsPerTeam(matchData);
  const matchWins = calculateTeamStats(matchData);
  const matchSuper = countMatchesAndSuperOvers(matchData);
  const totalWickets= totalWicketCount(deliveriesData)
  const extra =totalExtraRuns(deliveriesData)
  return (
    <main className="flex flex-col h-screen overflow-y-auto rounded pb-20">
      <div className="w-full flex flex-col ml-6 justify-center items-center">
        <h1 className="text-xl md:text-4xl gap-6 text-white tracking-wide antialiased font-light p-2">
          Welcome to your{" "}
          <span className="font-bold text-[#7540A9]">Dashboard</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 items-baseline pb-10">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Total Matches</CardTitle>
              <CardDescription>By each season</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                initial={{
                  opacity:0,
                  x:"-100%"
                }}
                animate={{
                  opacity:100,
                  x:0
                }}
                transition={{
                  duration:0.5
                }}
              className="overflow-auto w-full px-4">
                <table className="min-w-full bg-transparent text-sm">
                  <thead className="text-left">
                    <tr>
                      <th className="whitespace-nowrap px-6 py-2 font-medium text-gray-100">
                        Team
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                        Wins
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                        Loss
                      </th>
                      <th className="whitespace-nowrap text-center py-2 font-medium text-gray-100">
                        Runs per match
                      </th>
                      <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-100">
                        Matches Played
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {matchWins &&
                      matchWins.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td 
                            className="whitespace-nowrap px-4  text-md font-semibold flex items-center">
                              <div
                                      style={{
                                        backgroundColor:item?.color,
                                     
                                      }}
                              className="w-2 h-2  rounded-full bg-green-500 mx-2"
                              />{item.team}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md text-white">
                              <span className="bg-emerald-500/30 px-2 rounded-full">
                                {item.wins}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-md ">
                              <span className="bg-red-500/30 px-2 rounded-full">
                                {item.losses}
                              </span>
                            </td>
                            <td className="whitespace-nowrap text-center px-4 py-4 text-md text-gray-300">
                              {item.avgRunsPerMatch}
                            </td>
                            <td className="whitespace-nowrap text-center px-4 py-4 text-md text-gray-300">
                              {item.matchesPlayed}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <DashboardHeader dataM={matchData} />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

            <Card className="">
              <CardHeader>
                <CardTitle>Total Wickets</CardTitle>
                <CardDescription>Since 2008</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {totalWickets}
                </div>
                <div className="text-sm text-muted-foreground"></div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle>Total Extra Runs</CardTitle>
                <CardDescription>Since 2008</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {extra}
                </div>
                <div className="text-sm text-muted-foreground"></div>
              </CardContent>
            </Card>
          </div>

      <div className="grid flex-1 gap-4 py-10">
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
