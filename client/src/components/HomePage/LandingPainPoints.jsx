import { ArrowDownOutlined } from "@ant-design/icons";
import { buildClassNames } from "@/helper/utility";
import RightArrow from "./images/rightArrow.svg";
import React from "react";
import { useSelector } from "react-redux";
import {Fade} from "react-awesome-reveal"

export const LandingPainPoints = ({
	title,
	subtitle,
	painPoints,
	className,
	...props
}) => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div
			className={buildClassNames("py-16 px-5", className)}
			{...props}
		>
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
					{title}
				</h2>
				<p className="text-lg mt-4 text-slate-600 dark:text-slate-400 mb-12">
					{subtitle}
				</p>

				<div className="flex justify-center flex-wrap items-center gap-20">
					<Fade>
					{painPoints?.map((painPoint, idx) => (
						<React.Fragment key={idx}>
							<div className="flex flex-col items-center">
								<span className="text-5xl mb-4">
									{painPoint.emoji}
								</span>
								<span className="font-semibold text-lg text-gray-900 dark:text-slate-200">
									{painPoint.title}
								</span>
							</div>
							
						</React.Fragment>
					))}
					</Fade>
				</div>
				{!user && (
					<div className="text-center pt-20">
						<div className="flex flex-col items-center">
							<p className="text-slate-600 dark:text-slate-400 text-lg">
								<ArrowDownOutlined /> there is an easier way
							</p>
						</div>
						</div>
				)}
			</div>
		</div>
	);
};
