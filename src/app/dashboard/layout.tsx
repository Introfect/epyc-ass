import Navbar from "@/components/Navbar"

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Navbar />
      <div className="w-full">
      <div className="flex flex-col gap-4 relative backdrop-blur-lg ">
      <h1 className="font-bold sticky top-0 p-6 justify-center flex items-center">
        Dashboard
      </h1>
    </div>
        {props.children}
      </div>
    </div>
  )
}

export default Layout