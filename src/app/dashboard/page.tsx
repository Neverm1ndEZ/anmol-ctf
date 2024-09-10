"use client";

import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<h1 className="text-2xl font-bold text-gray-200">
				Welcome to your Dashboard
			</h1>

			<LogoutButton />
		</div>
	);
};

export default Dashboard;
