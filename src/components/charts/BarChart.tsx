'use client'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
type Props = {}

function BarCharts({data}: any) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
        <BarChart 
      data={data && data}
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
          <Bar dataKey="matches" fill="#8377d0" radius={[10, 10, 0, 0]}/>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarCharts