import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { setAlumni, setLoading, updateUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import { uploadFile } from "../helper/uploadFile";

const UpdateProfileDialog = ({ open, setOpen }) => {
	const { user, loading } = useSelector((store) => store.auth);
	const [formData, setFormData] = useState({
		bio: user?.profile?.bio,
	});
	const dispatch = useDispatch();

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = async (e) => {
		try {
			dispatch(setLoading(true));
			const uploadPdf = await uploadFile(e.target.files?.[0]);
			setFormData((prev) => ({
				...prev,
				resume: uploadPdf.secure_url,
			}));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(setLoading(true));
			console.log(formData);
			const response = await axios.put(
				`${USER_API_END_POINT}/profile/update`,
				formData,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				dispatch(updateUser(response.data.user));
				console.log(response.data);
				if (response.data.alumni)
					dispatch(setAlumni(response.data.alumni));
				toast(response.data.message);
				setFormData({
					bio: response.data.user?.profile?.bio,
				});
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
			<div>
				<Dialog open={open}>
					<DialogContent
						className="sm:max-w-[425px]"
						onInteractOutside={() => setOpen(false)}
					>
						<DialogHeader>
							<DialogTitle>Update Profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save
								when you're done.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="fullname"
										className="text-right"
									>
										Fullname:
									</Label>
									<Input
										id="fullname"
										type="text"
										value={formData.fullname}
										onChange={handleEventChange}
										className="col-span-3"
										name="fullname"
										placeholder="Fullname"
									/>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="bio" className="text-right">
										Bio:
									</Label>
									<Textarea
										id="bio"
										className="col-span-3"
										value={formData.bio}
										onChange={handleEventChange}
										name="bio"
										placeholder="Bio"
									/>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="graduation_year"
										className="text-right"
									>
										Graduation Year:
									</Label>
									<Input
										type="number"
										id="graduation_year"
										className="col-span-3 remove-arrow"
										value={formData.graduation_year}
										onChange={handleEventChange}
										name="graduation_year"
										placeholder="Graduation Year"
									/>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="branch"
										className="text-right"
									>
										Branch:
									</Label>
									<Input
										id="branch"
										className="col-span-3"
										type="text"
										value={formData.branch}
										onChange={handleEventChange}
										name="branch"
										placeholder="Branch"
									/>
								</div>
								{user?.role !== "student" && (
									<div className="flex flex-col gap-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="company"
												className="text-right"
											>
												Company:
											</Label>
											<Input
												id="company"
												className="col-span-3"
												type="text"
												value={formData.company}
												onChange={handleEventChange}
												name="company"
												placeholder="Company"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="achievements"
												className="text-right"
											>
												Achievements:
											</Label>
											<Input
												id="achievements"
												className="col-span-3"
												type="text"
												value={formData.achievements}
												onChange={handleEventChange}
												name="achievements"
												placeholder="Achievements"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="linkedin"
												className="text-right"
											>
												LinkedIn:
											</Label>
											<Input
												id="linkedin"
												className="col-span-3"
												type="url"
												value={formData.linkedIn}
												onChange={handleEventChange}
												name="linkedin"
												placeholder="LinkedIn"
											/>
										</div>

										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="github"
												className="text-right"
											>
												Github:
											</Label>
											<Input
												id="github"
												className="col-span-3"
												type="url"
												value={formData.github}
												onChange={handleEventChange}
												name="github"
												placeholder="Github"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="resume"
												className="text-right"
											>
												Resume:
											</Label>
											<Input
												id="resume"
												className="col-span-3 cursor-pointer"
												type="file"
												accept=".pdf"
												onChange={handleFileChange}
												name="resume"
											/>
										</div>
									</div>
								)}
							</div>
							<DialogFooter>
								{loading ? (
									<Button disabled className="w-full mt-4">
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								) : (
									<Button
										type="submit"
										className="w-full mt-4"
									>
										Update
									</Button>
								)}
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default UpdateProfileDialog;
