import Image from 'next/image'
import { NavBar } from '../components/navbar'
import { ReactNode } from 'react'
import { SeparatorLine } from '@/components/separator-line'
import { LinkButton } from '@/components/link-button'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <NavBar/>
      <IntroductionSection />
      <WhatWeDoSection />
      <FindUsSection />
      <Footer className='mt-16'/>
    </main>
  )
}

const IntroductionSection = (): ReactNode => {
  return(
    <div>
      <SeparatorLine thickness={5}/>
      <div className="flex flex-row plantation-image">
        <div className="gradient-80 md:gradient-60 lg:gradient-40">
          <div className="flex flex-col w-5/6 ml-5 pt-28 pb-28 md:w-4/6 lg:w-3/6 xl:w-2/6 md:ml-16">
            <text className="text-4xl text-light-primary font-bold">CHALAPPURAM RUBBERS</text>
            <text className="mt-5">
              Ready to cash in on your rubber sheets, nutmeg, arecanut, mace spice, or pepper? 
              Look no further! We offer top-notch prices for your quality products. 
              Bring them to us and unlock the best deals in town!
            </text>
            <div className="flex flex-row mt-10">
              <LinkButton link="/check-prices" text="CHECK PRICES" className="pt-2 pb-2 pl-3 pr-3"/>
              <LinkButton link="/book-appointment" text="BOOK AN APPOINTMENT" className="pt-2 pb-2 pl-3 pr-3 ml-5"/>
            </div>
          </div>
        </div>
      </div>
      <SeparatorLine thickness={100} />
    </div>
  )
}

const WhatWeDoSection = ({
  className,
}: {
  className?: string,
}): ReactNode => {
  const classes = (className == undefined)? " 2xl:pl-80 2xl:pr-80 md:pl-40 md:pr-40 pr-5 pl-5 w-screen mt-16 " : className
  return ( 
    <div className={"flex flex-col md:flex-row justify-center items-center " + classes}>
      <div className="flex flex-col w-full justify-center items-center md:items-start md:w-1/2">
        <img src="cooperation.png" width="200"/>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10 md:items-end md:mt-5 md:mb-5">
        <text className="text-3xl text-light-primary font-bold">WHAT WE DO?</text>
        <text className=" text-center mt-5 md:text-end">
            Established in 1987, our business is dedicated to sourcing and acquiring top-quality rubber sheets, nutmeg, arecanut, mace spice, and pepper. 
            At our core, we thrive on providing fair and competitive prices for your goods, valuing quality above all.  
            Our pricing model is based on the weight of the products per kilogram, ensuring a transparent and equitable transaction. 
            With decades of experience in the rubber sheet trading business, we have honed our expertise in evaluating and rewarding superior product quality. 
            Entrust us with your offerings, and let our longstanding commitment to excellence guarantee you a lucrative and satisfying trade. 
        </text>
      </div>
    </div>
  )
}

const FindUsSection = ({
  className,
}: {
  className?: string,
}): ReactNode => {
  const classes = (className == undefined)? " 2xl:pl-80 2xl:pr-80 md:pl-40 md:pr-40 pr-5 pl-5 w-screen mt-16 " : className
  return (
    <div className={"flex flex-col justify-center md:flex-row" + classes}>
      <div className="w-full flex flex-col items-center justify-center order-2 mt-10 md:order-1 md:items-start md:mt-5 md:mb-5">
        <text className="text-3xl text-light-primary font-bold">FIND US?</text>
        <text className=" text-center mt-5 md:text-left">
          Discover our convenient location at Chalappuram Rubbers in Vennikulam, Ernakulam, Kerala, India. 
          Situated on the Vennikulam-Piravom road, adjacent to Vennikulam Junction and opposite St. Georges HSS Vennikulam, our establishment is easily accessible from the intersection of Vennikulam-Piravom road and Hospital road.
          Positioned along the route from Sasthamugal to Piravom, our address is strategically located at Vennikulam, Ernakulam, with the postal code 682305. 
          Whether you're in search of quality rubber sheets, nutmeg, arecanut, mace spice, or pepper, our location provides a seamless and recognizable destination for all your trading needs. 
        </text>
        <a className="mt-5 text-light-primary underline hover:font-bold" href='https://maps.app.goo.gl/C9Rz9arLnyvUqG2d8'>Open location in Google Maps</a>
      </div>
      <div className="flex flex-col w-full justify-center items-center order-1 md:order-2 md:items-end md:w-1/2">
        <img className="rounded-full w-60 h-60" src="maps-locations.png" width="300" height="300"/>
      </div>
    </div>
  )
}

