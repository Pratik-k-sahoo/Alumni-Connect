import { Mail, Pen } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	UpdateProfileDialog,
	AppliedJobsTable,
	Header,
	AdminJobs,
} from "@/components";
import { FaGraduationCap } from "react-icons/fa6";
import { FaGithubSquare, FaUserCheck } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { MdCorporateFare } from "react-icons/md";
import { uploadFile } from "@/helper/uploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import { GiAchievement } from "react-icons/gi";
import { FaLinkedin } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const Profile = () => {
	useGetAppliedJobs();
	const [open, setOpen] = useState(false);
	const { user, loading, alumni } = useSelector((state) => state.auth);
	const ref = useRef(null);
	const dispatch = useDispatch();
	const handleEditImage = () => {
		ref.current.click();
	};

	const handleFileChange = async (e) => {
		try {
			dispatch(setLoading(true));
			e.preventDefault();
			const uploadPhoto = await uploadFile(e.target.files?.[0]);
			console.log(uploadPhoto);
			handleFormSubmit(uploadPhoto.secure_url);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleFormSubmit = async (url) => {
		try {
			dispatch(setLoading(true));
			const response = await axios.put(
				`${USER_API_END_POINT}/profile/update`,
				{
					profileImage: url,
				},
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				dispatch(updateUser(response.data.user));
				toast(response.data.message);
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<Header />
			<form hidden>
				<input
					type="file"
					ref={ref}
					onChange={handleFileChange}
					accept="image/*"
				/>
			</form>
			<div className="bg-indigo-200 py-5 w-screen">
				<div className="max-w-4xl lg:mx-auto border border-gray-200 rounded-2xl mx-2 p-8 w-full bg-slate-900 text-white">
					<div className="flex xl:flex-row md:flex-row flex-col xl:justify-between flex-wrap gap-3 mx-auto items-center justify-center">
						<div className="flex xl:flex-row md:flex-row flex-col items-center justify-center gap-4 flex-wrap mx-auto">
							{loading && (
								<div className="h-24 w-24 rounded-full border border-gray-500 flex items-center justify-center">
									<CircularProgress color="inherit" />
								</div>
							)}
							<div className="relative">
								{!loading && (
									<Avatar className="h-24 w-24 border border-gray-500">
										<div onClick={handleEditImage}>
											<AvatarImage
												src={
													user?.profile?.profileImage
												}
												alt="profile"
											/>
										</div>
									</Avatar>
								)}
								<div
									className="absolute right-1 bottom-1 bg-slate-700 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
									onClick={handleEditImage}
								>
									<Pen
										className=" text-slate-200 font-bold"
										size={"15px"}
									/>
								</div>
							</div>
							<div>
								<h1 className="font-medium text-xl font-archivo">
									{user?.fullname}
								</h1>
							</div>
						</div>
						<>
							<Button
								className="text-right"
								variant="outline"
								onClick={() => setOpen(true)}
							>
								<Pen className=" text-slate-900 font-bold" />
							</Button>
						</>
					</div>
					<div className="flex items-start justify-between flex-wrap">
						<div className="my-5 max-w-48">
							<div className="flex items-center gap-4 my-2">
								<Mail />
								<span>{user?.email}</span>
							</div>
							<div className="flex items-center gap-4 my-2">
								<FaGraduationCap size={25} />
								<span>{user?.graduation_year}</span>
							</div>
							<div className="flex items-center gap-4 my-2">
								<FaUserCheck size={25} />
								<span>{user?.role}</span>
							</div>
							<div className="flex items-center gap-4 my-2">
								<SiBookstack size={25} />
								<span>{user?.branch}</span>
							</div>
							{user?.role !== "student" && (
								<div className="flex items-center gap-4 my-2">
									<MdCorporateFare size={25} />
									<span>{user?.profile?.company}</span>
								</div>
							)}
						</div>
						<div className="my-5">
							<div className="flex items-center gap-4 my-2">
								<FaFilePdf size={25} />
								{user?.profile?.resume ? (
									<span>
										<a
											href={user?.profile?.resume}
											target="_blank"
											className="text-blue-600"
										>
											{user?.fullname?.split(" ")?.[0]}'s
											Resume
										</a>
									</span>
								) : (
									<span className="text-red-500">NA</span>
								)}
							</div>
							<div className="flex items-center gap-4 my-2">
								<GiAchievement size={25} />
								{alumni?.achievements ? (
									<span>
										{alumni?.achievements
											.toString()
											.toUpperCase()}
									</span>
								) : (
									<span className="text-red-500">NA</span>
								)}
							</div>
							<div className="flex items-center gap-4 my-2">
								<FaLinkedin size={25} />
								{alumni?.socials?.linkedin ? (
									<a
										href={alumni?.socials?.linkedin}
										target="_blank"
										className="text-blue-600"
									>
										LINKEDIN
									</a>
								) : (
									<span className="text-red-500">NA</span>
								)}
							</div>
							<div className="flex items-center gap-4 my-2">
								<FaGithubSquare size={25} />
								{alumni?.socials?.github ? (
									<a
										href={alumni?.socials?.github}
										target="_blank"
										className="text-blue-600"
									>
										GITHUB
									</a>
								) : (
									<span className="text-red-500">NA</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-4xl w-full sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto rounded-2xl p-4 sm:p-6 lg:p-8">
					<h1 className="font-bold text-lg my-5">Applied Jobs</h1>
					{/* Applied Job Table */}
					<AppliedJobsTable />
				</div>
				{user?.role !== "student" && (
					<div className="max-w-4xl mx-auto rounded-2xl p-4 sm:p-6 md:p-8">
						<h1 className="font-bold text-lg sm:text-xl md:text-2xl my-3 sm:my-4 md:my-5">
							Posted Jobs
						</h1>
						{/* Applied Job Table */}
						<AdminJobs />
					</div>
				)}
				<UpdateProfileDialog open={open} setOpen={setOpen} />
			</div>
		</>
	);
};

export default Profile;
