import React from "react";
import Header from "@/components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AdminApprovalTable from "./AdminApprovalTable";
import alumniRedg from "@/assets/alumniRedg.png";
import donation from "@/assets/donation.png";
import events from "@/assets/Events.png";
import job from "@/assets/job.png";
import mentorshipProgram from "@/assets/mentorshipProgram.png";
import Footer from "../../components/Footer/Footer";
import useGetAllUnapprovedAlumni from "../../hooks/useGetAllUnapprovedAlumni";
import { useSelector } from "react-redux";

function AdminDashboard() {
	useGetAllUnapprovedAlumni();
	const { alumniUnapproved } = useSelector((state) => state.auth);
	return (
		<>
			<Header />
			{/* Heading Section */}
			<div className="bg-indigo-200 min-h-[calc(100vh-64px)] pt-7 ">
				<div className="text-center">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				</div>

				{/* Cards Container */}
				<div className="container mx-auto px-4 text-white pb-5 max-w-7xl">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
						{/* Card 1 */}
						<div className="card card-side shadow-xl overflow-hidden bg-slate-900">
							<figure>
								<img src={alumniRedg} alt="Movie" />
							</figure>
							<div className="card-body bg-indigo-700 w-1/2">
								<h2 className="card-title text-2xl">
									Alumni Registration
								</h2>
								<p className="text-lg">Total: 5</p>
								<div className="card-actions justify-end">
									<button className="btn bg-slate-900 text-white hover:bg-slate-600 hover:scale-110">
										Watch
									</button>
								</div>
							</div>
						</div>

						<div className="card card-side shadow-xl overflow-hidden bg-slate-900">
							<figure className="w-1/2">
								<img src={donation} alt="Movie" />
							</figure>
							<div className="card-body bg-indigo-700 w-1/2">
								<h2 className="card-title text-2xl">
									Donation
								</h2>
								<p className="text-lg">Total: 5</p>
								<div className="card-actions justify-end">
									<button className="btn bg-slate-900 text-white hover:bg-slate-600 hover:scale-110">
										Watch
									</button>
								</div>
							</div>
						</div>

						<div className="card card-side shadow-xl overflow-hidden bg-slate-900">
							<figure className="w-1/2">
								<img src={events} alt="Movie" />
							</figure>
							<div className="card-body bg-indigo-700 w-1/2">
								<h2 className="card-title text-2xl">Events</h2>
								<p className="text-lg">Total: 5</p>
								<div className="card-actions justify-end">
									<button className="btn bg-slate-900 text-white hover:bg-slate-600 hover:scale-110">
										Watch
									</button>
								</div>
							</div>
						</div>

						<div className="card card-side shadow-xl overflow-hidden bg-slate-900">
							<figure className="w-1/2">
								<img src={job} alt="Movie" />
							</figure>
							<div className="card-body bg-indigo-700 w-1/2">
								<h2 className="card-title text-2xl">
									Job Postings
								</h2>
								<p className="text-lg">Total: 5</p>
								<div className="card-actions justify-end">
									<button className="btn bg-slate-900 text-white hover:bg-slate-600 hover:scale-110">
										Watch
									</button>
								</div>
							</div>
						</div>

						<div className="card card-side shadow-xl overflow-hidden bg-slate-900">
							<figure className="w-1/2">
								<img src={mentorshipProgram} alt="Movie" />
							</figure>
							<div className="card-body bg-indigo-700 w-1/2">
								<h2 className="card-title text-2xl">
									Mentorship Programs
								</h2>
								<p className="text-lg">Total: 5</p>
								<div className="card-actions justify-end">
									<button className="btn bg-slate-900 text-white hover:bg-slate-600 hover:scale-110">
										Watch
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-indigo-200 pb-8">
				<div className="max-w-7xl mx-auto h-full py-4 bg-white shadow-md px-7">
					<h1 className="font-bold text-xl my-5">
						Applicants ({alumniUnapproved.length})
					</h1>
					<AdminApprovalTable />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AdminDashboard;
