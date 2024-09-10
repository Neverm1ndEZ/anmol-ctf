import React from "react";
import Challenges from "./Challenges";

interface Category {
	id: number;
	title: string;
}

export default function Categories({ categories }: { categories: Category[] }) {
	if (!Array.isArray(categories)) {
		return <div>No categories available.</div>;
	}

	return (
		<div className="w-full flex flex-col items-start justify-center bg-gray-600 rounded-xl p-4">
			<div className="w-full grid gap-4">
				{categories.map((category) => (
					<div key={category.id} className="w-full bg-gray-700 rounded-lg p-4">
						<h2 className="text-lg font-semibold text-white">
							{category.title}
						</h2>
						<div className="w-full flex items-center justify-evenly gap-10 mt-4">
							<Challenges />
							<Challenges />
							<Challenges />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
