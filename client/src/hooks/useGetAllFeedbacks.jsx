import { FEEDBACK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setFeedbacks } from "../redux/feedbackSlice";
import { toast } from "sonner";

const useGetAllFeedbacks = () => {
    
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllFeedbacks = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`${FEEDBACK_API_END_POINT}/`, {
					withCredentials: true,
				});
				if (response.data.success) {
					dispatch(setFeedbacks(response.data.feedbacks));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllFeedbacks();
	}, []);
};

export default useGetAllFeedbacks;
