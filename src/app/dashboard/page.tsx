import Dashboard from "@/components/Dashboard";
import useFetch from "@/lib/MatchData";

export default async function Home() {
  const {fetchCsvData}=useFetch()
  const matchData= await fetchCsvData('https://epyc-ass.vercel.app/matches.csv')
  // const deliveriesData=await fetchCsvData('https://epyc-ass.vercel.app/deliveries.csv')
  return (
<main className="px-4 py-2">
  <Dashboard matchData={matchData}/>
</main>
  );
}


