import { calculateAvgRunsPerSeason } from '@/lib/helper';
import { MatchType } from '@/types/matchesTypes';
import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

type Props = {}

function DashboardHeader({dataM}: any) {

      const avgRunsPerSeason = calculateAvgRunsPerSeason(dataM);
  return (
    <div className='flex justify-between w-full p-4 md:p-6'>
        <div>
            <h1>Here is an overview of the runs Score per match in different season</h1>
        </div>
        <div className='w-1/2'>
        <ResponsiveContainer width="100%" minHeight={300}>
        <BarChart 
        data={avgRunsPerSeason}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          >
              <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRuns" fill="#7540A9" />
        </BarChart>
    </ResponsiveContainer>
        </div>
     
        
    </div>
  )
}

export default DashboardHeader