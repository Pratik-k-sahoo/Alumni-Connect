import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const news = [
  {
    title: "Tech Innovation Fest at Gujarat Tech Government College, Ahmedabad",
description: "Gujarat Tech Government College in Ahmedabad hosted its Annual Tech Innovation Fest, featuring student competitions in coding, robotics, and digital design. The event showcased innovative projects and included insights from industry experts on emerging technologies like AI and blockchain, highlighting the college’s role in fostering innovation.",
date: "August 29, 2024"
  },
  {
    title: "Alumni Meet 2024 at Gujarat Tech Government College, Ahmedabad",
description: "The Alumni Meet 2024 at Gujarat Tech Government College, Ahmedabad, brought together graduates to celebrate their successes and reconnect with their alma mater. The event featured panel discussions, networking opportunities, and recognition of distinguished alumni, strengthening the bond between the college and its alumni community.",
date: "August 22, 2024",
  },
  {
    title: "Mid-Semester Exams Scheduled at Gujarat Tech Government College, Ahmedabad",
    description:
      "Gujarat Tech Government College, Ahmedabad, has announced the schedule for the upcoming mid-semester exams. The exams will commence on September 20, 2024, covering all undergraduate and postgraduate courses. Students are advised to check the official college portal for the detailed timetable and to prepare thoroughly. The administration has also introduced additional study sessions and resources to support students in their preparation.",
    date: "September 15, 2024",
  },
  {
    title: "Gujarat Tech Government College to Host Annual Hackathon 2024",
    description:
      "Gujarat Tech Government College, Ahmedabad, is set to host its Annual Hackathon on September 25-26, 2024. This 24-hour coding marathon will bring together students from various disciplines to solve real-world problems through innovative tech solutions. Participants will compete in teams, with industry experts serving as mentors and judges. Exciting prizes and internship opportunities await the winners, making it a highly anticipated event on the college calendar. Registration is now open on the college portal.",
    date: "September 12 2024",
  },
  {
    title: "Global AI Conference 2024 Goes Virtual",
    description:
      "The Global AI Conference 2024 will be held virtually, featuring leading experts discussing the latest advancements in AI. The event will cover topics like AI ethics and machine learning, offering insights into the future of artificial intelligence and its impact on various industries.",
    date: "September 5-7, 2024",
  },
  {
    title: "Webinar on the Future of Remote Work",
    description:
      "A webinar titled [The Future of Remote Work] will take place on September 10, 2024, focusing on the evolution and future trends of remote work. Experts will share strategies for managing remote teams and maintaining productivity, providing valuable guidance for businesses and employees.",
    date: "September 10, 2024",
  },
  {
    title: "National Innovation Hackathon 2024 Set for Bangalore",
    description:
      "The National Innovation Hackathon 2024 will take place in Bangalore from October 5-6, 2024. This nationwide event invites students, developers, and tech enthusiasts to collaborate on solving pressing challenges in areas like healthcare, sustainability, and education. Participants will have 48 hours to develop innovative solutions, with top tech companies and startup incubators offering mentorship and judging. Winning teams will receive cash prizes, startup funding, and opportunities for further development. Registration is now open to individuals and teams across India.",
    date: "September 18, 2024",
  },
];

function News() {
  const [current, setCurrent] = useState(0);
  const back = () => {
    setCurrent((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  };
  const forward = () => {
    setCurrent((prev) => (prev === news.length - 1 ? 0 : prev + 1));
  };
  return (
    <>
      <div className="">
        <div className="flex justify-center bg-indigo-200">
          <div className="flex items-center badge-secondary rounded-t-3xl w-32 justify-between relative h-10">
            <span className="indicator-item indicator-top indicator-start badge-secondary rounded-t-xl transform -skew-x-12 p-4 h-10"></span>
            <span className="indicator-item indicator-top indicator-start badge-secondary rounded-t-xl transform after:-skew-x-12 skew-x-12 p-4 h-10"></span>
            <span className="absolute left-9 text-xl font-bold">
              NEWS
            </span>
          </div>
        </div>

        <div className="mx-auto lg:w-4xl h-full flex justify-center">
          <Carousel className="h-full sm:w-[50rem] w-full max-w-7xl mx-auto">
            <CarouselContent>
              {news.map((items, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="">
                    <Card className="border-0 w-full">
                      <CardContent className="border-0 max-w-6xl bg-white p-12 h-full">
                        <h1 className="text-4xl font-bold text-black ">
                          {items.title}
                        </h1>
                        <h2 className="text-xl font-semibold text-gray-800 mt-4">
                          {items.description}
                        </h2>
                        <div className="text-gray-600 mt-2">
                          <span>{items.date} | </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
							<CarouselPrevious />
							<CarouselNext />
						</div>
					</Carousel>
				</div>
			</div>
		</>
	);
}

export default News;
