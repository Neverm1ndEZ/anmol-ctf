import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST() {
	const categories = [
		{ id: 1, title: "General Skills" },
		{ id: 2, title: "Cryptography" },
		{ id: 3, title: "Forensics" },
		{ id: 4, title: "Reverse Engineering" },
		{ id: 5, title: "Miscellaneous" },
	];

	const categoryRef = collection(db, "categories");

	for (const category of categories) {
		await addDoc(categoryRef, category);
	}

	return NextResponse.json({ message: "Categories populated successfully!" });
}
