import moment from "moment";
import React from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserSearchCard = ({
	user,
	onClose,
	latestMsg,
	tailwind = "flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer",
}) => {
	const { onlineUsers } = useSelector((state) => state.auth);
	const isOnline = onlineUsers.includes(user?._id);
	return (
		<div>
			<Link
				to={"/chat/" + user?._id}
				onClick={onClose}
				className={tailwind}
			>
				<img
					src={user.profile.profileImage}
					alt="Profile"
					className="w-16 h-16 rounded-full object-cover mr-3 border-2 border-white aspect-square"
				/>

				<div className="flex flex-col gap-2 justify-center w-full">
					<p className="text-xl font-bold">{user.fullname}</p>
					{latestMsg && (
						<div className="flex justify-between items-center">
							<div className="flex gap-3 items-center justify-start">
								{latestMsg.imageUrl && <FaImage size={30} />}
								{latestMsg.videoUrl && <FaVideo size={30} />}
								<p className="text-sm w-full text-ellipsis line-clamp-1">
									{latestMsg.text}
								</p>
							</div>
							<p className="text-xs ml-auto w-fit">
								{moment(latestMsg.updatedAt).format("hh:mm")}
							</p>
						</div>
					)}
				</div>
			</Link>
		</div>
	);
};

export default UserSearchCard;
