import React, { useState } from "react";
import { Header } from "@/components";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { ALUMNI_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AlumniRegister = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;
  const handleEventChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${ALUMNI_API_END_POINT}/${userId}/register`,
        formData,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
		<div>
			<Header />
			<div className="flex items-center justify-center max-w-7xl mx-auto">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4 w-1/2 border border-gray-500 rounded-md p-4 my-10"
				>
					<h1 className="font-bold text-xl mb-5 text-center">
						Alumni<span className="text-red-600">Details</span>
					</h1>
					<div>
						<Label htmlFor="achievements">
							Achievements<span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="achievements"
							placeholder="Achievements"
							name="achievements"
							onChange={handleEventChange}
							value={formData?.achievements}
							required
						/>
					</div>
					<div>
						<Label htmlFor="linkedIn">LinkedIn</Label>
						<Input
							type="url"
							id="linkedIn"
							placeholder="LinkedIn"
							name="linkedin"
							onChange={handleEventChange}
							value={formData?.linkedin}
						/>
					</div>
					<div>
						<Label htmlFor="github">Github</Label>
						<Input
							type="url"
							id="github"
							placeholder="Github"
							name="github"
							onChange={handleEventChange}
							value={formData?.github}
						/>
					</div>

					{loading ? (
						<Button disabled className="w-full mt-4">
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Please wait
						</Button>
					) : (
						<Button type="submit" className="w-full mt-4">
							Register
						</Button>
					)}
				</form>
			</div>
		</div>
  );
};

export default AlumniRegister;
