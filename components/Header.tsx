import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { createClient } from "@/utils/supabase/server";
import { handleSignOut } from "@/app/login/actions";
import Image from "next/image";

export default async function Header() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<Card className="py-3 border-none shadow-none w-full px-0 font-mono">
			<CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
				<ul className="flex gap-4">
					<li className="hover:underline underline-offset-4 cursor-pointer">
						<Link href={"/"}>Home</Link>
					</li>
					<li className="hover:underline underline-offset-4 cursor-pointer">
						<Link href={"/about"}>About</Link>
					</li>
					<li className="hover:underline underline-offset-4 cursor-pointer">
						<Link href={"/app"}>App</Link>
					</li>
				</ul>
				<div className="flex flex-1 items-center justify-end space-x-2">
					{user ? (
						<form
							action={handleSignOut}
							className="flex items-center space-x-2"
						>
							{/*<p>{user.email?.split("@")[0]}</p>*/}
							<div className="flex gap-2 items-center rounded-md px-2 py-1 bg-[#f0f0f0] font-sans">
								<Image
									referrerPolicy="no-referrer"
									src={user.user_metadata?.avatar_url}
									alt="avatar"
									width={30}
									height={30}
								/>
								<p>{user.user_metadata?.full_name}</p>
							</div>
							<Button>Sign Out</Button>
						</form>
					) : (
						<Button asChild className="cursor-pointer">
							<Link href="/login">Sign In</Link>
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
