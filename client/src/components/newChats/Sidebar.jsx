import React, { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";
import SearchUser from "./SearchUser";
import { socket } from "@/socket";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const [openSearchUser, setOpenSearchUser] = useState(false);
	const [search, setSearch] = useState("");
	const [allUsers, setAllUsers] = useState([]);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user && socket) {
			socket.emit("sidebar", user?._id);
			socket.on("chats", (data) => {
				setAllUsers(data);
			});
		}
	}, [user]);

	const handleChange = (e) => {
		setSearch(e.target.value);
		if (e.target.value.length != 0) {
			setOpenSearchUser(true);
		}
		if (e.target.value.length == 0) {
			setOpenSearchUser(false);
		}
	};
	return (
		<div className="w-full lg:w-2/5 bg-[#171d32] lg:sticky z-40 py-2">
			<div className="w-full">
				<hr className="p-0.5 bg-slate-300" />
				<div className="px-8 py-2 mx-4 rounded-md w-auto bg-[#171d32] text-left text-xl flex items-center">
					<input
						type="text"
						placeholder="Start chat"
						className="flex-grow px-6 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent mr-2"
						onChange={handleChange}
					/>
					{/* Inline SVG for Search Icon */}
					<div onClick={() => setOpenSearchUser(true)}>
						{/* Add your search icon here */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-6 text-white font-bold"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</div>
				</div>
				<hr className="p-0.5 bg-slate-300" />
				<div className="h-[calc(100vh-153px)] overflow-x-hidden overflow-y-auto">
					{/* {allUsers.length === 0 && (
						<p className="mx-3 py-12 text-center text-slate-400">
							Explore user to start a conversation.
						</p>
					)} */}
					{allUsers && (
						<div>
							{allUsers.map((userChat) => (
								<div key={userChat?._id}>
									{userChat.sender._id === user._id ? (
										<UserSearchCard
											user={userChat.receiver}
											latestMsg={
												userChat.messages[
													userChat.messages.length - 1
												]
											}
											tailwind={
												" px-3 py-2 mx-4 rounded-md w-auto text-left flex items-center text-white hover:bg-slate-400 focus:bg-slate-300 hover:text-black transition-colors duration-300 cursor-pointer focus:text-black"
											}
										/>
									) : (
										<UserSearchCard
											user={userChat.sender}
											latestMsg={
												userChat.messages[
													userChat.messages.length - 1
												]
											}
											tailwind={
												" px-3 py-2 mx-4 rounded-md w-auto text-left flex items-center text-white hover:bg-slate-400 focus:bg-slate-300 hover:text-black transition-colors duration-300 cursor-pointer focus:text-black"
											}
										/>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			{/* tailwind={
                        " px-3 py-2 mx-4 rounded-md w-auto text-left flex items-center text-white hover:bg-slate-400 focus:bg-slate-300 hover:text-black transition-colors duration-300 cursor-pointer focus:text-black"
                    } */}

			{openSearchUser && (
				<SearchUser
					search={search}
					onClose={() => setOpenSearchUser(false)}
				/>
			)}
		</div>
	);
};

export default Sidebar;
