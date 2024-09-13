import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function MyMentorshipPage() {
	return (
		<>
			<Header />
			<div className="bg-indigo-200 min-h-screen flex flex-col items-center justify-center">
				<div className="w-full max-w-screen-xl px-4">
					<h1 className="text-4xl font-bold text-center mb-2">
						My Mentorships
					</h1>
					<p className="text-center mb-6 text-2xl">
						View and Manage your current and past mentorships.
					</p>

					<div className="flex-col w-2/3 mx-auto rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface mb-4">
						<div className="border-b-2 border-neutral-100 px-6 py-3 bg-slate-900 ">
							<h5 className=" text-xl font-medium leading-tight mb-2 text-white ">
								Session with{" "}
								<span className="text-red-600 ">
									Aman Raj Sahu
								</span>
							</h5>
							<p className="text-md leading-normal text-white dark:text-gray-400 tracking-wide">
								Cyber Security
							</p>
						</div>
						<div className="px-6 py-4">
							<p className="mb-2 text-base px-3">
								<span className="mb-2 font-medium leading-tight">
									Date :
								</span>
								&nbsp;September 15, 2024
							</p>

							<p className="mb-2 text-base px-3">
								<span className=" font-medium leading-tight">
									Status :
								</span>
								&nbsp;Scheduled
							</p>
							<div className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-3">
								<button
									type="button"
									href="#"
									className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong mb-3 sm:mb-0"
									data-twe-ripple-init
									data-twe-ripple-color="light"
								>
									Provide Feedback
								</button>
								<p className="text-base text-center sm:text-right sm:mt-2 sm:mr-3">
									<span className="font-medium leading-tight">
										Time :
									</span>{" "}
									&nbsp;18:30
								</p>
							</div>
						</div>
					</div>
					<div className="flex-col w-2/3 mx-auto rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface mb-4">
						<div className="border-b-2 border-neutral-100 px-6 py-3  bg-slate-900  text-white">
							<h5 className=" text-xl font-medium leading-tight mb-2">
								Session with{" "}
								<span className="text-red-600 ">Mina Rani</span>
							</h5>
							<p className="text-md leading-normal text-white  dark:text-gray-400 tracking-wide">
								Cloud Computing
							</p>
						</div>
						<div className="px-6 py-4">
							<p className="mb-2 text-base px-3">
								<span className="mb-2 font-medium leading-tight">
									Date :
								</span>
								&nbsp;August 04, 2024
							</p>

							<p className="mb-2 text-base px-3">
								<span className="mb-2 font-medium leading-tight">
									Status :
								</span>
								&nbsp;Completed
							</p>
							<div className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-3">
								<button
									type="button"
									href="#"
									className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong mb-3 sm:mb-0"
									data-twe-ripple-init
									data-twe-ripple-color="light"
								>
									Provide Feedback
								</button>
								<p className="text-base text-center sm:text-right sm:mt-2 sm:mr-3">
									<span className="font-medium leading-tight">
										Time :
									</span>{" "}
									&nbsp;12:00
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default MyMentorshipPage;
