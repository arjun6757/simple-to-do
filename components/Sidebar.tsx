"use client";
import { Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

	const path = usePathname()

	return (
		<nav className="sm:static fixed bottom-0 w-full sm:w-14 h-14 sm:h-full bg-gray-50 border border-[#ddd]">
			<ul className="flex flex-row sm:flex-col gap-0 sm:gap-4 justify-around sm:justify-start items-center sm:mt-6 p-2
			sm:p-0 w-full h-full sm:w-auto sm:h-auto">
				<li
					className={`w-1/2 sm:w-auto cursor-pointer sm:hover:bg-gray-200/60 p-2 rounded-md ${path==="/app" ? 'bg-gray-200/70' : ''} `}
				>
					<Link href="/app">
						<Home className="w-6 h-6 mx-auto sm:mx-0 text-gray-700" />
					</Link>
				</li>

				<li
					className={`w-1/2 sm:w-auto cursor-pointer sm:hover:bg-gray-200/60 p-2 rounded-md ${path==="/settings" ? 'bg-gray-200/70' : ''}`}
				>
					<Link href="/settings">
						<Settings className="w-6 h-6 mx-auto sm:mx-0 text-gray-700" />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
