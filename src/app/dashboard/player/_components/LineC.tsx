import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {}

function LineC({data}: any) {
  return (
    <ResponsiveContainer width="100%" minHeight={400}>
     <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="player1" stroke="#8377d0" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="player2" stroke="#bfbaed" />
        </LineChart>
</ResponsiveContainer>
  )
}

export default LineC