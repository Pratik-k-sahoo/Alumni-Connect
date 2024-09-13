import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/components";
import images from "@/assets/images.jpeg";
import MessagePage from "@/components/newChats/MessagePage";
import Sidebar from "@/components/newChats/Sidebar";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "@/socket";
import Footer from "../../components/Footer/Footer";

const Chat = () => {
	const params = useParams();
	const id = params.userId;
	const location = useLocation();
	const [dataUser, setDataUser] = useState({
		name: "",
		email: "",
		profilePic: "",
		online: false,
		_id: "",
	});
	const [openUpload, setOpenUpload] = useState(false);
	const [message, setMessage] = useState({
		text: "",
		imageUrl: "",
		videoUrl: "",
	});
	const [loading, setLoading] = useState(false);
	const [allMessage, setAllMessage] = useState([]);
	const currentMsg = useRef(null);
	const { user } = useSelector((state) => state.auth);
	const basePath = location.pathname === "/chat";
	useEffect(() => {
        if (user && socket) {
			socket.emit("message-page", id);
			socket.on("message-user", (data) => {
				setDataUser(data);
			});
			socket.on("message", (data) => {
				setAllMessage(data);
			});
		}
    }, [user, id]);
	return (
		<>
			<Header />
			<div className="lg:flex">
				{/* Chat history */}
				<Sidebar />

				{/* Vertical Line */}
				<div className="w-px border-4 border-red-900 bg-black lg:h-full"></div>
				{!user && (
					<div className="w-full lg:flex justify-center items-center flex-col gap-1">
						<div>
							<span className="text-5xl font-bold text-red-500 ml-5 drop-shadow-lg">
								LOGIN / SIGNUP
							</span>
						</div>
						<Link
							to={"/login"}
							className="text-blue-500 underline font-semibold"
						>
							Click to Login
						</Link>
						<Link
							to={"/register"}
							className="text-blue-500 underline font-semibold"
						>
							Click to Signup
						</Link>
					</div>
				)}

				{/* Chat Section */}
				{basePath && user && (
					<div className="flex justify-center items-center flex-col gap-2 w-full full">
						<div>
							<img
								className="inline"
								src={""}
								alt="logo"
								width={100}
							/>
							<span className="text-5xl font-bold text-red-500 ml-5 drop-shadow-lg">
								CHAT APP
							</span>
						</div>
						<p>Select user to send message</p>
					</div>
				)}
				{user && (
					<div
						className={`${basePath && "hidden"} ${
							!basePath && "w-full h-full"
						}`}
					>
						<Outlet />
					</div>
				)}
			</div>
            <Footer />
		</>
	);
};

export default Chat;
