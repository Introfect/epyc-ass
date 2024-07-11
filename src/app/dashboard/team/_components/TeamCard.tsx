import { cn } from '@/lib/utils'
import { TeamInfo } from '@/types/matchesTypes'
import React from 'react'

type Props = {}

function TeamCard({data}: any) {
  const col=data?.color;
  return (
<div  className={cn(`h-20 cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-[${col}] to-black bg-white shadow-xl rounded-lg md:flex-row`)}
    style={{
      background:
        `linear-gradient(360deg, var(--slate-700), var(--slate-900)`,
    }}
>
    <img className=" w-32 h-20 object-contain p-4 " src={data?.logo} alt="logo"/>
    <div className={`hidden xl:flex w-full items-center justify-center leading-normal`}>
        <h5 className="text-md font-semibold tracking-tight text-white antialiased">{data?.name}</h5>
    </div>
</div>

  )
}

export default TeamCard