import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setFeedbacks } from "../redux/feedbackSlice";
import { toast } from "sonner";
import { COMMUNITY_API_END_POINT } from "../utils/constant";
import { setCommunity } from "../redux/communitySlice";

const useGetAllCommunity = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllCommunity = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${COMMUNITY_API_END_POINT}/`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					console.log(response.data.communities);
					toast(response.data.message);
					dispatch(setCommunity(response.data.communities));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllCommunity();
	}, []);
};

export default useGetAllCommunity;
