import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Todo } from "@/types/custom";
import TodoItem from "@/components/todo-item";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FormBottom from "./form-bottom";

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
		.order("inserted_at", { ascending: false });

	if (error) {
		<Card className="p-2">{error.message}</Card>;
	}

	return (
		<Card className="h-[30rem] overflow-hidden w-[22rem] sm:w-lg my-6 font-sans rounded">
			<CardContent className="h-full overflow-y-scroll scrollbar-hidden">
				<TodoList todos={todos ?? []} />
			</CardContent>
			<CardFooter>
				<FormBottom />
			</CardFooter>
		</Card>
	);
}
