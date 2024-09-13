import React, { useEffect, useState } from "react";
import {Fade} from "react-awesome-reveal"
const TestimonialCard = ({
	testimonials,
	tailwind = "",
}) => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonial((prevIndex) =>
				prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000);
		return () => clearInterval(interval);
	}, [testimonials.length]);
	return (
		<div
			className={`bg-slate-900 p-6 rounded-lg shadow-xl transition-transform transform-gpu duration-1000 ease-in-out w-full max-w-lg mx-4 text-white ${tailwind}`}
		>
			<h1 className="text-2xl font-bold text-center mb-4 underline">
				Testimonials
			</h1>
			<Fade>
			<div className="flex items-center">
				<img
					src={
						testimonials[currentTestimonial]?.created_by?.profile
							?.profileImage
					}
					alt="avatar"
					className="w-16 h-16 rounded-full mr-4 border-2 border-white"
				/>
				<div>
					<h3 className="text-lg font-semibold">
						{testimonials[currentTestimonial]?.created_by?.fullname}
					</h3>
					<p className="text-xl font-kalam text-indigo-200">
						"{testimonials[currentTestimonial]?.content}"
					</p>
				</div>
			</div>
				</Fade>
			
		</div>
	);
};

export default TestimonialCard;
