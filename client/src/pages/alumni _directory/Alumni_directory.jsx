import React, { useState } from "react";
import Hero from "@/components/alumni_directory/hero.jsx";
import SearchResult from "@/components/alumni_directory/search_results";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Alumni_directory() {
	const [searchByName, setSearchByName] = useState(null);
	const [searchByDepartment, setSearchByDepartment] = useState(null);
	const [searchByGraduationYear, setSearchByGraduationYear] = useState(null);
	const [searchByProgramme, setSearchByProgramme] = useState(null);
	return (
		<div className="bg-indigo-200">
			<Header />
			<Hero
				setSearchByDepartment={setSearchByDepartment}
				setSearchByGraduationYear={setSearchByGraduationYear}
				setSearchByName={setSearchByName}
				setSearchByProgramme={setSearchByProgramme}
			/>
			<ChakraProvider>
				<SearchResult
					searchByName={searchByName}
					searchByDepartment={searchByDepartment}
					searchByGraduationYear={searchByGraduationYear}
					searchByProgramme={searchByProgramme}
				/>
			</ChakraProvider>
            <Footer />
		</div>
	);
}

export default Alumni_directory;
