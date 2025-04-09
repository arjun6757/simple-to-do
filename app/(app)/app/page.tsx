import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Todo } from "@/types/custom";
import TodoItem from "@/components/todo-item";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FormBottom from "./form-bottom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

function TodoList({ todos }: { todos: Array<Todo> }) {
	return todos.length === 0 ? (
		<span className="flex justify-center items-center h-full">
			It&apos;s empty here
		</span>
	) : (
		todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
	);
}

export default async function App() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	const { data: todos, error } = await supabase
		.from("todos")
		.select("*")
		.order("inserted_at", { ascending: true });

	if (error) {
		<Card className="p-2">{error.message}</Card>;
	}

	return (
		<Card className="h-[30rem] overflow-hidden w-[22rem] sm:w-lg my-6 font-sans rounded">
			<div className="px-6 flex justify-between text-sm">
				<Select>
					<SelectTrigger>
						<Label htmlFor="filterBy">Filter by:</Label>
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent className="font-sans">
						<SelectItem value="date">Date</SelectItem>
						<SelectItem value="is_complete_true">
							Completion
						</SelectItem>
						<SelectItem value="is_complete_false">
							Pending
						</SelectItem>
					</SelectContent>
				</Select>
				<Dialog>
					<DialogTrigger className="inline-flex items-center gap-1 text-neutral-950 hover:text-neutral-950/50 cursor-pointer group">
						Clear All
						<ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
					</DialogTrigger>
					<DialogContent className="font-sans">
						<DialogHeader>
							<DialogTitle>
								Delete task data
							</DialogTitle>
							<DialogDescription>
								Choose how you want to delete your task data —
								either by time range or specific date.
							</DialogDescription>
						</DialogHeader>

						{/* Time Range Select */}
						<div className="space-y-2">
							<Label htmlFor="timeRange">Time range</Label>
							<Select>
								<SelectTrigger
									id="timeRange"
									className="w-full"
								>
									<SelectValue placeholder="Select range" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">
										All time
									</SelectItem>
									<SelectItem value="today">Today</SelectItem>
									<SelectItem value="yesterday">
										Yesterday
									</SelectItem>
									<SelectItem value="monthly">
										Monthly
									</SelectItem>
									<SelectItem value="yearly">
										Yearly
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Calendar for Specific Date */}
						<div className="space-y-4 pt-4">
							<Label>Or select a specific date</Label>
							<Calendar
								mode="single"
								// selected={selectedDate}
								// onSelect={setSelectedDate}
								className="rounded-md border w-fit mx-auto"
							/>
						</div>

						{/* Delete Button */}
						<div className="pt-2">
							<Button variant="destructive" className="w-full">
								Delete
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<CardContent className="h-full overflow-y-scroll scrollbar-hidden">
				<TodoList todos={todos ?? []} />
			</CardContent>
			<CardFooter>
				<FormBottom />
			</CardFooter>
		</Card>
	);
}
