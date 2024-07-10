import { calculateAvgRunsPerSeason } from '@/lib/helper';
import { MatchType } from '@/types/matchesTypes';
import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line, AreaChart, Area } from 'recharts';
import { CardHeader, CardTitle, CardDescription, CardContent,Card } from './ui/card';

type Props = {}

function DashboardHeader({dataM}: any) {

      const avgRunsPerSeason = calculateAvgRunsPerSeason(dataM);
  return (
        <Card>
          <CardHeader>
            <CardTitle>Average runs per season</CardTitle>
            <CardDescription>A detaild analysis of the average runs scored in each season per match</CardDescription>
          </CardHeader>
          <CardContent>
                  <ResponsiveContainer width="100%" minHeight={300}>
           <AreaChart
          width={500}
          height={400}
          data={avgRunsPerSeason}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="avgRuns" fill="#AEAEE4" stroke="#000080" activeDot={{ r: 8 }} />
        </AreaChart>
    </ResponsiveContainer>
            
          </CardContent>
        </Card>
  )
}

export default DashboardHeader