
import React from 'react'
import TeamVTeam from './_components/TeamVTeam';
import useFetch from '@/lib/MatchData';

type Props = {}

export default async function page() {
  const {fetchCsvData}=useFetch()
  const matchData= await fetchCsvData('https://epyc-ass.vercel.app/matches.csv')
  return (
    <div className='w-full h-screen overflow-auto px-4 py-2'>
      <TeamVTeam matchData={matchData}/>
    </div>
  )
}

