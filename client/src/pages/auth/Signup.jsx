import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { setLoading } from "@/redux/authSlice";
import { uploadFile } from "../../helper/uploadFile";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";

const programmeOptions = [
	"B. E.",
	"B. E. Engineering",
	"B. Sc. Engineering",
	"B.Arch.",
	"B.Tech.",
	"B.Tech. M.Tech Dual Degree",
	"Integrated M.Sc.",
	"M.E. (Part Time)",
	"M.Sc.",
	"M.Tech.",
	"M.Tech. (Part Time)",
	"M.Tech.(RES)",
	"MA",
	"MBA",
	"MCA",
	"Ph.D.",
];

const departmentOptions = [
	"Biotechnology and Medical Engineering",
	"Civil Engineering",
	"Chemical Engineering",
	"Ceramic Engineering",
	"Computer Science and Engineering",
	"Chemistry",
	"Electronics and Communication Engineering",
	"Electrical Engineering",
	"Electronics and Instrumentation Engineering",
	"Earth and Atmospheric Sciences",
	"Food Process Engineering",
	"Humanities and Social Sciences",
	"Industrial Design",
	"Life Science",
	"Mathematics",
	"Master of Computer Application",
	"Mechanical Engineering",
	"Metallurgical and Materials Engineering",
	"Mining Engineering",
	"Planning and Architecture",
	"Physics and Astronomy",
	"Physics",
	"School of Management",
];

const Signup = () => {
	const [formData, setFormData] = useState({ role: "student" });
	const navigate = useNavigate();
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = async (e) => {
		try {
			dispatch(setLoading(true));
			const uploadPhoto = await uploadFile(e.target.files?.[0]);
			setFormData((prev) => ({
				...prev,
				profileImage: uploadPhoto.secure_url,
			}));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
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
			setLoading(true);
			const response = await axios.post(
				`${USER_API_END_POINT}/register`,
				formData,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			toast(response.data.message);
			if (formData.role === "alumni") {
				navigate(`/alumni/${response.data.userId}/register`);
			} else {
				navigate("/login");
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
			<div>
				<div className="flex items-center justify-center max-w-7xl mx-auto">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 w-1/2 border border-gray-500 rounded-md p-4 my-10"
					>
						<h1 className="font-bold text-xl mb-5 text-center">
							Sign<span className="text-red-600">up</span>
						</h1>
						<div>
							<Label htmlFor="fullname">
								Fullname<span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								id="fullname"
								placeholder="Fullname"
								name="fullname"
								onChange={handleEventChange}
								value={formData.fullname}
								required
							/>
						</div>
						<div>
							<Label htmlFor="email">
								Email<span className="text-red-600">*</span>
							</Label>
							<Input
								type="email"
								id="email"
								placeholder="Email"
								name="email"
								onChange={handleEventChange}
								value={formData.email}
								required
							/>
						</div>
						<div>
							<Label htmlFor="password">
								Password<span className="text-red-600">*</span>
							</Label>
							<Input
								type="password"
								id="password"
								placeholder="Password"
								autoComplete="on"
								name="password"
								onChange={handleEventChange}
								value={formData.password}
								required
							/>
						</div>
						<div>
							<Label htmlFor="graduation_year">
								Graduation Year
								<span className="text-red-600">*</span>
							</Label>
							<Input
								type="number"
								id="graduation_year"
								placeholder="Graduation Year"
								name="graduation_year"
								className="remove-arrow"
								onChange={handleEventChange}
								value={formData.graduation_year}
							/>
						</div>
						<div>
							<Label htmlFor="redgNo">
								Registration Number
								<span className="text-red-600">*</span>
							</Label>
							<Input
								type="number"
								id="redgNo"
								placeholder="Registration Number"
								name="redgNo"
								className="remove-arrow"
								onChange={handleEventChange}
								value={formData.redgNo}
							/>
						</div>
						<div>
							<Label htmlFor="programme">
								Programme
								<span className="text-red-600">*</span>
							</Label>
							<Select
								onValueChange={(value) =>
									setFormData({
										...formData,
										programme: value,
									})
								}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="By Programme" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{programmeOptions.map((programme) => (
											<SelectItem
												key={programme}
												value={programme}
											>
												{programme}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="department">
								Branch
								<span className="text-red-600">*</span>
							</Label>
							<Select
								onValueChange={(value) =>
									setFormData({
										...formData,
										department: value,
									})
								}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="By Department" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{departmentOptions.map((programme) => (
											<SelectItem
												key={programme}
												value={programme}
											>
												{programme}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="company">Company</Label>
							<Input
								type="text"
								id="company"
								placeholder="Company Name"
								autoComplete="on"
								name="company"
								onChange={handleEventChange}
								value={formData.company}
							/>
						</div>
						<div>
							<Label htmlFor="bio">
								Bio
								<span className="text-red-600">*</span>
							</Label>
							<Textarea
								id="bio"
								placeholder="Bio"
								name="bio"
								onChange={handleEventChange}
								value={formData.bio}
							/>
						</div>

						<div>
							<Label htmlFor="profileImage">Photo</Label>
							<Input
								type="file"
								accept="image/*"
								id="profileImage"
								name="profileImage"
								onChange={handleImageChange}
							/>
						</div>
						<div>
							<Label htmlFor="resume">Resume</Label>
							<Input
								type="file"
								accept=".pdf"
								id="resume"
								name="resume"
								onChange={handleFileChange}
							/>
						</div>
						<div>
							<RadioGroup
								defaultValue="student"
								name="role"
								onChange={handleEventChange}
							>
								<div className="flex items-center flex-wrap gap-5">
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="student"
											id="student"
										/>
										<Label htmlFor="student">Student</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="alumni"
											id="alumni"
										/>
										<Label htmlFor="alumni">Alumni</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="admin"
											id="admin"
										/>
										<Label htmlFor="admin">Admin</Label>
									</div>
								</div>
							</RadioGroup>
						</div>
						{loading ? (
							<Button disabled className="w-full mt-4">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</Button>
						) : (
							<Button type="submit" className="w-full mt-4">
								Signup
							</Button>
						)}
						<span className="text-sm">
							Already have an account?{" "}
							<Link to={"/login"} className="text-blue-600">
								Login
							</Link>
						</span>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Signup;
