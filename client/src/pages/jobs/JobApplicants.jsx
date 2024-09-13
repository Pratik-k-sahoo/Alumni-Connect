import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicationsSlice";
import { Header, JobApplicantsTable } from "@/components";

const JobApplicants = () => {
	const params = useParams();
	const jobId = params.id;
	const dispatch = useDispatch();
	const { applicants } = useSelector((state) => state.application);
	useEffect(() => {
		const fetchAllApplicants = async () => {
			try {
				const response = await axios.get(
					`${APPLICATION_API_END_POINT}/${jobId}/applicants`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(setApplicants(response.data.job.applications));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllApplicants();
	}, [jobId, dispatch]);
	return (
		<>
			<div>
				<Header />
				<div className="max-w-7xl mx-auto h-full py-4">
					<h1 className="font-bold text-xl my-5">
						Applicants ({applicants.length})
					</h1>
					<JobApplicantsTable />
				</div>
			</div>
		</>
	);
};

export default JobApplicants;
