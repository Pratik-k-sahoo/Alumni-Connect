import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@/components";
import { ALUMNI_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { login, setAlumni, setLoading } from "@/redux/authSlice";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [formData, setFormData] = useState({ role: "student" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

    const handleEventChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
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
        const user = response.data.user;
        if (response.data.user.role === "alumni") {
          try {
            const responses = await axios.get(
              `${ALUMNI_API_END_POINT}/${response.data.user._id}`,
              {
                withCredentials: true,
              }
            );
            if (responses.data.success) {
              toast.success(responses.data.message);
              dispatch(setAlumni(responses.data.alumni));
            }
          } catch (error) {
            console.log(error);
            if (error.response) {
              toast.error(error.response.data.message);
            }
          }
        }
        dispatch(login(user));
        localStorage.setItem("token", response.data.token);
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
    <>
      <Header />
      <div>
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-1/2 border border-gray-500 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5 text-center">
              Log<span className="text-red-600">in</span>
            </h1>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="email"
                name="email"
                onChange={handleEventChange}
                value={formData.email}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="on"
                name="password"
                onChange={handleEventChange}
                value={formData.password}
              />
            </div>

            <div>
              <RadioGroup
                defaultValue="student"
                name="role"
                onChange={handleEventChange}
              >
                <div className="flex items-center flex-wrap gap-5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alumni" id="alumni" />
                    <Label htmlFor="alumni">Alumni</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button disabled className="w-full mt-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            )}
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-600">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
