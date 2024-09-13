import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards.jsx";
import {Fade} from "react-awesome-reveal";

function Gallery() {
  return (
    <div className="bg-indigo-200">
      <Fade>
      <h2 className="text-3xl font-bold mb-4 flex justify-center items-center p-3 pt-6">
        Gallery
      </h2>
      <InfiniteMovingCards
        items={[
          {
            src: "https://www.thepresidiumschool.com/news_image/2hisar-painting-competition-2019-0003.jpg",
            alt: "Photo1",
          },
          {
            src: "https://www.odishalifestyle.com/wp-content/uploads/2022/02/Odissi.jpg",
            alt: "Photo2",
          },
          {
            src: "https://hub.laboratoria.la/hubfs/beneficios-hackathon-1.png",
            alt: "Photo3",
          },
          {
            src: "https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/ethnic-day-7.jpg",
            alt: "Photo4",
          },
          {
            src: "https://www.eventindustrynews.com/wp-content/uploads/2022/11/BM_ETL22_Awards_0127-scaled.jpg",
            alt: "Photo5",
          },
          // Add more items as needed
        ]}
        direction="left"
        speed="fast"
        pauseOnHover={true}
        className="slide1"
      />
      </Fade>
    </div>
  );
}

export default Gallery;
