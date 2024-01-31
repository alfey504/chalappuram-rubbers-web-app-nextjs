"use client"

import { ReactNode, useState } from "react";

export const NavBar = ({ 
    showTitle, 
} : { 
    showTitle?: boolean,
}): ReactNode => {

    const titleVisibility = (showTitle == undefined)? true : showTitle 
    const [ showMenu, setShowMenu ] = useState(false)
    
    const menuClicked = async() => {
      setShowMenu(!showMenu)
    }

    return(
      <div className="flex flex-col">
        <div className=" h-28 flex flex-row p-3 justify-between shadow-lg">
          { titleVisibility == true && 
              <div id="title" className="justify-start items-center flex">
                <a href="/" className="text-light-primary text-3xl font-bold">CHALAPPURAM RUBBERS</a> 
              </div>
          }
          <div id="links" className="items-center flex-row text-black justify-around hidden lg:flex">
            <a href='/check-prices' className="p-5 text-light-primary text-l hover:font-bold">CHECK PRICE</a>
            <a href="/book-appointment" className="p-5 text-light-primary text-l hover:font-bold">BOOK AN APPOINTMENT</a>
            <a href="/contact-us" className="p-5 text-light-primary text-l hover:font-bold">CONTACT US</a>
          </div>  
          <div className="items-center flex-row text-black justify-around flex lg:hidden">
            <button className="mr-3" onClick={menuClicked}>=</button>
          </div>       
        </div>
        { showMenu == true &&
          <div className=" bg-light-secondary text-white flex flex-col w-screen justify-center pt-2 pb-2 lg:hidden">
           <a href="/check-prices" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">CHECK PRICE</a> 
           <a href="/book-appointment" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">BOOK AN APPOINTMENT</a>
           <a href="/contact-us" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">CONTACT US</a>
          </div>
        }
      </div>
    )
}

export const AdminNavBar = ({ 
  showTitle, 
} : { 
  showTitle?: boolean,
}): ReactNode => {

  const titleVisibility = (showTitle == undefined)? true : showTitle 
  const [ showMenu, setShowMenu ] = useState(false)
  
  const menuClicked = async() => {
    setShowMenu(!showMenu)
  }

  return(
    <div className="flex flex-col">
      <div className=" h-28 flex flex-row p-3 justify-between shadow-lg">
        { titleVisibility == true && 
            <div id="title" className="justify-start items-center flex">
              <a href="/" className="text-light-primary text-3xl font-bold">CHALAPPURAM RUBBERS</a> 
            </div>
        }
        <div id="links" className="items-center flex-row text-black justify-around hidden lg:flex">
          <a href='/admin/appointment-requests' className="p-5 text-light-primary text-l hover:font-bold">REQUESTS</a>
          <a href="/admin/messages" className="p-5 text-light-primary text-l hover:font-bold">MESSAGES</a>
          <a href="/admin/appointments" className="p-5 text-light-primary text-l hover:font-bold">APPOINTMENTS</a>
        </div>  
        <div className="items-center flex-row text-black justify-around flex lg:hidden">
          <button className="mr-3" onClick={menuClicked}>=</button>
        </div>       
      </div>
      { showMenu == true &&
        <div className=" bg-light-secondary text-white flex flex-col w-screen justify-center pt-2 pb-2 lg:hidden">
         <a href="/admin/appointment-requests" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">REQUESTS</a> 
         <a href="/admin/messages" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">MESSAGES</a>
         <a href="/admin/appointments" className=" w-screen text-center text-light-secondary pt-2 pb-2 hover:font-bold">APPOINTMENTS</a>
        </div>
      }
    </div>
  )
}