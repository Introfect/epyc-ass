
import React from 'react'
import TeamVTeam from './_components/TeamVTeam';

type Props = {}

function page({matches}: any) {
  return (
    <div className='w-full h-screen overflow-auto px-4 py-2'>
      <TeamVTeam/>
    </div>
  )
}

export default page