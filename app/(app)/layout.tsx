// layout for rest of the app

import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function AppLayout({
  children,
}: { children: React.ReactNode }) {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  type avatar = {
    image : string | null,
    name: string | null,
    email: string | null
  }

  const sidebarProps : avatar = {
    image: user ? user?.user_metadata?.avatar_url as string : null,
    name: user ? user?.user_metadata.full_name as string : null,
    email: user ? user.email as string : null,
  }

  return (
    <main className="w-screen sm:w-[calc(100vw-56px)] sm:ml-14 h-[calc(100dvh-56px)] mb-14 sm:mb-0 sm:h-dvh">
      <Sidebar
        {...sidebarProps}
       />
      {children}
    </main>
  );
}

//  sm:ml-[56px] mb-[56px] sm:mb-0 sm:w-[calc(100vw-56px)]
