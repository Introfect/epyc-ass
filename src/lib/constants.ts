import Category from '@/components/icons/category'
import Logs from '@/components/icons/clipboard'
import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'
import { TeamInfo } from '@/types/matchesTypes'

export const menuOptions = [
    { name: 'Home', Component: Home, href: '/dashboard' },
    { name: 'Team', Component: Workflows, href: '/dashboard/team' },
    { name: 'Plaver', Component: Settings, href: '/dashboard/player' },
  ]


  export const teamData: { [key: string]: TeamInfo } = {
    "Royal Challengers Bangalore": {
      name: "Royal Challengers Bangalore",
      logo: "/team_logo/rcb.png",
      color: "#FF0000"
    },
    "Kolkata Knight Riders": {
      name: "Kolkata Knight Riders",
      logo: "/team_logo/kkr.png",
      color: "#3C0C6C"
    },
    "Kings XI Punjab": {
      name: "Kings XI Punjab",
      logo: "/team_logo/punjab.png",
      color: "#174EA6"
    },
    "Chennai Super Kings": {
      name: "Chennai Super Kings",
      logo: "/team_logo/csk.png",
      color: "#00A859"
    },
    "Delhi Daredevils": {
      name: "Delhi Daredevils",
      logo: "/team_logo/dd.png",
      color: "#00A859"
    },
    "Rajasthan Royals": {
      name: "Rajasthan Royals",
      logo: "/team_logo/rr.png",
      color: "#00A859"
    },
    "Mumbai Indians": {
      name: "Mumbai Indians",
      logo: "/team_logo/mumbai.png",
      color: "#00A859"
    },
    "Deccan Chargers": {
      name: "Deccan Chargers",
      logo: "/team_logo/deccan.png",
      color: "#00A859"
    },
    "Kochi Tuskers Kerala": {
      name: "Kochi Tuskers Kerala",
      logo: "/team_logo/kochi.png",
      color: "#00A859"
    },
    "Pune Warriors": {
      name: "Pune Warriors",
      logo: "/team_logo/pune_warriors.png",
      color: "#00A859"
    },
    "Sunrisers Hyderabad": {
      name: "Sunrisers Hyderabad",
      logo: "/team_logo/srh.png",
      color: "#00A859"
    },
    "Rising Pune Supergiants": {
      name: "Rising Pune Supergiants",
      logo: "/team_logo/rps.png",
      color: "#00A859"
    },
    "Gujarat Lions": {
      name: "Gujarat Lions",
      logo: "/team_logo/gujl.png",
      color: "#00A859"
    },
    "Rising Pune Supergiant": {
      name: "Rising Pune Supergiant",
      logo: "/team_logo/rps.png",
      color: "#00A859"
    },
    "Delhi Capitals": {
      name: "Delhi Capitals",
      logo: "/team_logo/dc.png",
      color: "#00A859"
    },
    "Punjab Kings": {
      name: "Punjab Kings",
      logo: "/team_logo/punjab.png",
      color: "#00A859"
    },
    "Lucknow Super Giants": {
      name: "Lucknow Super Giants",
      logo: "/team_logo/lucksupg.png",
      color: "#00A859"
    },
    "Gujarat Titans": {
      name: "Gujarat Titans",
      logo: "/team_logo/gt.png",
      color: "#00A859"
    },
    "Royal Challengers Bengaluru": {
      name: "Royal Challengers Bengaluru",
      logo: "/team_logo/rcb.png",
      color: "#00A859"
    },
  };