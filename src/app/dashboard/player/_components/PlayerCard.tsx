import React from 'react'

type Props = {}

function PlayerCard({data}: any) {
  return (
    <div 
    style={{
        background:
          "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
      }}
    className='text-white flex justify-center w-56 py-1 rounded'>
        <p>
        {data}
        </p>
        </div>
  )
}

export default PlayerCard