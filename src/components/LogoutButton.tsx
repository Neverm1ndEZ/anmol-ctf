"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			router.push("/"); // Redirect to home after logout
		} catch (error) {
			console.error("Failed to log out:", error);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
		>
			Logout
		</button>
	);
};

export default LogoutButton;
