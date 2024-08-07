import Sidebar from "@/components/sidebar/Sidebar"
const Page = () => {
  return (
    <main className='flex flex-row w-full min-h-screen'>
      <Sidebar />
      <div className='w-full h-screen overflow-y-auto p-4 flex flex-col items-center'>
      <h1>Team Page</h1>
      <a href="/" className="mt-12 hover:underline">back to home</a>
      </div>
    </main>
  )
}

export default Page