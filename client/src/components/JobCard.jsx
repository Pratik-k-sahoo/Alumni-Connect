import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const handleJobDetails = () => {
		navigate("/job/" + job?._id);
	};
	return (
		<div
			onClick={handleJobDetails}
			className="flex flex-col justify-between h-full bg-[#171d32] text-white"
		>
			<h3 className="text-2xl">{job?.company}</h3>
			<p className="text-md text-slate-300">{job?.location}</p>
			<h1 className="font-bold text-2xl">{job?.title}</h1>
			<div className="flex flex-col">
				<p className="text-indigo-200">{job?.description}</p>
			</div>

			<div className="flex items-center gap-4 mt-2">
				<Badge className="text-blue-700 font-bold bg-gray-200 hover:bg-gray-300">
					{job?.position} Position
				</Badge>
				<Badge className="cursor-pointer text-red-500 bg-neutral-300 font-bold hover:bg-neutral-200">
					{job?.jobType}
				</Badge>
				<Badge className="cursor-pointer text-yellow-200 bg-red-600 font-bold hover:bg-red-400">
					{job?.salary / 100000}LPA
				</Badge>
			</div>
			<p className="mt-2 font-semibold">
				<span className="flex gap-3 mt-2">
					Requirements:
					<div className="flex gap-3 flex-wrap">
						{job?.requirements.map((skill, index) => (
							<Badge
								key={index}
								className="cursor-pointer text-yellow-200 bg-red-600 font-bold hover:bg-red-400"
							>
								{skill}
							</Badge>
						))}
					</div>
				</span>
			</p>
			{user?._id !== job?.createdBy?._id && user?.role !== "admin" && (
				<div className="flex justify-between mt-4">
					<a
						href={job?.applyLink}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 px-4 py-2 bg-indigo-200 font-bold text-black rounded-lg hover:bg-green-600 text-center w-full"
					>
						Apply
					</a>
				</div>
			)}
		</div>
	);
};

export default JobCard;
