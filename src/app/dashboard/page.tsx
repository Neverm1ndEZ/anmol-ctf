import LogoutButton from "@/components/LogoutButton";
import Categories from "@/components/Categories";

const Dashboard = () => {
	const categories = [
		{ id: 1, title: "General Skills" },
		{ id: 2, title: "Cryptography" },
		{ id: 3, title: "Forensics" },
		{ id: 4, title: "Reverse Engineering" },
		{ id: 5, title: "Miscellaneous" },
	];

	return (
		<div className="flex flex-col min-h-screen bg-gray-900 gap-y-10">
			<div className="w-full max-w-[1240px] mx-auto space-y-10">
				<div className="flex items-center justify-between mt-10">
					<div>
						<h1 className="text-2xl font-bold text-gray-200">
							Welcome to Cyber ConQuest Dashboard
						</h1>
					</div>
					<div>
						<LogoutButton />
					</div>
				</div>
				<div className="flex items-center justify-center">
					<Categories categories={categories} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
