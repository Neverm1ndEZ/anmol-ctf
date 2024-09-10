import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } },
) {
	const challengesRef = collection(
		db,
		"categories",
		params.categoryId,
		"challenges",
	);
	const challengesSnapshot = await getDocs(challengesRef);
	const challenges = challengesSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return NextResponse.json(challenges);
}

export async function POST(
	req: Request,
	{ params }: { params: { categoryId: string } },
) {
	const data = await req.json();

	const newChallenge = {
		author: data.author,
		description: data.description,
		downloadURL: data.downloadURL, // This is the URL of the uploaded file in Firebase Storage
		createdAt: new Date(),
	};

	const challengeRef = collection(
		db,
		"categories",
		params.categoryId,
		"challenges",
	);
	const docRef = await addDoc(challengeRef, newChallenge);

	return NextResponse.json({
		message: "Challenge added successfully!",
		id: docRef.id,
	});
}
