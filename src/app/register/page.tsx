"use client";

import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { useRouter } from "next/navigation";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			// Create user in Firebase Authentication
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const userId = userCredential.user.uid;

			// Save additional user data (name, username, email) to Firestore
			await setDoc(doc(db, "users", userId), {
				name,
				username,
				email,
				createdAt: new Date().toISOString(),
			});

			router.push("/dashboard"); // Redirect to the dashboard after registration
		} catch (err) {
			setError("Failed to register. Please try again.");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold mb-6 text-gray-200">Register</h2>
				{error && <p className="text-red-500">{error}</p>}
				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<input
						type="email"
						placeholder="Gmail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full p-3 mb-4 border border-gray-700 bg-gray-700 text-gray-200 rounded"
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500"
					>
						Register
					</button>
				</form>
				<p className="mt-4 text-gray-400">
					Already have an account?{" "}
					<a href="/login" className="text-blue-400">
						Login
					</a>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
