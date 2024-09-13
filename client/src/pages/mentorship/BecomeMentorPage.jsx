import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const BecomeMentorPage = () => {
	return (
		<>
			<Header />
			<div className="max-w-2xl mx-auto p-6 bg-indigo-200">
				{/* Header */}
				<h1 className="text-3xl font-bold text-center mb-4">
					Become a Mentor
				</h1>
				<p className="text-center text-gray-600 mb-8">
					Fill out the form below to offer your guidance to others.
				</p>

				{/* Form */}
				<form className="space-y-6">
					{/* Bio Input */}
					<div>
						<label
							htmlFor="bio"
							className="block text-sm font-medium text-gray-700"
						>
							Bio <span className="text-red-600">*</span>
						</label>
						<textarea
							id="bio"
							name="bio"
							rows="4"
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Write a short bio about yourself"
						></textarea>
					</div>

					{/* Expertise Input */}
					<div>
						<label
							htmlFor="expertise"
							className="block text-sm font-medium text-gray-700"
						>
							Expertise <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="expertise"
							name="expertise"
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Enter your area of expertise"
						/>
					</div>

					{/* LinkedIn URL Input */}
					<div>
						<label
							htmlFor="linkedin"
							className="block text-sm font-medium text-gray-700"
						>
							LinkedIn URL
						</label>
						<input
							type="url"
							id="linkedin"
							name="linkedin"
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Enter your LinkedIn profile URL"
						/>
					</div>

					{/* Resume Upload */}
					<div>
						<label
							htmlFor="resume"
							className="block text-sm font-medium text-gray-700"
						>
							Resume
						</label>
						<div className="mt-1 flex items-center">
							<input
								type="file"
								id="resume"
								name="resume"
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							/>
						</div>
					</div>

					{/* Availability */}
					<div>
						<button
							type="button"
							className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
						>
							Add Availability
						</button>
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default BecomeMentorPage;
