import { EVENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setApprovedEvents } from "../redux/eventSlice";
import { toast } from "sonner";

const useGetAllApprovedEvents = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllApprovedEvents = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`${EVENT_API_END_POINT}/`, {
					withCredentials: true,
				});
				if (response.data.success) {
                    toast.success(response.data.message);
					dispatch(setApprovedEvents(response.data.events));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllApprovedEvents();
	}, [dispatch]);
};

export default useGetAllApprovedEvents;
