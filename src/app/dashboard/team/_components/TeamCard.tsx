import { cn } from '@/lib/utils'
import { TeamInfo } from '@/types/matchesTypes'
import React from 'react'

type Props = {}

function TeamCard({data}: any) {
  return (

<div  className={cn(`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl]`)}
style={{
  backgroundColor:`${data?.color}`
}}
>
    <img className="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={data?.logo} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
    </div>
</div>

  )
}

export default TeamCard