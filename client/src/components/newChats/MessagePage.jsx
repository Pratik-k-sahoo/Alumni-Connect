import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadFile } from "@/helper/uploadFile";
import { socket } from "@/socket";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaImage, FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Loading from "./Loading";
import moment from "moment";

const MessagePage = () => {
	const params = useParams();
	const id = params.id;
	const { user } = useSelector((state) => state.auth);
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

	const handleUploadVideo = async (e) => {
		try {
			setLoading(true);
			setOpenUpload(false);
			const uploadVideo = await uploadFile(e.target.files?.[0]);
			setMessage({ ...message, videoUrl: uploadVideo.url });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleUploadImage = async (e) => {
		try {
			setLoading(true);
			setOpenUpload(false);
			const uploadImage = await uploadFile(e.target.files?.[0]);
			setMessage({ ...message, imageUrl: uploadImage.url });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		try {
			if (message.text || message.imageUrl || message.videoUrl) {
				if (socket && user) {
					socket.emit("send-message", {
						sender: user?._id,
						receiver: id,
						text: message.text,
						imageUrl: message.imageUrl,
						videoUrl: message.videoUrl,
					});
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setMessage({
				text: "",
				imageUrl: "",
				videoUrl: "",
			});
		}
	};

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
        console.log("All messages set", allMessage);
	}, [id, user]);

	useEffect(() => {
		if (currentMsg) {
			currentMsg?.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
		console.log("All messages", allMessage);
	}, [allMessage]);

	return (
		<div className="relative overflow-y-auto">
			<div className="px-4 pt-3 mx-2 py-1 flex items-center justify-between rounded-md text-slate-900 w-[calc(100%-2rem)]">
				<div className="flex items-center gap-2">
					<img
						src={dataUser?.profilePic}
						alt={dataUser?.name}
						className="w-14 h-14 rounded-full object-cover mr-4 border border-white"
					/>
					<div className="flex flex-col flex-grow">
						<p className="text-xl font-bold">{dataUser?.email}</p>
						<p className="text-xs">
							{dataUser?.online ? "Online" : "Offline"}
						</p>
					</div>
				</div>
				<div className="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</div>
			</div>

			<div className="border-b-2 border-gray-800 mt-1"></div>

			{/* Show all message */}

			<div className="bg-indigo-200 h-[calc(100vh-215px)]  overflow-y-auto">
				<div className="flex flex-col gap-2 py-5 mx-2" ref={currentMsg}>
					{allMessage?.map((msg, index) =>
						msg.messageBy !== user._id ? (
							<div key={index} className="chat chat-start">
								<div className="chat-bubble">
									{msg.imageUrl && (
										<div className="flex flex-col gap-3">
											<img
												src={msg.imageUrl}
												alt="image"
												className="w-72 aspect-square rounded-2xl"
											/>
											<p className="text-xs ml-auto w-fit">
												{moment(
													message.updatedAt
												).format("hh:mm")}
											</p>
										</div>
									)}
									{msg.videoUrl && (
										<div>
											<video
												src={msg.videoUrl}
												controls
												alt="image"
												className="w-72 aspect-square rounded-2xl"
											/>
											<p className="text-xs ml-auto w-fit">
												{moment(
													message.updatedAt
												).format("hh:mm")}
											</p>
										</div>
									)}
									{msg.text.length > 0 &&
										(msg.text.startsWith("http") ||
											msg.text.startsWith("www")) && (
											<div>
												<div className="w-fit text-[#abddff] underline">
													<a
														target="_blank"
														href={msg.text}
													>
														{msg.text}
													</a>
												</div>
												<p className="text-xs ml-auto w-fit">
													{moment(
														message.updatedAt
													).format("hh:mm")}
												</p>
											</div>
										)}
									{msg.text.length > 0 &&
										!(
											msg.text.startsWith("http") ||
											msg.text.startsWith("www")
										) && (
											<div>
												<div className="w-fit">
													<p>{msg.text}</p>
												</div>
												<p className="text-xs ml-auto w-fit">
													{moment(
														message.updatedAt
													).format("hh:mm")}
												</p>
											</div>
										)}
								</div>
							</div>
						) : (
							<div key={index} className="chat chat-end">
								<div className="chat-bubble">
									{msg.imageUrl && (
										<div className="flex flex-col gap-3">
											<img
												src={msg.imageUrl}
												alt="image"
												className="w-72 aspect-square rounded-2xl"
											/>
											<p className="text-xs ml-auto w-fit">
												{moment(
													message.updatedAt
												).format("hh:mm")}
											</p>
										</div>
									)}
									{msg.videoUrl && (
										<div>
											<video
												src={msg.videoUrl}
												controls
												alt="image"
												className="w-72 aspect-square rounded-2xl"
											/>
											<p className="text-xs ml-auto w-fit">
												{moment(
													message.updatedAt
												).format("hh:mm")}
											</p>
										</div>
									)}
									{msg.text.length > 0 &&
										(msg.text.startsWith("http") ||
											msg.text.startsWith("www")) && (
											<div>
												<div className="w-fit text-[#abddff] underline">
													<a
														target="_blank"
														href={msg.text}
													>
														{msg.text}
													</a>
												</div>
												<p className="text-xs ml-auto w-fit">
													{moment(
														message.updatedAt
													).format("hh:mm")}
												</p>
											</div>
										)}
									{msg.text.length > 0 &&
										!(
											msg.text.startsWith("http") ||
											msg.text.startsWith("www")
										) && (
											<div>
												<div className="w-fit">
													<p>{msg.text}</p>
												</div>
												<p className="text-xs ml-auto w-fit">
													{moment(
														message.updatedAt
													).format("hh:mm")}
												</p>
											</div>
										)}
								</div>
							</div>
						)
					)}
				</div>
			</div>

			{/* Upload Image display */}

			{/* loading
				// {loading && (
				// 	<div className="w-full h-full bg-slate-600 flex justify-center items-center rounded overflow-hidden sticky bottom-0 bg-opacity-50">
				// 		<Loading />
				// 	</div>
				// )} */}

			{/* Upload Video display */}

			{/* Send message */}
			<div className="bg-indigo-200 shadow p-4 left-0 flex items-center rounded-md sticky z-40 bottom-0 w-full">
				<button
					type="button"
					className="text-gray-500 mr-2 "
					onClick={() => setOpenUpload((prev) => !prev)}
				>
					<div className="flex items-center">
						{/* Emoji Icon */}

						{/* File Upload Icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							className="w-6 h-6 text-black"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
							/>
						</svg>
					</div>
				</button>

				{/* video and image popup */}
				{openUpload && (
					<div className="bg-white rounded absolute bottom-16 w-36 p-2">
						<form>
							<label
								htmlFor="uploadImage"
								className="flex items-center p-2 gap-3 cursor-pointer hover:bg-slate-200 px-3"
							>
								<div>
									<FaImage size={18} />
								</div>
								<p>Image</p>
							</label>
							<label
								htmlFor="uploadVideo"
								className="flex items-center p-2 gap-3 cursor-pointer hover:bg-slate-200 px-3"
							>
								<div>
									<FaVideo size={18} />
								</div>
								<p>Video</p>
							</label>
							<input
								type="file"
								accept="image/*"
								id="uploadImage"
								onChange={handleUploadImage}
								hidden
							/>
							<input
								type="file"
								accept="video/*"
								id="uploadVideo"
								onChange={handleUploadVideo}
								hidden
							/>
						</form>
					</div>
				)}

				<form onSubmit={handleSendMessage} className="w-full flex">
					<input
						type="text"
						placeholder="Type a message..."
						value={message.text}
						onChange={(e) =>
							setMessage({
								...message,
								text: e.target.value,
							})
						}
						disabled={loading}
						className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
					/>
					<button
						type="submit"
						disabled={loading}
						className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<IoSend />
					</button>
				</form>
			</div>
			{message.imageUrl && (
				<div className="w-full h-full bg-slate-600 flex justify-center items-center rounded overflow-hidden absolute bottom-0 bg-opacity-50 border-4 border-red-900">
					<div
						className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-white"
						onClick={() => setMessage({ ...message, imageUrl: "" })}
					>
						<IoCloseCircleOutline size={30} />
					</div>
					<div className=" bg-white p-3">
						<img
							src={message.imageUrl}
							alt="uploadImage"
							className="aspect-square w-full h-full max-w-md object-scale-down"
						/>
					</div>
				</div>
			)}
			{message.videoUrl && (
				<div className="w-full h-full bg-slate-600 flex justify-center items-center rounded overflow-hidden absolute bottom-0 bg-opacity-50 ">
					<div
						className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-white"
						onClick={() => setMessage({ ...message, videoUrl: "" })}
					>
						<IoCloseCircleOutline size={30} />
					</div>
					<div className=" bg-white p-3">
						<video
							src={message.videoUrl}
							controls
							alt="uploadVideo"
							className="aspect-square w-full h-full max-w-md object-scale-down"
						/>
					</div>
				</div>
			)}
			{loading && (
				<Loading
					tailwind={
						"absolute bottom-0 h-full w-full flex justify-center items-center bg-black opacity-60"
					}
				/>
			)}
		</div>
	);
};

export default MessagePage;
