import Counter from "./counter"
import { Fade } from "react-awesome-reveal";


const stats = [
    { id: 1, name: 'benefited from our fundraisers', value: 44, suffix:"clubs"},
    { id: 2, name: 'Funds raised so far', value:  2000000,suffix:"Rupees" },
    { id: 3, name: 'Donors/Helpers joined', value: 6000 ,suffix:"+"},
  ]
  
  export default function Stats() {
   
    return (
      <div className="bg-indigo-200">
      <div className="bg-indigo-200 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Fade>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 ">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="flex items-center justify-center order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  <Counter value={stat.value}/> 
                  <span className="ml-2">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
          </Fade>
        </div>
      </div>
        <hr className=" h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-slate-900 to-transparent opacity-25"/>
        </div>
    )
  }
