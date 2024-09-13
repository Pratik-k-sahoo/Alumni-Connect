import scroll from '@/assets/svg/react.svg'
import Heading from './heading'


export default function Hero() {

  return (
    <div className="bg-indigo-200">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <Heading />
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Empower the next generation of scholars. Your support fuels innovation, nurtures talent, and shapes the future. Join us in making a lasting impact.
            </p>
            <p className="mt-6 text-xl leading-8 text-gray-600">
            There are many ways to support the Our University. You can find details of our current appeals below.
            <img className="size-14 mx-auto mt-4" src={scroll}/>
            </p>
            
          </div>
          
        </div>
      
      </div>
    
  )
}
