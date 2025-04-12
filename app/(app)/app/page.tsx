import { Card, CardContent } from "@/components/ui/card";
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
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Check, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import Tabs from "@/components/tabs";

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
		<div>
			<Tabs />

			<Card className="h-[30rem] overflow-hidden w-[90vw] sm:w-lg mt-4 font-sans rounded-md gap-2 py-0 pt-3">
				<div className="px-3 flex justify-between items-center text-sm">
					<Select>
						<SelectTrigger size="sm">
							<Label
								htmlFor="filterBy"
								className="text-gray-500 dark:text-neutral-400"
							>
								Filter:
							</Label>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent className="font-sans">
							<SelectItem value="A-Z">A-Z</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
							<SelectItem value="inserted_at">Date</SelectItem>
						</SelectContent>
					</Select>

					<Menubar className="border-none rounded-full shadow-none">
						<MenubarMenu>
							<MenubarTrigger className="rounded-full px-1 hover:bg-transparent text-gray-700 hover:text-gray-700/80 cursor-pointer">
								<EllipsisVertical className="w-4 h-4 text-inherit" />
							</MenubarTrigger>
							<MenubarContent className="font-sans mt-2 mr-2 sm:mr-0">
								<MenubarItem>
									New Tasklist{" "}
									<MenubarShortcut>⌘T</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarSub>
									<MenubarSubTrigger>View</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem className="flex justify-between">
											Task dates <Check />{" "}
										</MenubarItem>
										<MenubarSeparator />
										<MenubarItem className="flex justify-between">
											Delete button <Check />
										</MenubarItem>
										<MenubarItem className="flex justify-between">
											Checkbox item <Check />
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>Sort</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem className="flex justify-between">
											Ascending <Check />{" "}
										</MenubarItem>
										<MenubarItem>Descending</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>
										Tasklist
									</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem className="flex justify-between">
											Work <Check />{" "}
										</MenubarItem>
										<MenubarItem>Development</MenubarItem>
										<MenubarItem>Life</MenubarItem>
										<MenubarSeparator />
										<MenubarItem>Show more</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSeparator />
								<Dialog>
									<DialogTrigger className="text-sm hover:bg-gray-100 px-2 py-1 rounded w-full inline-flex justify-between">
										<span>Clear All</span>
										<span className="inline-flex items-center text-gray-500 dark:text-gray-400 text-xs tracking-widest">
											⌘D
										</span>
									</DialogTrigger>

									<DialogContent className="font-sans">
										<DialogHeader>
											<DialogTitle>
												Delete task data
											</DialogTitle>
											<DialogDescription>
												Choose how you want to delete
												your task data — either by time
												range or specific date.
											</DialogDescription>
										</DialogHeader>
										{/* Time Range Select */}
										<div className="space-y-2">
											<Label htmlFor="timeRange">
												Time range
											</Label>
											<Select>
												<SelectTrigger
													id="timeRange"
													className="w-full"
												>
													<SelectValue placeholder="Select range" />
												</SelectTrigger>
												<SelectContent className="font-sans">
													<SelectItem value="all">
														All time
													</SelectItem>
													<SelectItem value="today">
														Today
													</SelectItem>
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
										{/*Calendar for Specific Date */}
										<div className="space-y-4 pt-4">
											<Label>
												Or select a specific date
											</Label>
											<Calendar
												mode="single"
												// selected={selectedDate}
												// onSelect={setSelectedDate}
												className="rounded-md border w-fit mx-auto"
											/>
										</div>
										{/*Delete Button*/}
										<div className="pt-2">
											<Button
												variant="destructive"
												className="w-full"
											>
												Delete
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>

				<CardContent className="h-full overflow-y-scroll scrollbar-hidden">
					<TodoList todos={todos ?? []} />
				</CardContent>
				<div className="p-2">
					<FormBottom />
				</div>
			</Card>
		</div>
	);
}
