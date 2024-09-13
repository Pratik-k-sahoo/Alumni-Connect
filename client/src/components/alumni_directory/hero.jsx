import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const graduateYearOptions = [
	"By Graduation Year",
	2000,
	2001,
	2002,
	2003,
	2004,
	2005,
	2006,
	2007,
	2008,
	2009,
	2010,
	2011,
	2012,
	2013,
	2014,
	2015,
	2016,
	2017,
	2018,
	2019,
	2020,
	2021,
	2022,
	2023,
	2024,
	2025,
	2026,
	2027,
	2028,
	2029,
	2030,
].map(String);
const programmeOptions = [
	null,
	"B. E.",
	"B. E. Engineering",
	"B. Sc. Engineering",
	"B.Arch.",
	"B.Tech.",
	"B.Tech. M.Tech Dual Degree",
	"Integrated M.Sc.",
	"M.E. (Part Time)",
	"M.Sc.",
	"M.Tech.",
	"M.Tech. (Part Time)",
	"M.Tech.(RES)",
	"MA",
	"MBA",
	"MCA",
	"Ph.D.",
];
const departmentOptions = [
	null,
	"Biotechnology and Medical Engineering",
	"Civil Engineering",
	"Chemical Engineering",
	"Ceramic Engineering",
	"Computer Science and Engineering",
	"Chemistry",
	"Electronics and Communication Engineering",
	"Electrical Engineering",
	"Electronics and Instrumentation Engineering",
	"Earth and Atmospheric Sciences",
	"Food Process Engineering",
	"Humanities and Social Sciences",
	"Industrial Design",
	"Life Science",
	"Mathematics",
	"Master of Computer Application",
	"Mechanical Engineering",
	"Metallurgical and Materials Engineering",
	"Mining Engineering",
	"Planning and Architecture",
	"Physics and Astronomy",
	"Physics",
	"School of Management",
];
function Hero({
	setSearchByDepartment,
	setSearchByGraduationYear,
	setSearchByName,
	setSearchByProgramme,
}) {
	return (
		<div>
			<div className="dark:bg-gray-800">
				<div className="dark:bg-transparent">
					<div className="mx-auto flex flex-col items-center py-12 sm:py-24">
						<div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
							<h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-10">
								Discover our
								<span className="text-violet-800 dark:text-violet-500">
									{" "}
									<ReactTyped
										strings={["Alumni"]}
										typeSpeed={100}
										loop
									/>
								</span>
								.
							</h1>
							<p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
								Welcome to our alumni directory! <br />
								Browse our directory to connect with fellow
								graduates, reminisce about your time at the
								college, and network with classmates from
								different years.
							</p>
						</div>
						<div className="fblock w-2/5">
							<h3 className="sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-center text-gray-800 dark:text-white font-semibold leading-10">
								Search Alumni :
							</h3>
							<hr className="h-px mb-8 mt-5 bg-gray-700 border-0"></hr>

							<form action="" className="">
								<div className="relative text-gray-600 focus-within:text-gray-900 mb-6">
									<Input
										type="text"
										placeholder="By name"
										id="name"
										onChange={(e) =>
											setSearchByName(e.target.value)
										}
									/>
								</div>
								<div className="relative text-gray-600 focus-within:text-gray-900 mb-6">
									<Select
										onValueChange={(value) =>
											setSearchByDepartment(value)
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="By Department" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{departmentOptions.map(
													(department) => (
														<SelectItem
															key={department}
															value={department}
														>
															{department === null
																? "By Department"
																: department}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="relative text-gray-600 focus-within:text-gray-900 mb-6">
									<Select
										onValueChange={(value) =>
											setSearchByGraduationYear(value)
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="By Graduation Year" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{graduateYearOptions.map(
													(year) => (
														<SelectItem
															key={year}
															value={year}
														>
															{year === null
																? "By Graduation Year"
																: year}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="relative text-gray-600 focus-within:text-gray-900 mb-6">
									<Select
										onValueChange={(value) =>
											setSearchByProgramme(value)
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="By Programme" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{programmeOptions.map(
													(programme) => (
														<SelectItem
															key={programme}
															value={programme}
														>
															{programme === null
																? "By Programme"
																: programme}
														</SelectItem>
													)
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
