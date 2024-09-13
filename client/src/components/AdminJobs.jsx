import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { Input } from "./ui/input";
import {AdminJobsTable} from "./"

const AdminJobs = () => {
	useGetAllAdminJobs();
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	return (
		<>
			<div>
				<div className="max-w-6xl mx-auto my-10">
					<div className="flex items-center justify-between my-5">
						<Input
							className="w-fit"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Filter by name, role"
						/>
					</div>
					<AdminJobsTable input={input} />
				</div>
			</div>
		</>
	);
};

export default AdminJobs;
