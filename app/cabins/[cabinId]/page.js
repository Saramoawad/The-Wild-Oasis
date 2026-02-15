import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";

// dynamic metadata

export async function generateMetadata({ params }) {
    const cabin = await getCabin(params.cabinId)
    const { name } = cabin
    return {
        title: `Cabin ${name}`,
    }
}
// to make it static rendering

export async function generateStaticParams() {
    const cabins = await getCabins()
    const ids = cabins.map(cabin => ({ cabinId: cabin.id.toString() }))
    console.log(ids)
    return ids
}

export default async function Page({ params }) {
    // v1 this aproach is not the best for performance it will block the code until all the data is loaded
    const cabin = await getCabin(params.cabinId)
    // const settings= await getSettings()
    //  const bookedDates= await getBookedDatesByCabinId(params.cabinId)
    // v2 this aproach is better for performance it will load the data as soon as possible
    // const [cabin, settings, bookedDates] = await Promise.all([
    //     getCabin(params.cabinId),
    //     getSettings(),
    //     getBookedDatesByCabinId(params.cabinId),
    // ])
    

    return (
        <div className="max-w-6xl mx-auto mt-8">
           <Cabin cabin={cabin}/>
            <div>
                <h2 className="text-5xl font-semibold text-center">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner/>}>

                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
