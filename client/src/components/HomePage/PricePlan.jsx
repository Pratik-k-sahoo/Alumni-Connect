import React from "react";
import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import {Fade} from "react-awesome-reveal";


function PricePlan() {
	const [selectedPlan, setSelectedPlan] = useState("Pro"); // Default selected plan

	const handlePlanSelection = (plan) => {
		setSelectedPlan(plan);
	};
	return (
		<div className="flex flex-col items-center justify-center py-12 bg-indigo-200 w-full">
				<Fade>
				<h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
				<p className="text-gray-600 mb-8">
					Find the perfect plan to stay connected and engaged.
				</p>

				<div className="flex flex-wrap gap-8 justify-center">
					<div
						className={`md:w-full lg:w-80 max-w-xl p-6 bg-white border rounded-lg shadow-2xl text-center h-fit cursor-pointer ${
							selectedPlan === "Premium"
								? "border-blue-500 border-2"
								: ""
						}`}
						onClick={() => handlePlanSelection("Premium")}
					>
						<h3 className="text-xl font-semibold mb-2">Free</h3>
						<div className="text-4xl font-bold mb-4 flex items-end justify-center">
							<FaRupeeSign />0
							<span className="text-lg font-normal">/month</span>
						</div>
						<ul className="text-gray-600 mb-6">
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Effortless
								Registration
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Profile Updates
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Job Networking
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Event Updates
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Secure Donations
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Success Stories
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Community
								Engagement
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">❌</span> Mentorship
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">❌</span> Chat with
								Alumni
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">❌</span> Top Courses
							</li>
						</ul>
						<button className="btn btn-outline w-full py-2 font-bold">
							Get Started
						</button>
					</div>
					{/* Pro Plan */}
					<div
						className={`md:w-full lg:w-80 p-6 bg-white border rounded-lg shadow-2xl text-center h-fit cursor-pointer ${
							selectedPlan === "Pro"
								? "border-orange-500 border-2"
								: ""
						} relative`}
						onClick={() => handlePlanSelection("Pro")}
					>
						{selectedPlan === "Pro" && (
							<span className="absolute top-0 right-0 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
								Popular
							</span>
						)}
						<h3 className="text-xl font-semibold mb-2">Pro</h3>
						<div className="text-4xl font-bold mb-4 flex items-end justify-center">
							<FaRupeeSign />
							149
							<span className="text-lg font-normal">/month</span>
						</div>
						<ul className="text-gray-600 mb-6">
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Effortless
								Registration
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Profile Updates
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Job Networking
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Event Updates
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Secure Donations
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Success Stories
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Community
								Engagement
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Mentorship
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Chat with Alumni
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span> Top Courses
							</li>
							<li className="flex items-center justify-center">
								<span className="mr-2">✓</span>Post Event Content Access
							</li>
						</ul>
						<button className="btn btn-primary w-full py-2 font-bold">
							Get Started
						</button>
					</div>
				</div>
		</Fade>
			</div>
	);
}

export default PricePlan;
