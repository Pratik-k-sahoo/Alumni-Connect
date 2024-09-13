import { POST_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setAdminEvents, setPostsByEvent } from "../redux/eventSlice";
import { toast } from "sonner";

const useGetAllPostsByEvent = (id) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllPostsByEvent = async (id) => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${POST_API_END_POINT}/${id}`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(setPostsByEvent(response.data.posts));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllPostsByEvent(id);
	}, [dispatch]);
};

export default useGetAllPostsByEvent;
