import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { ReactNode } from "react";
import { MessageUs } from "./client-component";


export default function ContactUs(): ReactNode {
    return (
        <main>
          <NavBar/>
          <ContactInformation className="mt-20 ml-12 mr-12 lg:ml-52 lg:mr-52"/>
          <OrDivider className="mt-20 ml-12 mr-12 lg:ml-52 lg:mr-52"/>
          <MessageUs className="ml-12 mr-12 mt-20 lg:ml-52 lg:mr-52"/>
          <Footer className='mt-16'/>
        </main>
      )
}

const ContactInformation = ({
    className,
}: {
    className?: string,
}) : ReactNode => {
    const classes = (className == undefined) ? "" : className
    return(
        <div className={classes}>
            <span className="text-2xl font-bold text-light-primary">Contact Us</span>
            <div className="flex flex-col justify-center items-start mt-10">
                <div className="flex flex-col justify-start w-44">
                    <span className="text-lg ">jaisonekm@gmail.com</span>
                    <span className=" text-lg mt-8">+91 9497023072</span>
                    <span className="text-lg mt-8">+0485 2246348</span>
                </div>
            </div>
        </div>
    )
}

const OrDivider = ({
    className,
}:{
    className?: string,
}): ReactNode => {
    const classes = (className == undefined)? "": className
    return(
        <div className={className}>
            <div className="flex flex-row items-center justify-center">
                <span className=" h-0.5 bg-black flex-1"></span>
                <span className=" text-xl text-center align-middle ml-5 mr-5">OR</span>
                <span className=" h-0.5 bg-black flex-1"></span>
            </div>
        </div>
    )
}



