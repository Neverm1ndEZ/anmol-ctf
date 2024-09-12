import Cryptography from "@/components/categories/Cryptography";
import Forensics from "@/components/categories/Forensics";
import General from "@/components/categories/General";
import ReverseEngineering from "@/components/categories/ReverseEngineering";
import WebExpo from "@/components/categories/WebExpo";
import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900">
			{/* nav */}
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
			</div>

			{/* content */}
			<div className="flex-grow flex items-center justify-center w-full">
				<div className="grid grid-cols-3 grid-rows-2 gap-10">
					<General />
					<Cryptography />
					<Forensics />
					<WebExpo />
					<ReverseEngineering />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
