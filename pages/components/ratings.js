import React from "react";

const StarsRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-500 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l2.12 6.48L20 9.24l-5.22 4.38L16.47 22 12 17.77 7.53 22l1.69-8.38L4 9.24l5.88-.76L12 2z" />
      </svg>
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-500 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l2.12 6.48L20 9.24l-5.22 4.38L16.47 22 12 17.77 7.53 22l1.69-8.38L4 9.24l5.88-.76L12 2zM12 15.25V2l5.88 4.76-2.12 6.48 5.22 4.38-6.88.88L12 22 9.24 17.77l-6.88-.88L5.12 9.24 12 2v13.25z" />
      </svg>
    );
  }

  // Add empty stars to make total 5
  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-300 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l2.12 6.48L20 9.24l-5.22 4.38L16.47 22 12 17.77 7.53 22l1.69-8.38L4 9.24l5.88-.76L12 2z" />
      </svg>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default StarsRating;
