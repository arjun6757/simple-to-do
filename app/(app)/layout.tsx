// layout for rest of the app

import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-screen sm:w-[calc(100vw-56px)] sm:ml-14 h-[calc(100dvh-56px)] mb-14 sm:mb-0 sm:h-dvh flex flex-col-reverse sm:flex-row justify-center items-center">
      <Sidebar />
      {children}
    </main>
  );
}

//  sm:ml-[56px] mb-[56px] sm:mb-0 sm:w-[calc(100vw-56px)]
