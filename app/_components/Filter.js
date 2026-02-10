"use client"

// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url"
import { usePathname, useSearchParams, useRouter } from "next/navigation"



function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
 const activeFilter = searchParams.get("capacity") ?? "all"
  function handleFilter(filter) {
    // console.log(filter);
    const params = new URLSearchParams(searchParams)
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })

  }
  return (
    <div className="border border-primary-800 flex">
    <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>all cabins</Button>
    <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>small cabins</Button>
    <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>medium cabins</Button>
    <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>large cabins</Button>
     
    </div>
  )
}
function Button({filter,handleFilter,activeFilter,children}){
 return <button
        onClick={() => handleFilter(filter)}
        className={`px-5 py-2 hover:bg-primary-800 ${activeFilter===filter?"bg-primary-800":""}`}>{children}</button>
}
export default Filter