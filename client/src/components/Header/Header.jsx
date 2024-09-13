import { LogOut, User2, UserCog } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { logout, setLoading } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import logo from "./logo.png";

function Header() {
	const [showMessage, setShowMessage] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowMessage(false);
		}, 5000); // 10 seconds

		return () => clearTimeout(timer); // Cleanup the timer
	}, []);
	const { user } = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			dispatch(setLoading(true));
			const response = await axios.get(`${USER_API_END_POINT}/logout`, {
				withCredentials: true,
			});
			if (response.data.success) {
				dispatch(logout());
				navigate("/login");
				toast(response.data.message);
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
			<header className="shadow sticky z-50 top-0 h-16 max-h-20 ">
				<nav className="bg-[#171d32] text-white border-gray-200 px-4 lg:px-6 py-2.5 ">
					<div className="flex justify-between items-center mx-auto max-w-screen-xl">
						<img
							src={logo}
							className="mr-3 h-12 lg:order-0 order-1"
							alt="Logo"
						/>

						{user && (
							<div className="flex gap-5 items-center lg:order-2 order-1 cursor-pointer">
								<Popover>
									<PopoverTrigger asChild>
										<div className="flex items-center gap-5">
											<Avatar>
												<AvatarImage
													className="cursor-pointer"
													src={
														user.profile
															.profileImage
													}
													alt="jobportal"
												/>
												<AvatarFallback>
													CN
												</AvatarFallback>
											</Avatar>
											<h3 className="hidden lg:block text-xl font-bold">
												{user.fullname}
											</h3>
										</div>
									</PopoverTrigger>
									<PopoverContent className="w-80">
										<div className="flex items-center gap-5">
											<Avatar>
												<AvatarImage
													className="cursor-pointer"
													src={
														user.profile
															.profileImage
													}
													alt="jobportal"
												/>
												<AvatarFallback>
													JP
												</AvatarFallback>
											</Avatar>
											<div>
												<h4 className="font-medium">
													{user.fullname}
												</h4>
												<p className="text-sm text-muted-foreground">
													{user.profile.bio}
												</p>
											</div>
										</div>
										<div className="flex flex-col my-2 text-gray-600">
											<NavLink to={"/profile"}>
												<div className="flex w-fit items-center gap-2 cursor-pointer">
													<User2 />
													<Button
														className="border-none outline-none"
														variant="link"
													>
														View Profile
													</Button>
												</div>
											</NavLink>
											{user.role === "admin" && (
												<NavLink to={"/admin"}>
													<div className="flex w-fit items-center gap-2 cursor-pointer">
														<UserCog />
														<Button
															className="border-none outline-none"
															variant="link"
														>
															Admin Dashboard
														</Button>
													</div>
												</NavLink>
											)}
											<NavLink
												to={
													"/mentorship/mentorship-list"
												}
											>
												<div className="flex w-fit items-center gap-2 cursor-pointer">
													<User2 />
													<Button
														className="border-none outline-none"
														variant="link"
													>
														Mentorship list
													</Button>
												</div>
											</NavLink>
											<NavLink
												to={
													"/mentorship/my-mentorships"
												}
											>
												<div className="flex w-fit items-center gap-2 cursor-pointer">
													<User2 />
													<Button
														className="border-none outline-none"
														variant="link"
													>
														My Mentorship
													</Button>
												</div>
											</NavLink>
											<NavLink
												to={
													"/mentorship/mentorship-dashboard"
												}
											>
												<div className="flex w-fit items-center gap-2 cursor-pointer">
													<User2 />
													<Button
														className="border-none outline-none"
														variant="link"
													>
														Mentorship Dashboard
													</Button>
												</div>
											</NavLink>
											<div className="flex w-fit items-center gap-2 cursor-pointer">
												<LogOut
													onClick={handleLogout}
												/>
												<Button
													className="border-none outline-none"
													variant="link"
													onClick={handleLogout}
												>
													Logout
												</Button>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						)}
						{!user && (
							<div className="flex gap-5 items-center lg:order-2 order-2">
								<Link to={"/login"}>Login</Link>
								<Link to={"/signup"}>Signup</Link>
							</div>
						)}
						<div
							className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
							id="mobile-menu-2"
						>
							<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
								<li>
									<Link to={"/"}>Home</Link>
								</li>
								<li>
									<Link to={"/job"}>Jobs</Link>
								</li>
								<li>
									<Link to={"/events"}>Events</Link>
								</li>
								<li>
									<Link to={"/success-stories"}>
										Success Stories
									</Link>
								</li>
								<li>
									<Link to={"/chat"}>Chat</Link>
								</li>
								<li>
									<Link to={"/donation"}>Donation</Link>
								</li>
								<li>
									<Link to={"/community"}>Community Hub</Link>
								</li>
								<li>
									<Link to={"/alumni/list"}>Our Alumni</Link>
								</li>
								<li>
									<Link to={"/mentorship"}>Mentorship</Link>
								</li>
							</ul>
						</div>
						<div className="flex lg:hidden h-full gap-5 items-center lg:order-2 order-0 cursor-pointer">
							<Popover>
								<PopoverTrigger asChild>
									<div className="flex items-center gap-5">
										<div className="flex-none">
											<button className="btn btn-square btn-ghost">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													className="inline-block h-8 w-8 stroke-current"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M4 6h16M4 12h16M4 18h16"
													></path>
												</svg>
											</button>
										</div>
									</div>
								</PopoverTrigger>
								<PopoverContent className="lg:hidden block w-screen h-[24rem]">
									<div className="flex flex-wrap justify-between items-center mx-auto w-full h-full">
										<div
											className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
											id="mobile-menu-2"
										>
											<ul className="flex flex-col mt-4 font-medium  gap-2">
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/"}>Home</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/job"}>
														Jobs
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/events"}>
														Events
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link
														to={"/success-stories"}
													>
														Success Stories
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/chat"}>
														Chat
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/donation"}>
														Donation
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/community"}>
														Community Hub
													</Link>
												</li>
												<li className="bg-slate-900 text-center text-indigo-200 rounded-full p-1">
													<Link to={"/alumni/list"}>
														Our Alumni
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}

export default Header;
