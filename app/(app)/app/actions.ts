"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Todo } from "@/types/custom";

export async function addTask(formData: FormData) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { success: false, message: "user is not logged in!" };
		// throw new Error("user is not logged in!");
	}

	const text = formData.get("task") as string | null;

	if (!text) {
		throw new Error("Text is required!");
	}

	const { data, error } = await supabase
		.from("todos")
		.insert({
			task: text,
			user_id: user.id,
		})
		.select(); // return data upon success

	if (error) {
		// throw new Error("Error adding task");
		return { success: false, message: error.message };
	}

	const task = data[0];

	// revalidatePath("/app"); // revalidate cache to add new entry meaning new task or todo

	return { success: true, data: task };
}

export async function deleteTask(id: number) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		// throw new Error("user is not logged in!");
		return { success: false, message: "user is not logged in!" };
	}

	const { data, error } = await supabase
		.from("todos")
		.delete()
		.match({
			user_id: user.id,
			id: id,
		})
		.select();

	if (error) {
		// throw new Error("Error deleting task");
		return { success: false, message: error.message };
	}

	const task = data[0];

	// revalidatePath("/app"); //revalidate cache to show updated entries after removing

	return { success: true, data: task };
}

export async function updateTask(todo: Todo) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		// throw new Error("user is not logged in!");
		return { success: false, message: "user is not logged in!" };
	}

	const { error } = await supabase.from("todos").update(todo).match({
		user_id: user.id,
		id: todo.id,
	});

	if (error) {
		return { success: false, message: error.message };
		// throw new Error("Error updating task");
	}

	// revalidatePath("/app");
	return { success: true };
}

export async function getTodos() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("user is not logged in!");
	}

	const { data, error } = await supabase
		.from("todos")
		.select("*")
		.order("inserted_at", { ascending: true });

	if (error) {
		return { success: false, message: error.message };
	}

	return { success: true, data: data };
}
