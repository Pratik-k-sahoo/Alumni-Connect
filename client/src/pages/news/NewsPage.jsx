import React from "react";
import { Link } from "react-router-dom";

function NewsPage({ news = [] }) {
	return (
		<div className="relative p-8 min-h-screen bg-[#cbd9f8]">
			<h1 className="text-3xl font-bold mb-8 text-center">NewsRoom</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
				{news.map((newsItem, index) => (
					<div
						key={index}
						className="bg-[#171d32] border border-gray-300 rounded-lg shadow-md overflow-hidden"
					>
						<div className="p-6">
							<h3 className="text-2xl font-bold text-white mb-2">
								{newsItem.title}
							</h3>
							<p className="text-white text-sm mb-4">
								Posted on {newsItem.date}
							</p>
							<p className="text-white mb-6 line-clamp-3">
								{newsItem.description}
							</p>
							<div className="flex justify-end">
								<button
									// onClick={() => handleReadMore(newsItem)}
									className="px-4 py-2 border border-[#cbd9f8] text-white rounded-full hover:bg-[#cbd9f8] hover:text-slate-900 transition-colors duration-300"
								>
									Read More
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Add News Button */}
			<Link to="/news-page/add-news">
				<button className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-md hover:bg-blue-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</Link>
		</div>
	);
}

export default NewsPage;
