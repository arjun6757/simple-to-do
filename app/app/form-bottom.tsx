"use client";

import { Send } from "lucide-react";
import { addTask } from "./actions";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function FormBottom() {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={formRef}
			action={async (data) => {
				await addTask(data);
				formRef.current?.reset();
			}}
			className="w-full flex gap-2"
		>
			<input
				name="task"
				placeholder="Type here to add a task..."
				className="w-full pl-3 rounded border border-[#ddd] outline-offset-4 shadow-xs"
			/>
			<Button className="rounded">
				<Send />
			</Button>
		</form>
	);
}
