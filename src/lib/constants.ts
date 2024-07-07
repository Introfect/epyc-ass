import Category from '@/components/icons/category'
import Logs from '@/components/icons/clipboard'
import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'

export const menuOptions = [
    { name: 'Home', Component: Home, href: '/dashboard' },
    { name: 'Team', Component: Workflows, href: '/dashboard/team' },
    { name: 'Plaver', Component: Settings, href: '/dashboard/player' },
  ]