import React, { useState, useEffect } from "react";
import { Header } from "@/components";
import { useSelector } from "react-redux";
import useGetAllFeedbacks from "../../hooks/useGetAllFeedbacks";
import TestimonialCard from "../../components/testimonials/TestimonialCard";

function Testimonial() {
	useGetAllFeedbacks();
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const { feedbacks } = useSelector((state) => state.feedback);
	const [testimonials, setTestimonials] = useState(feedbacks);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonial((prevIndex) =>
				prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000);
		return () => clearInterval(interval);
	}, [feedbacks.length]);

	return (
		<>
			<Header />
			<div className="flex items-center justify-center min-h-screen bg-indigo-200">
				<TestimonialCard
					testimonials={testimonials}
					currentTestimonial={currentTestimonial}
				/>
			</div>
		</>
	);
}

export default Testimonial;
