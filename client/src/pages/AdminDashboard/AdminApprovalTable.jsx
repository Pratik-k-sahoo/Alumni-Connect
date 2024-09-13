import React from "react";

import { Check, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ALUMNI_API_END_POINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicationsSlice";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useGetAllUnapprovedAlumni from "../../hooks/useGetAllUnapprovedAlumni";
import { setAlumniUnapproved } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const statuss = ["accept", "reject"];

const AdminApprovalTable = () => {

    const navigate = useNavigate();
	const { alumniUnapproved } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleStatus = async (status, id) => {
		try {
			console.log(id);
			const response = await axios.put(
				`${ALUMNI_API_END_POINT}/approve/${id}`,
				{ status },
				{ withCredentials: true }
			);
			if (response.data.success) {
				toast.success(response.data.message);
				const updated = alumniUnapproved.map(
					(alumni) => alumni?.user?._id === id ? response.data.alumni : alumni
				);
                dispatch(setAlumniUnapproved(updated));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div>
				<Table>
					<TableCaption>
						A list of your recent applicants.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">
								Fullname
							</TableHead>
							<TableHead className="w-[300px]">Email</TableHead>

							<TableHead>Resume</TableHead>
							<TableHead>Registration Number</TableHead>
							<TableHead className="w-[150px] text-right">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{alumniUnapproved?.map((alumni) => (
							<TableRow key={alumni?._id}>
								<TableCell className="font-medium">
									{alumni?.user?.fullname}
								</TableCell>
								<TableCell>{alumni?.user?.email}</TableCell>
								<TableCell className="text-blue-600">
									{alumni?.user?.profile?.resume && (
										<a
											href={alumni?.user?.profile?.resume}
											target="_blank"
										>
											{alumni?.user?.profile?.resume
												.length > 0 &&
												alumni?.user?.fullname.split(
													" "
												)?.[0]}
											's Resume
										</a>
									)}
									{!alumni?.user?.profile?.resume &&
										"No Resume"}
								</TableCell>
								<TableCell className="font-medium">
									{alumni?.user?.redgNo}
								</TableCell>
								<TableCell className="text-right">
									{alumni.status === "true" ? (
										<div
											className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit bg-green-400 my-3`}
										>
											<Check
												className="w-4 font-bold"
												strokeWidth={"2.5px"}
											/>

											<span>Accepted</span>
										</div>
									) : alumni.status === "false" ? (
										<div
											className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit bg-red-400 my-3`}
										>
											<X
												className="w-4 font-bold"
												strokeWidth={"2.5px"}
											/>
											<span>Rejected</span>
										</div>
									) : (
										<Popover className="cursor-pointer">
											<PopoverTrigger>
												<div className="flex items-center gap-4 border border-gray-300 bg-gray-500 text-white px-2">
													<ChevronDown />
													<span className="font-bold">
														{alumni?.status
															?.toString()
															?.toUpperCase()}
													</span>
												</div>
											</PopoverTrigger>
											<PopoverContent className="w-fit border border-gray-300 shadow-xl">
												{statuss.map((status, idx) => (
													<div
														key={idx}
														className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit my-3 ${
															status === "accept"
																? "bg-green-400"
																: "bg-red-400"
														}`}
														onClick={() =>
															handleStatus(
																`${
																	status ===
																	"accept"
																		? "true"
																		: "false"
																}`,
																alumni?.user
																	?._id
															)
														}
													>
														{status === "accept" && (
															<Check
																className="w-4 font-bold"
																strokeWidth={
																	"2.5px"
																}
															/>
														)}
														{status === "reject" && (
															<X className="w-4" />
														)}
														<span>{status}</span>
													</div>
												))}
											</PopoverContent>
										</Popover>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default AdminApprovalTable;
