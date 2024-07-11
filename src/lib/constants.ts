import Category from '@/components/icons/category'
import Logs from '@/components/icons/clipboard'
import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'
import { TeamInfo } from '@/types/matchesTypes'

export const menuOptions = [
    { name: 'Home', Component: Home, href:'/dashboard' },
    { name: 'Team', Component: Workflows, href:'/dashboard/team' },
    { name: 'Plaver', Component: Settings, href:'/dashboard/player' },
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
      color: "#D53811"
    },
    "Chennai Super Kings": {
      name: "Chennai Super Kings",
      logo: "/team_logo/csk.png",
      color: "#F1D402"
    },
    "Delhi Daredevils": {
      name: "Delhi Daredevils",
      logo: "/team_logo/dd.png",
      color: "#F17D02"
    },
    "Rajasthan Royals": {
      name: "Rajasthan Royals",
      logo: "/team_logo/rr.png",
      color: "#E72A8E"
    },
    "Mumbai Indians": {
      name: "Mumbai Indians",
      logo: "/team_logo/mumbai.png",
      color: "#1E4EBD"
    },
    "Deccan Chargers": {
      name: "Deccan Chargers",
      logo: "/team_logo/deccan.png",
      color: "#F1F1F1"
    },
    "Kochi Tuskers Kerala": {
      name: "Kochi Tuskers Kerala",
      logo: "/team_logo/kochi.png",
      color: "#B363DE"
    },
    "Pune Warriors": {
      name: "Pune Warriors",
      logo: "/team_logo/pune.png",
      color: "#00A859"
    },
    "Sunrisers Hyderabad": {
      name: "Sunrisers Hyderabad",
      logo: "/team_logo/srh.png",
      color: "#FD3B0F"
    },
    "Gujarat Lions": {
      name: "Gujarat Lions",
      logo: "/team_logo/gujl.png",
      color: "#C2B704"
    },
    "Rising Pune Supergiant": {
      name: "Rising Pune Supergiant",
      logo: "/team_logo/rps.png",
      color: "#76090C"
    },
    "Delhi Capitals": {
      name: "Delhi Capitals",
      logo: "/team_logo/dc.png",
      color: "#4C47F8"
    },
    "Punjab Kings": {
      name: "Punjab Kings",
      logo: "/team_logo/punjab.png",
      color: "#FF3A00"
    },
    "Lucknow Super Giants": {
      name: "Lucknow Super Giants",
      logo: "/team_logo/lucksupg.png",
      color: "#3235EC"
    },
    "Gujarat Titans": {
      name: "Gujarat Titans",
      logo: "/team_logo/gt.png",
      color: "#4235C4"
    },
  };