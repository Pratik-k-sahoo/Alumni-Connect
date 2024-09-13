import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetAllPostsByEvent from "@/hooks/useGetAllPostsByEvent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Footer from "../../components/Footer/Footer";

const PostPage = () => {
  const params = useParams();
  console.log(params.id);

  useGetAllPostsByEvent(params.id);
  const { postsByEvent } = useSelector((state) => state.event);

  // Expanded gallery images with descriptions
  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Webinar",
      description:
        "Engaging minds in an insightful webinar with industry experts.",
    },
    {
      src: "https://hub.laboratoria.la/hubfs/beneficios-hackathon-1.png",
      title: "Hackathon",
      description:
        "Innovative ideas and coding brilliance at our annual hackathon.",
    },
    {
      src: "https://utsav.gov.in/public/festival_top/1659608853.jpg",
      title: "Diwali",
      description:
        "Celebrating the festival of lights with joy and togetherness.",
    },
    {
      src: "https://img.naidunia.com/naidunia/ndnimg/31102021/31_10_2021-shn_women_club_8959.jpg",
      title: "Fancy Dress Competition",
      description:
        "Creativity unleashed in our fun-filled fancy dress competition.",
    },
    {
      src: "https://assets.telegraphindia.com/telegraph/2023/Jul/1688202606_dsc_4663-1.jpg",
      title: "Dancing Competition",
      description:
        "Showcasing graceful moves and vibrant energy on the dance floor",
    },
    {
      src: "https://vishvumiyafoundation.org/public/assets/images/event-image/whatsapp-image-2024-06-12-at-14831-pm-20240612044939.jpeg",
      title: "Cricket Tournament",
      description: "Thrilling cricket action as alumni teams battle for glory",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMlXaACPsXHSzU-iIRu4OjZIw8K8SB7ggzpA&s",
      title: "Fresher's Party",
      description:
        "Welcoming new faces with fun, music, and excitement at the fresher's party",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTXviq1WFYY6grBMWDEfwU3CE-E9QcFA94MQ&s",
      title: "Basketball Match",
      description:
        "Intense rivalry and teamwork on display in the basketball showdown.",
    },
    {
      src: "https://images.indianexpress.com/2023/02/chennai-concert.jpg?w=414",
      title: "Music Concert:",
      description: "Mesmerizing performances at the alumni music concert",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbSvRrB47U2yvcDQlOC7mdQ0nVeHO2Wah3Q&s",
      title: "Annual Sports",
      description:
        "A day of athletic excellence and sportsmanship at the annual sports event",
    },
  ];

  return (
		<>
            {
                postsByEvent.length > 0 && (
                    <div className="flex flex-col items-center justify-center mx-auto pt-10 pb-10 bg-indigo-200">
                        <h1 className="text-7xl font-bold">{postsByEvent[0].event.title}</h1>
                        <p className="text-xl text-center text-slate-600">{postsByEvent[0].event.description}</p>
                    </div>
                )
            }
			<div className=" bg-indigo-200 min-h-[calc(100vh-64px)] mx-auto w-full flex flex-col items-center">
				<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
					{postsByEvent.length > 0
						? postsByEvent.map((image, index) => (
								<Card
									key={index}
									className="w-full relative group overflow-hidden"
								>
									<img
										src={image.data}
										alt={image.title}
										className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4">
										<h2 className="text-lg font-medium text-white">
											{image.title}
										</h2>
										<p className="text-sm text-gray-200 mt-2">
											{image.description}
										</p>
									</div>
								</Card>
						  ))
						: galleryImages.map((image, index) => (
								<Card
									key={index}
									className="w-full relative group overflow-hidden"
								>
									<img
										src={image.src}
										alt={image.title}
										className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4">
										<h2 className="text-lg font-medium text-white">
											{image.title}
										</h2>
										<p className="text-sm text-gray-200 mt-2">
											{image.description}
										</p>
									</div>
								</Card>
						  ))}
				</div>
			</div>
            <Footer />
		</>
  );
};

export default PostPage;
