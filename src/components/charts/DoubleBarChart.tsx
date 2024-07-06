import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {}

function DoubleBarChart({data}:any) {
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
      <XAxis dataKey="team" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="bat" fill="#7540A9" />
      <Bar dataKey="bowl" fill="#1CCB5B" />
    </BarChart>
</ResponsiveContainer>
  )
}

export default DoubleBarChart