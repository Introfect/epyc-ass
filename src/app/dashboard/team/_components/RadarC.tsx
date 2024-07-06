
import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type Props = {}

function RadarC({data}: any) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="metric" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey='teamA' stroke="#8377d0" fill="#8377d0" fillOpacity={0.6} />
      <Radar name="Lily" dataKey="teamB" stroke="#bfbaed" fill="#bfbaed" fillOpacity={0.7} />
    </RadarChart>
  </ResponsiveContainer>
  )
}

export default RadarC