"use client";

import { Send } from "lucide-react";
import { addTask } from "@/app/(app)/app/actions";
import { addTask as add, deleteTask, updateTask } from "@/stores/slices/task";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useAppDispatch } from "@/stores/hooks";
import { Todo } from "@/types/custom";
import { useAuth } from "@/context/auth-provider";

export default function FormBottom() {
	const formRef = useRef<HTMLFormElement>(null);
	const dispatch = useAppDispatch();
	const user = useAuth();

	return (
		<form
			ref={formRef}
			action={async (data) => {
				formRef.current?.reset();
				const task = {
					id: Date.now(), // use nanoid instead of Date.now()
					inserted_at: new Date().toISOString(),
					is_complete: false,
					task: data.get("task") as string,
					user_id: "-1",
				};

				dispatch(add(task));

				if (!user) return;

				const response = await addTask(data);

				if (response.success) {
					dispatch(updateTask(response.data!)); // telling the ts compiler that it won't be undefined manually
					// or i can do if(response.data !== undefined) dispatch(updateTask(response.data))
				} else {
					dispatch(deleteTask(task.id));
				}
			}}
			className="w-full flex gap-2"
		>
			<input
				name="task"
				placeholder="Type here to add a task..."
				className="w-full pl-3 border border-[#ddd] outline-offset-4 shadow-xs rounded-md"
				required
			/>
			<Button className="rounded-md">
				<Send />
			</Button>
		</form>
	);
}
