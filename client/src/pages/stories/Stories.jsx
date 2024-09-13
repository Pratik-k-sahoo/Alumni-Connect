import React, { useState } from "react";
import { Header } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faComments } from "@fortawesome/free-solid-svg-icons";
import BlogPost from "./BlogPost";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AlumniCard from "@/components/Alumni/AlumniCard";
import Footer from "../../components/Footer/Footer";

const ReportCard = ({
	title,
	content,
	extraContent,
	image,
	profession,
	description,
	author,
	date,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="bg-white p-6 shadow-lg rounded-lg mb-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
			<h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
				{title}
			</h2>
			<p className="text-gray-600 mb-3 leading-relaxed">
				{isExpanded ? description : `${description.slice(0, 100)}...`}
			</p>
			<button
				className="btn"
				onClick={() => {
					setIsExpanded(!isExpanded);
					const modal = document.getElementById("my_modal_3");
					const titleElement = modal.querySelector(".modal-title");
					const descriptionElement =
						modal.querySelector(".modal-description");
					titleElement.textContent = title;
					descriptionElement.textContent = description;
					modal.showModal();
				}}
			>
				{isExpanded ? "Show less" : "Show more"}
			</button>

			{/* ---------The blog Post content-------- */}
			<dialog id="my_modal_3" className="modal text-white">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<div className="p-6">
						<BlogPost
							title="What Is a Blog?"
							icon={image}
							content="A blog is literally short for 'web log.' Blogs began in the early 1990s as an online journal for individuals to publish thoughts and stories on their own website. Bloggers then share their blog posts with other internet users. Blog posts used to be much more personal to the writer or group of writers than they are today."
							extraContent="Today, people and organizations of all walks of life manage blogs to share analyses, instruction, criticisms, and other observations of an industry in which they are a rising expert."
						/>
					</div>
				</div>
			</dialog>
			<div className="flex items-center mt-4">
				<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 mr-4">
					<img
						src={image}
						alt="Author"
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<span className="text-sm font-medium text-gray-900 block">
						By {author}, {profession}
					</span>
					<span className="text-sm text-gray-500">{date}</span>
				</div>
			</div>
		</div>
	);
};

const ReportGrid = () => {
	const reports = [
		{
			title: "Sumaiya Kalim - Pioneering Innovator in Digital Art and Technology",
			description:
				"Sumaiya Kalim graduated from Gujarat Tech Government College with a degree in Computer Science, specializing in graphic design and technology. Her deep passion for visual arts led her to explore the intersection of art and technology, where she made significant strides in digital design. At Cisco, she combines her technical expertise with her artistic vision to create cutting-edge digital experiences. Sumaiya is also an advocate for women in tech, mentoring young women and promoting diversity in the industry.",
			image: "https://img.freepik.com/free-photo/close-up-portrait-indian-hindu-girl-traditional-violet-saree-posed-street_627829-12971.jpg?size=626&ext=jpg",
			author: "Tripti Sahu",
			profession: "Graphic Designer and Technologist at Cisco",
			date: "August 31, 2024",
		},
		{
			title: "Isha - Leading Advocate for Environmental Sustainability",
			description:
				"Isha, a graduate of Gujarat Tech Government College in Environmental Science, has made a name for herself as a leading environmental scientist. Her groundbreaking research on sustainable agriculture has influenced national policies and practices. As a policy advisor, she works closely with government bodies to implement sustainable practices across India, earning recognition for her contributions to environmental conservation and sustainable development.",
			image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
			author: "Subhalaxmi Mishra",
			profession: "Environmental Scientist and Policy Advisor",
			date: "August 31, 2024",
		},
		{
			title: "Prithivi Raj - Visionary Entrepreneur in the Tech Industry",
			description:
				"Prithivi Raj graduated from Gujarat Tech Government College with a degree in Computer Science. Driven by a passion for innovation, he founded multiple successful tech startups, including a groundbreaking AI-driven platform that has revolutionized customer service. Prithivi is a mentor to emerging entrepreneurs, fostering the growth of the tech ecosystem in India. His ventures have not only created numerous jobs but have also placed India at the forefront of global tech innovation.",
			image: "https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915892.jpg?size=626&ext=jpg",
			author: "Anshuman Sai",
			profession: "Serial Entrepreneur and Tech Innovator",
			date: "August 31, 2024",
		},
		{
			title: "Prateek Kumar Sahu - Champion of Social Justice and Human Rights",
			description:
				"Prateek Kumar Sahu, a law graduate from Gujarat Tech Government College, is a dedicated human rights lawyer. Known for his tireless advocacy for social justice, Prateek has successfully fought for the rights of marginalized communities in India. His legal expertise and activism have led to significant policy changes, and he is widely respected for his contributions to advancing human rights both nationally and internationally..",
			image: "https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?size=626&ext=jpg",
			author: "Somya Ranjan Biswal",
			profession: "Human Rights Lawyer and Activist",
			date: "August 31, 2024",
		},
		{
			title: "Deben Kumar - Creative Visionary in Global Advertising",
			description:
				"Deben Kumar, who studied Graphic Design and Marketing at Gujarat Tech Government College, has risen to prominence as the Creative Director of a global advertising firm. His innovative campaigns have garnered international acclaim, including several prestigious awards. Deben's creative leadership and ability to connect with diverse audiences have made him a key figure in the advertising industry. He also mentors young designers, helping them hone their creative skills.",
			image: "https://img.freepik.com/free-photo/smiling-romantic-asian-girl-contemplating-nature-around_1262-19410.jpg?size=626&ext=jpg",
			author: "Nimisha Seth",
			profession: "Creative Director at a Leading Advertising Firm",
			date: "August 31, 2024",
		},
		{
			title: "Abhijit Panigrahi - Transformative Leader in Education Reform",
			description:
				"Abhijit Panigrahi graduated from Gujarat Tech Government College with a degree in Economics and Social Sciences. He founded an NGO, EduReach, which has transformed education in rural India through innovative teaching methods. His work has improved literacy rates and provided thousands of children with access to quality education. Abhijit's contributions to education have been recognized with numerous awards, including the Padma Shri, and he continues to advocate for education reform across the country.",
			image: "https://img.freepik.com/free-photo/worldface-pakistani-guy-white-background_53876-14466.jpg?size=626&ext=jpg",
			author: "Ankit Das",
			profession: "Social Entrepreneur and Education Reformer",
			date: "August 31, 2024",
		},
		// Add more reports as needed
	];

	const { alumniList } = useSelector((state) => state.auth);

	return (
		<>
			{/* Landing Page */}
			<Header />
			<div className="h-full min-h-[calc(100vh-64px)]">
				<div className="hero bg-base-200 min-h-[70vh] w-full flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-600">
					<div className="hero-content text-center w-full">
						<div className=" text-white">
							<h1 className="text-6xl font-bold  w-full ">
								Alumni Success Stories
							</h1>
							<p className="py-6 text-3xl ">
								Celebrate your journey and inspire the next
								generation with stories of your success!
							</p>
							<button className="btn btn-primary">
								Add Your Success Story
							</button>
						</div>
					</div>
				</div>
				{/* Post Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-indigo-200">
					{reports.map((report, index) => (
						<ReportCard
							key={index}
							title={report.title}
							description={report.description}
							author={report.author}
							profession={report.profession}
							date={report.date}
							image={report.image}
						/>
					))}
				</div>
			</div>
            <Footer />
		</>
	);
};

export default ReportGrid;
