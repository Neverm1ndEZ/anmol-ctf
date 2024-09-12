"use client";
import { useRouter } from "next/navigation";

export default function General() {
	const router = useRouter();

	const handleClick = () => {
		router.push("/dashboard/questions");
	};

	return (
		<button
			className="bg-slate-600 rounded-xl w-full p-5 flex justify-center items-center"
			onClick={handleClick}
		>
			<h1>General Skills</h1>
		</button>
	);
}
