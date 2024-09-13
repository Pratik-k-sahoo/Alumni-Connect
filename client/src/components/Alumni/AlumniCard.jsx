import { faInstagramSquare, faLinkedin, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faComments, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const AlumniCard = ({alumni}) => {
	return (
		<div>
			<div className="bg-white shadow-2xl rounded-lg p-6 w-72 text-center h-[20rem] gap-2 flex flex-col justify-between">
				<div className="flex flex-col items-center justify-evenly gap-2">
					<div className="relative">
						<img
							className="w-24 h-24 rounded-full mx-auto"
							src={alumni?.user?.profile?.profileImage}
							alt="Evan Spann"
						/>
					</div>
					<h3 className=" text-2xl font-bold text-maroon-700 text-red-700">
						{alumni.user.fullname}'
						{alumni?.user?.graduation_year % 100}
					</h3>

					<p className="text-sm text-gray-600 font-bold">
						<span
							role="img"
							aria-label="icon"
							className="inline-block mr-2 text-black"
						>
							<FontAwesomeIcon icon={faSuitcase} />
						</span>
						{alumni.achievements}
					</p>
				</div>
				<div className="icons flex items-center gap-24 ">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-primary  text-white"
						>
							Connect
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-base-100 rounded-box z-[1] w-35 p-2 shadow text-black text-xl"
						>
							<li>
								<a href={alumni?.socials?.linkedin}>
									<FontAwesomeIcon icon={faLinkedin} />
								</a>
							</li>
							<li>
								<a href={alumni?.socials?.instagram}>
									<FontAwesomeIcon icon={faInstagramSquare} />
								</a>
							</li>
						</ul>
					</div>
					<Link to={`/chat/${alumni?.user?._id}`} className=" block  hover:text-red-700 text-4xl">
						<FontAwesomeIcon icon={faComments} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AlumniCard;
