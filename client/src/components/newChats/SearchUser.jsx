import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import { USER_API_END_POINT } from "@/utils/constant";

const SearchUser = ({ onClose, search }) => {
	const [searchUser, setSearchUser] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filterSearch, setFilterSearch] = useState(searchUser);
	const { user } = useSelector((state) => state.auth);

	const handleSearchUser = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${USER_API_END_POINT}/chat/search`,
				{
					search: search,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			console.log(response.data);

			if (response.data.success) {
				toast.success(response.data.message);
				setSearchUser(response.data.users);
			}
		} catch (error) {
			if (error.response?.data) {
				toast.error(error.response.data.message);
			} else console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
			handleSearchUser();
		}, 2000);
		return () => {
			clearTimeout(timer);
			setLoading(false);
		};
	}, [search]);

	useEffect(() => {
		const filter = searchUser.filter(
			(searchItem) => searchItem?._id !== user?._id
		);
		setFilterSearch(filter);
	}, [searchUser]);

	return (
		<div>
			<div className="fixed w-[27rem] top-20 bottom-0 p-2 z-10 mt-16">
				<div className="w-full max-w-lg mx-auto mt-10">
					{/**display search user */}
					<div className="bg-white mt-2 w-full p-4 rounded relative -top-12">
						{/**no user found */}
						{searchUser.length === 0 && !loading && (
							<p className="text-center text-slate-500">
								no user found! with {search}
							</p>
						)}

						{loading && (
							<p>
								<Loading />
							</p>
						)}

						{searchUser.length !== 0 &&
							!loading &&
							filterSearch.map((user, index) => {
								return (
									<UserSearchCard
										key={user._id}
										user={user}
										onClose={onClose}
									/>
								);
							})}
					</div>
				</div>

				<div
					className="absolute -top-[62px] -right-1 text-2xl p-2 lg:text-4xl text-white"
					onClick={onClose}
				>
					<button>
						<IoClose />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchUser;
