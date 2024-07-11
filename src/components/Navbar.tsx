'use client'
import Link from 'next/link'
import React from 'react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import clsx from 'clsx'
import { menuOptions } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react'
type Props = {}

function Navbar({}: Props) {
  const pathName=usePathname()
  return (
<nav className="h-screen overflow-scroll  justify-between flex items-center flex-col  gap-10 py-6 px-4 bg-white">
  
<Link
          className="flex font-bold text-xl flex-row text-black antialiased"
          href="/"
        >
          epyc.
        </Link>
      <div className="flex items-center justify-center flex-col gap-10 h-full">
       
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-8 w-8 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer',
                        {
                          'bg-[#EEE0FF]':
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName == menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
  
      </div>
    </nav>
  )
}

export default Navbar