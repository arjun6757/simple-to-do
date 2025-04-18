import { Todo } from "@/types/custom";
import TodoItem from "./todo-item";

export default function TodoList({ todos }: { todos: Array<Todo> }) {
	return todos.length === 0 ? (
		<span className="flex justify-center items-center h-full">
			It&apos;s empty here
		</span>
	) : (
		todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
	);
}