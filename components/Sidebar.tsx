"use client";
import {
	ChartBar,
	CreditCard,
	Home,
	LogIn,
	LogOutIcon,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "./avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { handleSignOut } from "@/app/(auth)/login/actions";

export default function Sidebar({
	image,
	name,
	email,
}: {
	image: string | null;
	name: string | null;
	email: string | null;
}) {
	const path = usePathname();
	const router = useRouter();

	return (
		<nav className="fixed bottom-0 sm:left-0 w-full bg-white sm:w-14 h-14 sm:h-full border-t sm:border-t-0 sm:border-r border-[#ddd] flex sm:flex-col sm:justify-between">
			<ul
				className="flex flex-row sm:flex-col gap-0 sm:gap-4 justify-around sm:justify-start items-center sm:mt-6 p-2
			sm:p-0 w-full h-full sm:w-auto sm:h-auto"
			>
				<li>
					<Link
						data-active={path === "/app"}
						href="/app"
						className="data-[active=true]:bg-[#f0f0f0] data-[active=false]:hover:bg-gray-50 inline-flex items-center sm:block p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
					>
						<Home className="w-5 h-5 mx-auto sm:mx-0 text-inherit focus:outline-none" />
					</Link>
				</li>

				<li>
					<Link
						data-active={path === "/stats"}
						href="/stats"
						className="inline-flex items-center sm:block p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md data-[active=true]:bg-[#f0f0f0] data-[active=false]:hover:bg-gray-50"
					>
						<ChartBar className="w-5 h-5 mx-auto sm:mx-0 text-inherit focus:outline-none" />
					</Link>
				</li>

				<li>
					<Link
						data-active={path === "/settings"}
						href="/settings"
						className="inline-flex items-center sm:block p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md data-[active=true]:bg-[#f0f0f0] data-[active=false]:hover:bg-gray-50"
					>
						<Settings className="w-full h-full mx-auto sm:mx-0 text-inherit focus:outline-none" />
					</Link>
				</li>

				<li className="sm:absolute sm:bottom-16">
					<DropdownMenu>
						<DropdownMenuTrigger className="outline-gray-400 dark:outline-blue-500 outline-offset-2 text-gray-800 dark:text-gray-300 hover:opacity-90 dark:hover:bg-neutral-900 rounded-full cursor-pointer focus:outline-2 flex items-center">
							<Avatar image={image} name={name} email={email} />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							sideOffset={4}
							className={
								"w-[14rem] font-sans mr-4 sm:mr-0 sm:ml-4 mb-6 sm:mb-2 drop-shadow-xs"
							}
						>
							<DropdownMenuLabel>
								{email ?? "My Account"}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<CreditCard />
								Billing
							</DropdownMenuItem>
							{email ? (
								<DropdownMenuItem
									onClick={async () => {
										await handleSignOut(); //server
									}}
								>
									<LogOutIcon />
									Log out
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									onClick={() => router.push("/login")}
								>
									<LogIn />
									Log in
								</DropdownMenuItem>
							)}

							<DropdownMenuSeparator />

							<DropdownMenuLabel className="text-gray-500 dark:text-neutral-400">
								Preferences
							</DropdownMenuLabel>
							<DropdownMenuItem>Theme</DropdownMenuItem>
							<DropdownMenuItem>Language</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</li>
			</ul>
		</nav>
	);
}
