import { ALUMNI_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlumniUnapproved, setLoading } from "../redux/authSlice";
import { useEffect } from "react";

const useGetAllUnapprovedAlumni = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllUnapprovedAlumnis = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${ALUMNI_API_END_POINT}/get/unapproved`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(
						setAlumniUnapproved(response.data.alumniUnapproved)
					);
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllUnapprovedAlumnis();
	}, []);
};

export default useGetAllUnapprovedAlumni;
