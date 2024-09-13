import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	SimpleGrid,
	Heading,
	Text,
	Button,
	Flex,
	Box,
	Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import useGetAllAlumni from "../../hooks/useGetAllAlumni";

const columns = [
	{
		Header: "Alumni",
		accessor: "alumni",
	},
];

function SearchResult({
	searchByName = "",
	searchByDepartment = "",
	searchByGraduationYear = "",
	searchByProgramme = "",
}) {
	useGetAllAlumni();
	const { alumniList } = useSelector((state) => state.auth);
	const [filter, setFilter] = useState(alumniList);
	useEffect(() => {
		if (alumniList) {
			if (
				searchByName?.length > 0 ||
				searchByDepartment?.length > 0 ||
				searchByGraduationYear?.length > 0 ||
				searchByProgramme?.length > 0
			) {
				const filteredList = alumniList.filter(
					(alumni) =>
						alumni?.user?.fullname
							.toLowerCase()
							.includes(searchByName?.trim()?.toLowerCase()) ||
						alumni?.user?.graduation_year
							.toString()
							?.includes(searchByGraduationYear?.toString()) ||
						alumni?.user?.branch
							.toLowerCase()
							.includes(
								searchByDepartment?.trim()?.toLowerCase()
							) ||
						alumni?.user?.branch
							.toLowerCase()
							.includes(searchByProgramme?.trim()?.toLowerCase())
				);
				setFilter(filteredList);
			} else {
				setFilter(alumniList);
			}
		}
	}, [
		alumniList,
		searchByDepartment,
		searchByGraduationYear,
		searchByName,
		searchByProgramme,
	]);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		state: { pageIndex },
		pageCount,
	} = useTable(
		{
			columns,
			data: filter,
		},
		usePagination
	);
	return (
		<>
			{(searchByDepartment ||
				searchByGraduationYear ||
				searchByName ||
				searchByProgramme) && (
				<Box textAlign="center" m="4">
					<Heading as="h2" size="lg">
						Search Results
					</Heading>
				</Box>
			)}
			<div className="flex justify-center flex-col items-center py-7">
				<div className="w-full max-w-4xl p-5 bg-white shadow-md">
					<table {...getTableProps()} className="w-full">
						<thead>
							{headerGroups?.map((hg) => (
								<tr
									key={hg?.getHeaderGroupProps()?.key}
									{...hg?.getHeaderGroupProps()}
								>
									{hg?.headers?.map((header) => (
										<th
											key={header?.getHeaderProps().key}
											{...header?.getHeaderProps()}
											className="text-5xl font-bold text-slate-700"
										>
											{header?.render("Header")}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page?.map((row) => {
								prepareRow(row);
								return (
									<tr
										key={row?.getRowProps()?.key}
										{...row?.getRowProps()}
									>
										{row?.cells?.map((cell) => (
											<td
												{...cell?.getCellProps()}
												key={cell?.getCellProps().key}
											>
												<hr className="bg-gray-500 h-1" />
												<div className="w-full p-2 bg-indigo-100 my-2">
													<div className="flex gap-4 my-4">
														<div className="w-24 h-24 overflow-hidden">
															<img
																src={
																	cell?.row
																		?.original
																		?.user
																		?.profile
																		?.profileImage
																}
																className=" aspect-square"
																alt=""
															/>
														</div>
														<div className="flex flex-col gap-2">
															<p>
																{
																	cell?.row
																		?.original
																		?.user
																		?.fullname
																}
															</p>
															<p>
																{
																	cell?.row
																		?.original
																		?.user
																		?.branch
																}
															</p>
															<p>
																{
																	cell?.row
																		?.original
																		?.user
																		?.graduation_year
																}
															</p>
														</div>
													</div>
												</div>
											</td>
										))}
									</tr>
								);
							})}

							<tr>
								<td></td>
							</tr>
						</tbody>
					</table>
					<div className="flex justify-between items-center gap-5 text-white">
						<button
							className={`${
								!canPreviousPage
									? "bg-slate-400 text-slate-900 cursor-not-allowed"
									: "bg-slate-900"
							} rounded-lg px-4 py-2 font-bold`}
							onClick={previousPage}
						>
							Prev
						</button>

						<span className="text-lg font-bold text-slate-900">
							Page {pageIndex + 1} of {pageCount}
						</span>

						<button
							className={`${
								!canNextPage
									? "bg-slate-400 text-slate-900 cursor-not-allowed"
									: "bg-slate-900"
							} rounded-lg px-4 py-2 font-bold`}
							onClick={nextPage}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default SearchResult;
