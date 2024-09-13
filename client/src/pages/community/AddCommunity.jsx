import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { uploadFile } from "@/helper/uploadFile";
import Loading from "../../components/newChats/Loading";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { COMMUNITY_API_END_POINT } from "../../utils/constant";
import Footer from "../../components/Footer/Footer";

const AddCommunity = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		data: "",
	});

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = async (e) => {
		try {
			dispatch(setLoading(true));
			const uploadPhoto = await uploadFile(e.target.files?.[0]);
			setFormData((prev) => ({
				...prev,
				data: uploadPhoto.secure_url,
			}));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleSubmit = async (e) => {
		dispatch(setLoading(true));
		e.preventDefault();
		try {
			const response = await axios.post(
				`${COMMUNITY_API_END_POINT}/add`,
				formData,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast(response.data.message);
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-auto border border-black p-4">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 items-center max-w-7xl"
			>
				<div className="grid grid-cols-2 items-center mx-auto gap-x-10 gap-y-5">
					<div className="flex items-center gap-3 justify-between">
						<Label>Title</Label>
						<Input
							name="title"
							value={formData.title}
							onChange={handleEventChange}
						/>
					</div>
					<div className="flex items-center gap-3">
						<Label>Description</Label>
						<Input
							name="description"
							value={formData.description}
							onChange={handleEventChange}
						/>
					</div>
					<div className="flex items-center gap-3">
						<Label>Photo</Label>
						<Input
							disabled={formData.content_type === "video"}
							type="file"
							accept="image/*"
							onChange={handleFileChange}
						/>
					</div>
				</div>
				<Button type="submit">
					{loading && <Loading />}
					{!loading && "Submit"}
				</Button>
			</form>
            <Footer />
		</div>
	);
};

export default AddCommunity;
