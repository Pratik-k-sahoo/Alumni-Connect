import React from "react";

const BlogPost = ({ title, content, extraContent, image }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img src={image} alt="icon" className="w-8 h-8 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <p className="text-gray-600">{extraContent}</p>
    </div>
  );
};

export default BlogPost;
