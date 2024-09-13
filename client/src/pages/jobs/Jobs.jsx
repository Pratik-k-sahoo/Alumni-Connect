import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, JobCard } from "@/components";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";

function Jobs() {
	useGetAllJobs();
	const [isAlumni, setIsAlumni] = useState(true);
	const { jobs, searchQuery } = useSelector((state) => state.jobs);
	const { user } = useSelector((state) => state.auth);
	return (
		<>
			<Header />
			<div className="relative p-8 min-h-[calc(100vh-64px)] bg-[#cbd9f8]">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Job/Internship Page
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{jobs.map((job, index) => (
						<div
							key={index}
							className="bg-[#171d32] p-6 rounded-lg shadow-lg"
						>
							<JobCard job={job} isAlumni={isAlumni} />
						</div>
					))}
				</div>

				{/* Add Job Button */}
				{(user?.role === "alumni" || user?.role === "admin") && (
					<Link to="add-job">
						<button className="fixed bottom-8 right-8 bg-blue-500 text-black rounded-full p-4 shadow-md hover:bg-blue-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v16m8-8H4"
								/>
							</svg>
						</button>
					</Link>
				)}
			</div>
            <Footer />
		</>
	);
}

export default Jobs;
