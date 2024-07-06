import React from 'react'
import PlaverVSPlaver from './_components/PlaverVSPlaver'

type Props = {}

function page({}: Props) {
  return (
    <div className='w-full h-screen overflow-auto px-4 py-2'>
      <PlaverVSPlaver/>
    </div>
  )
}

export default page