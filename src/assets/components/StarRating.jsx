import React, { useState } from "react";
import { IoStar } from "react-icons/io5";

const StarRating = ({ totalStars = 5, onRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex ml-3 ">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onRating(ratingValue);
              }}
              className="hidden"
            />
            <IoStar
              className={`cursor-pointer transition-colors duration-200  ${
                ratingValue <= (hover || rating)
                  ? "text-yellow-300"
                  : "text-gray-300"
              }`}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
