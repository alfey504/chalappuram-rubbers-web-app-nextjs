import { ReactNode } from "react"

export const Footer = ({
    className,
  }:{
    className?: string
  }): ReactNode => {
    const classes = (className == undefined)? "" : className
    return(
      <div className={className}>
        <div className="bg-light-secondary text-light-secondary pt-10 pb-5 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="flex flex-col items-center md:mr-40 md:items-start">
              <a className="p-1 hover:font-bold" href="/">CONTACT US</a>
              <a className="p-1 hover:font-bold" href="/">BOOK AN APPOINTMENT</a>
              <a className="p-1 hover:font-bold" href="/">CHECK PRICES</a>
            </div>
            <div className="flex flex-col items-center md:ml-40 md:items-start">
              <a className="p-1 hover:font-bold" href="/">✉ jaisonekm@gmail.com</a>
              <a className="p-1 hover:font-bold" href="/">📞 +(91) 9497023072</a>
              <a className="p-1 hover:font-bold" href="/">☎ +(0476) 2246348</a>
            </div>
          </div>
          <text className="mt-10">© copyrighted (2023)</text>
        </div>
      </div>
    )
  }