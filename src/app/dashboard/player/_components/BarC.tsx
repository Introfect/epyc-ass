import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {}

function BarC({data}: any) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
    <BarChart 
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
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="player1" fill="#8377d0" radius={[5, 5, 0, 0]} />
      <Bar dataKey="player2" fill="#bfbaed" radius={[5, 5, 0, 0]} />
    </BarChart>
</ResponsiveContainer>
  )
}

export default BarC