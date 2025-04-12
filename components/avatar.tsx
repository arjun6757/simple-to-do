import Image from "next/image";

export default function Avatar({
	image,
	/* eslint-disable @typescript-eslint/no-unused-vars */
	name,
	email
}: {
	image: string | null;
	name: string | null;
	email: string | null;
}) {
	return (
		<>
			{image ? (
				<Image
					className="rounded-full"
					referrerPolicy="no-referrer"
					src={image}
					alt="avatar"
					width={100}
					height={100}
				/>
			) : (
				<div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-br from-red-400 via-rose-500 to-pink-500 font-bold uppercase text-white">{email ? email.slice(0,1) : "?"}</div>
			)}
		</>
	);
}
