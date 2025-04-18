"use client";

import { createClient } from "@/utils/supabase/client";
import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from "react";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<User | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const supabase = createClient();

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (error) {
				console.error(
					"Error while fetching user session: ",
					error.message,
				);
			} else {
				setUser(data.session?.user || null);
			}
		};

		fetchUser(); //calls first time

		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setUser(session?.user || null);
			},
		); // sets a listener that sets user || null in the user state

		return () => listener.subscription.unsubscribe();
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
