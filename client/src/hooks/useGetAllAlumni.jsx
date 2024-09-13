import { ALUMNI_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAlumni, setLoading } from "../redux/authSlice";
import { useEffect } from "react";

const useGetAllAlumni = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllAlumni = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`${ALUMNI_API_END_POINT}/`, {
					withCredentials: true,
				});
				if (response.data.success) {
					dispatch(setAllAlumni(response.data.alumni));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllAlumni();
	}, [dispatch]);
};

export default useGetAllAlumni;
