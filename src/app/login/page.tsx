"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const [identifier, setIdentifier] = useState(""); // Username or Email
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			let email = identifier;

			// Check if identifier is a username (no "@" symbol)
			if (!identifier.includes("@")) {
				const usersRef = collection(db, "users");
				const q = query(usersRef, where("username", "==", identifier));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) {
					throw new Error("Username not found");
				}

				const userData = querySnapshot.docs[0].data();
				email = userData.email; // Use the email associated with the username
			}

			// Log in with email and password
			await signInWithEmailAndPassword(auth, email, password);
			router.push("/dashboard"); // Redirect to the dashboard after login
		} catch (err) {
			setError("Failed to log in. Please check your credentials.");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold mb-6 text-gray-200">Login</h2>
				{error && <p className="text-red-500">{error}</p>}
				<form onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Email or Username"
						value={identifier}
						onChange={(e) => setIdentifier(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500"
					>
						Login
					</button>
				</form>
				<p className="mt-4 text-gray-400">
					Don’t have an account?{" "}
					<a href="/register" className="text-blue-400">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
