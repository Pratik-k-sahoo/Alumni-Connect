import LandPage from "./components/HomePage/LandPage";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useLocation,
	useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/auth/Profile";
import AlumniRegister from "./pages/auth/AlumniRegister";
import Chat from "./pages/chats/Chat";
import MessagePage from "./components/newChats/MessagePage";
import JobApplicants from "./pages/jobs/JobApplicants";
import Jobs from "./pages/jobs/Jobs";
import AddJobPage from "./pages/jobs/AddJobPage";
import JobDescription from "./pages/jobs/JobDescription";
import Stories from "./pages/stories/Stories";
import { socket } from "./socket";
import { setOnline } from "./redux/authSlice";
import PostPage from "./pages/Posts/PostPage";
import Events from "./pages/events/Events";
import AddEventPage from "./pages/events/AddEventPage";
import AdminEvents from "./pages/events/AdminEvents";
import AddPost from "./pages/Posts/AddPost";
import useGetAllPostsByEvent from "./hooks/useGetAllPostsByEvent";
import MentorshipDashboard from "./pages/mentorship/MentorshipDashboard";
import MentorshipHomePage from "./pages/mentorship/MentorshipHomePage";
import MentorshipListPage from "./pages/mentorship/MentorshipListPage";
import MyMentorshipPage from "./pages/mentorship/myMentorshipPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import BecomeMentorPage from "./pages/mentorship/BecomeMentorPage";
import Alumni_directory from "./pages/alumni _directory/Alumni_directory";
import CommunityHub from "./pages/community/CommunityHub";
import AddCommunity from "./pages/community/AddCommunity";
import Donation from "./pages/donation/Donation";
import useGetAllCommunity from "@/hooks/useGetAllCommunity";
import useGetAllFeedbacks from "@/hooks/useGetAllFeedbacks";
import useGetAllApprovedEvents from "@/hooks/useGetAllApprovedEvents";
import useGetAllAlumni from "@/hooks/useGetAllAlumni";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "alumni/:id/register",
		element: <AlumniRegister />,
	},
	{
		path: "chat",
		element: <Chat />,
		children: [
			{
				path: ":id",
				element: <MessagePage />,
			},
		],
	},
	{
		path: "admin/jobs/:id/applicants",
		element: <JobApplicants />,
	},
	{
		path: "job",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <Jobs />,
			},
			{
				path: "add-job",
				element: <AddJobPage />,
			},
			{
				path: ":id",
				element: <JobDescription />,
			},
		],
	},
	{
		path: "success-stories",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <Stories />,
			},
		],
	},
	{
		path: "events",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <Events />,
			},
			{
				path: ":id",
				element: <PostPage />,
			},
			{
				path: "add-event",
				element: <AddEventPage />,
			},
			{
				path: "admin/approve",
				element: <AdminEvents />,
			},
			{
				path: "add-post",
				element: <AddPost />,
			},
		],
	},
	{
		path: "/mentorship",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <MentorshipHomePage />,
			},
			{
				path: "mentorship-list",
				element: <MentorshipListPage />,
			},
			{
				path: "become-mentor",
				element: <BecomeMentorPage />,
			},
			{
				path: "my-mentorships",
				element: <MyMentorshipPage />,
			},
			{
				path: "mentorship-dashboard",
				element: <MentorshipDashboard />,
			},
		],
	},
	{
		path: "alumni/list",
		element: <Alumni_directory />,
	},

	{
		path: "donation",
		element: <Donation />,
	},
	{
		path: "community",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <CommunityHub />,
			},
			{
				path: "add-community",
				element: <AddCommunity />,
			},
		],
	},
	{
		path: "admin",
		element: <AdminDashboard />,
	},
]);

function App() {
    useGetAllCommunity();
	useGetAllFeedbacks();
	useGetAllApprovedEvents();
	useGetAllAlumni();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			socket.connect();
			socket.on("online-users", (data) => {
				dispatch(setOnline(data));
			});
		}
	}, [user]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
