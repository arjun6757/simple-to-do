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
		throw new Error("user is not logged in!");
	}

	const text = formData.get("task") as string | null;

	if (!text) {
		throw new Error("Text is required!");
	}

	const { error } = await supabase.from("todos").insert({
		task: text,
		user_id: user.id,
	});

	if (error) {
		throw new Error("Error adding task");
	}

	revalidatePath("/app"); // revalidate cache to add new entry meaning new task or todo
}

export async function deleteTask(id: number) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("user is not logged in!");
	}

	const { error } = await supabase.from("todos").delete().match({
		user_id: user.id,
		id: id,
	});

	if (error) {
		throw new Error("Error deleting task");
	}

	revalidatePath("/app"); //revalidate cache to show updated entries after removing
}

export async function updateTask(todo: Todo) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("user is not logged in!");
	}

	const { error } = await supabase.from("todos").update(todo).match({
		user_id: user.id,
		id: todo.id,
	});

	if (error) {
		throw new Error("Error updating task");
	}

	revalidatePath("/app");
}
