import React, { useState } from 'react';

function Feedback() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <>

                    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
                      <div className="flex-auto">
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
                  
                
             
    </>
  );
}

export default Feedback;
