import React, { useState } from 'react';
import {Header} from "@/components"

function Feedback() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <>
    <Header />
      <div className="flex items-center justify-center min-h-screen bg-indigo-200">
        <div className="bg-indigo-200 text-black py-24 w-full">
          <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
            <div className="flex flex-col w-full lg:w-1/3 p-8 lg:ml-40">  
              <p className="ml-6 text-yellow-300 text-2xl font-bold uppercase tracking-loose">REVIEW</p>
              <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us feedback!</p>
              <p className="text-sm md:text-base leading-snug text-black text-opacity-100">Please provide your valuable feedback and something something ...</p>
            </div>
            <div className="flex flex-col w-full lg:w-2/3 justify-center">
              <div className="container w-full px-4">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#171d32]">
                      <div className="flex-auto p-5 lg:p-10">
                        <h4 className="text-2xl mb-4 text-white font-semibold">
                          Have a suggestion?
                        </h4>
                        <form id="feedbackForm" action="" method="">
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="email">
                              Email
                            </label>
                            <input type="email" name="email" id="email" className="border-0 px-3 py-3 rounded text-sm shadow w-full bg-gray-300 placeholder-black text-black outline-none focus:bg-gray-400" placeholder=" " required/>
                          </div>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="message">
                              Message
                            </label>
                            <textarea maxLength="300" name="feedback" id="feedback" rows="4" cols="80" className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full" placeholder="" required></textarea>
                          </div>
                          
                          <div className="text-center mt-6">
                            <button
                              id="feedbackBtn"
                              className="bg-indigo-200 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="submit"> Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
