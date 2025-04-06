'use server'

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleEmailLogin(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.error(error);
		return redirect("/login");
	}

	revalidatePath("/", "layout");
	redirect("/app");
}

export async function handleSignUp(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		return redirect("/login");
	}

	revalidatePath("/", "layout");

	// user needs to sign in before going to the app route
	redirect("/login");
}

export async function handleSignOut() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	redirect("/login");
}

export async function handleOAuth(provider: Provider) {
	if (!provider) {
		// should return error but for now it's not needed
		redirect("/login");
	}

	const supabase = await createClient();

	const redirectURL = process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000/auth/callback";

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: provider,
		options: {
			redirectTo: redirectURL,
		},
	});

	if (error) {
		console.error(error.message);
		return redirect("/login");
	}

	return redirect(data.url);
}
