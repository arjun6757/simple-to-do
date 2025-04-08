import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { handleSignOut } from "@/app/login/actions";
import Image from "next/image";

export default async function Settings() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="w-xs sm:w-3xl mx-auto border rounded p-4 sm:p-2">
			<div className="flex flex-col items-center justify-center space-x-2 w-full">
				{user ? (
					<form
						action={handleSignOut}
						className="flex flex-col sm:flex-row gap-4 w-full items-center space-x-2"
					>
							{
								user.user_metadata?.avatar_url ? (

							<Image
								className="rounded-full"
								referrerPolicy="no-referrer"
								src={user ? user.user_metadata?.avatar_url : null}
								alt="avatar"
								width={200}
								height={200}
							/>
							) : (
							<div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-red-400 via-rose-500 to-pink-500"></div>
							)
						}
							<p className="text-xl sm:text-3xl">{user ? user.user_metadata.full_name : "username"}</p>
						<Button>Sign Out</Button>
					</form>
				) : (
					<Button asChild className="cursor-pointer">
						<Link href="/login">Sign In</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
