import React, { useState, useEffect } from "react";
import { Header } from "@/components";
import { useSelector } from "react-redux";
import FAQList from "@/components/HomePage/FAQ";
import PricePlan from "@/components/HomePage/PricePlan";
import News from "@/components/HomePage/News";
import TopAlumni from "@/components/HomePage/TopAlumni";
import MainContent from "@/components/HomePage/MainContent";
import LandPage from "@/components/HomePage/LandPage";
import Gallery from "@/components/HomePage/Gallery";
import { LandingHowItWorks } from "@/components/HomePage/LandingHowItWorks";
import { LandingPainPoints } from "@/components/HomePage/LandingPainPoints";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import useGetAllCommunity from "@/hooks/useGetAllCommunity";
import useGetAllFeedbacks from "@/hooks/useGetAllFeedbacks";
import useGetAllApprovedEvents from "@/hooks/useGetAllApprovedEvents";
import useGetAllAlumni from "@/hooks/useGetAllAlumni";
import Footer from "../components/Footer/Footer";
import Banner from "@atlaskit/banner";
import { Fade } from "react-awesome-reveal";
import Service from "../components/HomePage/UpcomingFeatures";
// Autoplay Carousal / Slider

const painPoints = [
	{
		emoji: "😕",
		title: "Disconnected from Peers",
	},
	{
		emoji: "👨‍🏫",
		title: "Mentorship Program",
	},
	{
		emoji: "🔍",
		title: "Lack of Networking Opportunities",
	},
];

const steps = [
	{
		heading: "Register",
		description:
			"Join the alumni association with a simple registration process.",
	},
	{
		heading: "Update Profile",
		description: "Keep your profile updated to stay connected with peers.",
	},
	{
		heading: "Engage",
		description: "Participate in networking opportunities and events.",
	},
	{
		heading: "Contribute",
		description:
			"Support your alma mater through donations and sharing success stories.",
	},
];

function Home() {
	useGetAllCommunity();
	useGetAllFeedbacks();
	useGetAllApprovedEvents();
	useGetAllAlumni();

	const { feedbacks } = useSelector((state) => state.feedback);
	const [testimonials, setTestimonials] = useState(feedbacks);
	const { user, alumniList } = useSelector((state) => state.auth);
	const { approvedEvents } = useSelector((state) => state.event);
	const [events, setEvents] = useState(approvedEvents?.slice(0, 5));
	const filterAlumni = alumniList?.slice(0, 4);

	useEffect(() => {
		const bannerDiv = document.querySelector("#banner");
		if (bannerDiv) {
			setTimeout(() => {
				bannerDiv.style.display = "none";
			}, 5000);
		}
	}, []);

	return (
		<React.Fragment className="bg-indigo-200">
			<div className="flex justify-center bg-[#42526e]" id="banner">
				<Banner appearance="announcement">
					Our Mobile app is launching soon! Stay Tuned.
				</Banner>
			</div>
			<Fade>
				<Header />
			</Fade>
			{/* page-1 */}
			<div className="min-h-[calc(100vh-64px)]">
				<Fade>
					{/* Header Section */}
					<LandPage />

					{/* Challenges show casing */}
					{!user && (
						<LandingPainPoints
							title="Challenges Alumni Face"
							painPoints={painPoints}
							className={"bg-indigo-200"}
						/>
					)}
				</Fade>
				{/* How it works */}

				{!user && (
					<LandingHowItWorks
						className={"bg-indigo-200"}
						title="How It Works"
						steps={steps}
					/>
				)}

				{/* Main Content */}

				<MainContent events={events} />

				{/* Top Alumni */}

				<TopAlumni alumni={filterAlumni} />

				{/* Testimonials */}
				<div className="bg-indigo-200 pb-28">
					<TestimonialCard
						testimonials={testimonials}
						tailwind={"mx-auto"}
					/>
				</div>

				{/* News Section */}

				<News />

				{/* Gallery */}

				<Gallery />

				{/* PricePlan */}
				<PricePlan />

				<Service />

				{/* FAQ Section */}
				<FAQList />

				<Footer />
			</div>
		</React.Fragment>
	);
}

export default Home;
