import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Header from "../../components/Header/Header";

function AddJobPage({ addJob }) {
	const [jobData, setJobData] = useState({
		title: "",
		description: "",
		requirements: "",
		salary: 0,
		experienceLevel: "",
		location: "",
		jobType: "",
		position: 0,
		company: "",
	});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setJobData({ ...jobData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const response = await axios.post(
				`${JOB_API_END_POINT}/add-job`,
				jobData,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast(response.data.message);
				navigate("/job"); // Redirect to JobPage after submission
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="p-8 min-h-screen bg-[#cbd9f8]">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Add Job/Internship
				</h1>
				<form
					onSubmit={handleSubmit}
					className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
				>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Title:
						</label>
						<input
							type="text"
							name="title"
							value={jobData.title}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Description:
						</label>
						<input
							type="text"
							name="description"
							value={jobData.description}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Requirements:
						</label>
						<input
							type="text"
							name="requirements"
							value={jobData.requirements}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Salary:
						</label>
						<input
							type="number"
							name="salary"
							value={jobData.salary}
							onChange={handleChange}
							className="remove-arrow w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="experienceLabel">Experience</Label>
						<Select
							onValueChange={(value) =>
								setJobData({
									...jobData,
									experienceLevel: value,
								})
							}
							name="experienceLabel"
						>
							<SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
								<SelectValue placeholder="Select experience level" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={"entry-level"}>
										entry-level
									</SelectItem>
									<SelectItem value={"mid-level"}>
										mid-level
									</SelectItem>
									<SelectItem value={"senior"}>
										senior
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Location:
						</label>
						<input
							type="text"
							name="location"
							value={jobData.location}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="jobType">Job Type</Label>
						<Select
							onValueChange={(value) =>
								setJobData({
									...jobData,
									jobType: value,
								})
							}
							name="jobType"
						>
							<SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
								<SelectValue placeholder="Select job type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={"full-time"}>
										full-time
									</SelectItem>
									<SelectItem value={"part-time"}>
										part-time
									</SelectItem>
									<SelectItem value={"internship"}>
										internship
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Position:
						</label>
						<input
							type="number"
							name="position"
							value={jobData.position}
							onChange={handleChange}
							className="remove-arrow w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Company:
						</label>
						<input
							type="text"
							name="company"
							value={jobData.company}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-300"
					>
						Add Job
					</button>
				</form>
			</div>
		</>
	);
}

export default AddJobPage;
