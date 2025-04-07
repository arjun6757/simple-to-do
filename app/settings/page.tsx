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
		<div className="w-xs sm:w-3xl mx-auto border rounded p-2">
			<div className="flex flex-col items-center justify-center space-x-2 w-full">
				{user ? (
					<form
						action={handleSignOut}
						className="flex flex-col sm:flex-row gap-4 w-full items-center space-x-2"
					>
							<Image
								className="rounded-full"
								referrerPolicy="no-referrer"
								src={user.user_metadata?.avatar_url}
								alt="avatar"
								width={200}
								height={200}
							/>
							<p className="text-xl sm:text-3xl">{user.user_metadata?.full_name}</p>
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
