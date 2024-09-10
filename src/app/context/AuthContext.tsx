"use client";

import { useEffect, useState, createContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext<{ user: User | null }>({
	user: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
