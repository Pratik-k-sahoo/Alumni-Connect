import React from "react";

const MentorshipCard = ({ program }) => {
  return (
    <div className="bg-indigo-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <img
        src={program.image}
        alt={program.title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{program.title}</h2>
      <p className="text-gray-600 mb-4">{program.description}</p>
      <div className="text-sm text-gray-500">
        <p>Mentor: {program.mentor}</p>
        <p>Duration: {program.duration}</p>
      </div>
    </div>
  );
};

export default MentorshipCard;
