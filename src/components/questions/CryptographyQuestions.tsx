"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CryptographyQuestions() {
	interface Question {
		id: number;
		name: string;
		desc: string;
		attachments?: string;
		answer: string;
	}

	const [questions, setQuestions] = useState<Question[]>([]);

	const fetchCrypto = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/ques/all/crypto`,
			);
			setQuestions(response.data);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	const handleAttachment = (attachment: string | undefined) => {
		if (!attachment) return "No attachments";
		// Simple URL validation (basic check)
		const urlPattern = /^https?:\/\/.*/;
		return urlPattern.test(attachment) ? (
			<Link
				href={attachment}
				target="_blank"
				className="text-blue-500 hover:underline"
			>
				Download Attachment
			</Link>
		) : (
			<span>{attachment}</span>
		);
	};

	useEffect(() => {
		fetchCrypto();
	}, []);

	// Function to determine difficulty level based on ID
	const getDifficulty = (id: number) => {
		if (id === 5) return "Easy";
		if (id === 9) return "Medium";
		return "Unknown";
	};

	return (
		<div className="max-w-4xl mx-auto p-8">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Cryptography Questions
			</h1>
			{questions.length > 0 ? (
				questions.map((question) => (
					<div
						key={question.id}
						className={`mb-8 p-6 rounded-lg shadow-lg ${
							getDifficulty(question.id) === "Easy"
								? "bg-green-100"
								: getDifficulty(question.id) === "Medium"
								? "bg-yellow-100"
								: "bg-gray-100"
						}`}
					>
						<h2 className="text-2xl font-semibold mb-2 text-black">
							Question {question.id}: {question.name}
						</h2>
						<p className="text-gray-700 mb-2">
							<strong>Description:</strong> {question.desc}
						</p>
						<p className="text-gray-700 mb-2">
							<strong>Difficulty:</strong>{" "}
							<span
								className={`font-bold ${
									getDifficulty(question.id) === "Easy"
										? "text-green-600"
										: "text-yellow-600"
								}`}
							>
								{getDifficulty(question.id)}
							</span>
						</p>
						<p className="text-gray-700 mb-2">
							<strong>Attachments:</strong>{" "}
							{handleAttachment(question.attachments)}
						</p>
						{/* <p className="text-gray-700">
							<strong>Answer:</strong> {question.answer}
						</p> */}
					</div>
				))
			) : (
				<p className="text-center text-gray-500">Loading questions...</p>
			)}
		</div>
	);
}
