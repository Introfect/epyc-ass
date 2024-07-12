import React from 'react'
import PlaverVSPlaver from './_components/PlaverVSPlaver'
import useFetch from '@/lib/MatchData'

type Props = {}

export default async function page({}: Props) {
  const {fetchCsvData}=useFetch()
  const playerData= await fetchCsvData('https://epyc-ass.vercel.app/cricket_data.csv')
  return (
    <div className='w-full h-screen overflow-auto px-4 py-2'>
      <PlaverVSPlaver/>
    </div>
  )
}
