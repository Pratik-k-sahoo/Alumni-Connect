import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faComments } from "@fortawesome/free-solid-svg-icons";
import {Fade} from "react-awesome-reveal";


import {
	faLinkedin,
	faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import AlumniCard from "../Alumni/AlumniCard";

function TopAlumni({ alumni }) {
	return (
		<>
			<div className="bg-indigo-200 py-16 px-4">
				<Fade>
					<h2 className="text-5xl font-extrabold text-center text-maroon-700 mb-12">
						Meet our Top Alumni
					</h2>
					<div className="max-w-7xl mx-auto grid xl:grid-cols-4 justify-items-center gap-5 md:grid-cols-2">
						{alumni?.map((user, idx) => (
							<div key={idx}>
								<AlumniCard alumni={user} />
							</div>
						))}
					</div>

					<div className="w-full flex justify-center my-14">
						<Link to={"/alumni/list"}>
							<button className="btn btn-wide text-2xl">
								More Alumni
							</button>
						</Link>
					</div>
				</Fade>
			</div>
		</>
	);
}

export default TopAlumni;
