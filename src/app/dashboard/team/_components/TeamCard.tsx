import { cn } from '@/lib/utils'
import { TeamInfo } from '@/types/matchesTypes'
import React from 'react'

type Props = {}

function TeamCard({data}: any) {
  const col=data?.color;
  return (
<div  className={cn(`h-20 cursor-pointer flex flex-col items-center bg-gradient-to-r from-[${col}] to-black bg-white shadow-xl rounded-lg md:flex-row`)}
style={{
  backgroundImage:`linear-gradient(to bottom right, ${data?.color}, #000000)`
}}
>
    <img className=" w-32 h-20 object-contain p-4 " src={data?.logo} alt=""/>
    <div className={`flex w-full items-center justify-center leading-normal`}>
        <h5 className="text-xl font-semibold tracking-tight text-white antialiased">{data?.name}</h5>
    </div>
</div>

  )
}

export default TeamCard