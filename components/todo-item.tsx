"use client";

import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { Todo } from "@/types/custom";
import { Calendar, Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { deleteTask, updateTask } from "@/app/(app)/app/actions";
import {
	addTask,
	deleteTask as del,
	updateTask as update,
} from "@/stores/slices/task";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/stores/hooks";
import { useAuth } from "@/context/auth-provider";

function formatDate(date: string): string {
	const values = date.split("-");
	const year: number = parseInt(values[0]);
	const month: number = parseInt(values[1]);
	const day: number = parseInt(values[2]?.split("T")[0]);
	const dateFormat = new Date(year, month - 1, day).toLocaleDateString(
		"en-IN",
		{
			day: "2-digit",
			month: "short",
			year: "numeric",
		},
	);
	return dateFormat;
}

export default function TodoItem({ todo }: { todo: Todo }) {
	const [task, setTask] = useState(todo.task || "");
	const [checked, setChecked] = useState(todo.is_complete);
	const dispatch = useAppDispatch();
	const { pending } = useFormStatus();
	const user = useAuth();

	return (
		<Card className="border-t-0 border-l-0 border-r-0 shadow-none relative p-0 py-2 rounded-none flex justify-between group">
			<CardContent className="flex gap-4 items-center p-0">
				<Checkbox
					onCheckedChange={async (val) => {
						if (val === "indeterminate") return;
						setChecked(val);
						dispatch(update({ ...todo, is_complete: val }));

						if (!user) return;

						const response = await updateTask({
							...todo,
							is_complete: val,
						});

						if (!response.success) {
							setChecked(todo.is_complete);
						}
					}}
					checked={Boolean(checked)}
					className="rounded-full justify-start p-0"
				/>
				<div className="flex flex-col gap-1 w-full">
					<input
						type="text"
						onBlur={async () => {
							// TODO: better handling
							if (task === "") {
								alert("Modified text cannot be empty!");
								setTask(todo.task!);
								return;
							}

							if (todo.task === task) return; // means no change so no need to update

							dispatch(update({ ...todo, task: task }));

							if (!user) return;

							const response = await updateTask({
								...todo,
								task: task,
							});

							if (!response.success) {
								setTask(todo.task!);
							}
						}}
						value={task}
						onChange={(e) => setTask(e.target.value)}
						className="w-full h-full resize-none overflow-ellipsis focus:outline-none"
					/>
					<div className="flex justify-between text-sm text-gray-500">
						<span className="flex gap-2 items-center justify-center">
							<Calendar className="w-4 h-4" />
							{formatDate(todo.inserted_at)}
						</span>
						<form className="flex items-center">
							<button
								disabled={pending}
								formAction={async () => {
									dispatch(del(todo.id));

									if (!user) return;

									const response = await deleteTask(todo.id);

									if (!response.success) {
										console.error(response.message);
										dispatch(addTask(todo));
									}
								}}
								type="submit"
								className="disabled:cursor-not-allowed flex justify-center items-center w-[14px] h-[14px] rounded-full text-gray-700 hover:text-red-500 cursor-pointer"
							>
								<Trash />
							</button>
						</form>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
