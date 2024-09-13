import React, { useState } from "react";

const RatingComponent = ({ maxRating = 5, onRatingSelect }) => {
  const [rating, setRating] = useState(5);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxRating }, (_, index) => index + 1).map(
        (star) => (
          <svg
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors duration-200 ${"text-yellow-500"}`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <path d="M12 .587l3.668 7.431 8.167 1.191-5.916 5.76 1.396 8.124L12 18.896l-7.315 3.846 1.396-8.124-5.916-5.76 8.167-1.191z" />
          </svg>
        )
      )}
    </div>
  );
};

export default RatingComponent;
