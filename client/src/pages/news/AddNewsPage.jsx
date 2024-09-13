import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNewsPage({ addNews }) {
  const [newsData, setNewsData] = useState({
    title: '',
    date: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNews(newsData);
    navigate('/'); // Redirect to NewsPage after submission
  };

  return (
    <div className="p-8 min-h-screen bg-[#cbd9f8]">
      <h1 className="text-3xl font-bold mb-8 text-center">Add News</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-[#171d32] text-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">News Title:</label>
          <input
            type="text"
            name="title"
            value={newsData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">News Date:</label>
          <input
            type="date"
            name="date"
            value={newsData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea
            name="description"
            value={newsData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
       
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add News
        </button>
      </form>
    </div>
  );
}

export default AddNewsPage;