import { getUniqueTeams } from '@/lib/helper';
import React from 'react'
import TeamVTeam from './_components/TeamVTeam';

type Props = {}

function page({matches}: any) {
  const uniqueTeams = getUniqueTeams(matches);
  return (
    <div className='w-full h-screen overflow-auto'>
      <TeamVTeam/>
    </div>
  )
}

export default page