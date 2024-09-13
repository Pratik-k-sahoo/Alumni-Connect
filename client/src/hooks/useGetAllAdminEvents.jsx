import { EVENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setAdminEvents } from "../redux/eventSlice";

const useGetAllAdminEvents = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllAdminEvents = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`${EVENT_API_END_POINT}/admin`, {
					withCredentials: true,
				});
				if (response.data.success) {
					dispatch(setAdminEvents(response.data.events));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllAdminEvents();
	}, [dispatch]);
};

export default useGetAllAdminEvents;
