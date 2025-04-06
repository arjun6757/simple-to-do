import Link from "next/link";

export default async function Index() {
  return (
    <section className="w-xs mx-auto sm:mx-0 sm:w-full h-full flex justify-center items-center">
      <div className="font-sans flex flex-col gap-2 justify-center">
        <h1 className="text-3xl sm:text-4xl">
          Simply store all your
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}
            precious notes{" "}
          </span>
          in one place.
        </h1>
        <p className="w-fit mx-auto text-gray-500 mb-5">
          One app to use both traditional and modern approach for entering flow
          state and staying organized.
        </p>
        <Link href="/app" className="rounded w-[11em] mx-auto mt-2 group relative z-[1] h-[2.7em] cursor-pointer overflow-hidden bg-white border border-[#ddd] text-black transition-transform duration-800 focus:outline-2 focus:outline-offset-2">
          <span className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 select-none group-hover:text-white outline-gray-600">
            Get Started
          </span>
          <div className="z-[1] h-full w-full bg-purple-500 transition-transform duration-300 not-hover:-translate-x-full not-hover:ease-out group-hover:translate-x-0 group-hover:ease-in"></div>
        </Link>
      </div>
    </section>
  );
}

