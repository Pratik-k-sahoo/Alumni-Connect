import { Fade } from "react-awesome-reveal";

export default function Thankyou(){
    return(
        <div className="bg-indigo-200">
            <Fade>
        <div className="container px-20 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
                Every Contribution is Appreciated.
            </h2>
    
                <p className="mt-3 text-lg text-gray-500 dark:text-gray-300">The insight behind this campaign is that a donation does not have to be “one time” or “a large sum”. Remember, no contribution is too small or too early. And it is entirely voluntary</p>
            </div>
            </Fade>
                <Fade>
            <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-1 my-8 bg-slate-900 border-0 rounded" />
    <div className="absolute px-4 -translate-x-1/2 bg-indigo-200 left-1/2 dark:bg-slate-900">
        <svg className="w-4 h-4 text-slate-900 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
  </svg>
  
    </div>
</div>
    </Fade>
    </div>
    )
};