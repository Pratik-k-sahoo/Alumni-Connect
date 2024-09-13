import React from "react";
import { Link } from "react-router-dom";
import { LandingSocialRating } from "./LandingSocialRating";
import { useSelector } from "react-redux";
import {Fade} from "react-awesome-reveal";

const avatarItems = [
  {
    src: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    src: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    src: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    src: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    src: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

function LandPage() {
  const { user } = useSelector((state) => state.auth);
  return (
		<Fade>
			<header
				className=" hero relative bg-cover bg-no-repeat  bg-center lg:h-96 h-[35rem]"
				style={{
					backgroundImage: `url('https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.charlotteparent.com/content/uploads/data-import/a86308ab/shutterstock_658847998.jpg ')`,
				}}
			>
				<div className=" hero-overlay inset-0 bg-opacity-70 relative z-10 flex justify-center items-center h-full sm-w-full">
					<div className="text-center text-white">
                        
						<h1 className="lg:text-7xl text-[2rem] font-bold">
							Welcome to the Alumni Association
						</h1>
						<p className="lg:text-2xl mt-2">
							Connect with fellow alumni, discover events, and
							explore career resources.
						</p>
						{!user && (
							<div className="mt-4">
								<Link to={"/login"}>
									<button className="btn btn-active btn-primary w-36 h-12 text-2xl text-white">
										JOIN
									</button>
								</Link>
							</div>
						)}
						<div className="mt-6 pt-3 flex items-center justify-center">
							<LandingSocialRating
								avatarItems={avatarItems}
								numberOfUsers={1000}
								suffixText="happy alumni"
							/>
						</div>
					</div>
				</div>
			</header>
		</Fade>
  );
}

export default LandPage;
