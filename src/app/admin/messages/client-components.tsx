"use client"

import { prettierDate } from "@/utils/datetime-utils"
import { Message } from "./page"
import { useState } from "react"
import { messageRead } from "./actions"

export const MessageBox = ({
    className,
    message,
}:{
    className?: string,
    message: Message
}) => {
    const [ extended, setExtended ] = useState(false)
    const [ messageReadUpdating, setMessageReadUpdating ] = useState(false)
    
    const onClick = () => {
        setMessageRead()
        setExtended((prevExtended) => {
            return !prevExtended
        })
    }
    
    const setMessageRead = async () => {
        if(!message.Read){
            setMessageReadUpdating(true)
            await messageRead(message.Id)
            setMessageReadUpdating(false)
        }
    }

    return(
        <div className={className ?? ""}>
            <div onClick={onClick}> 
                <div className="flex flex-col border-2 border-light-primary justify-between px-5 py-3 rounded-xl hover:text-white hover:bg-light-secondary ">
                    <div className="flex flex-row">
                        <span className=" w-1/2 text-left">{message.Name}</span>
                        <span className=" w-1/2 text-center">{prettierDate(message.ReceivedAt)}</span>
                        {messageReadUpdating && <span className={"w-1/2 text-right"}>Loading..</span>}
                        {!messageReadUpdating && <span className={(message.Read)? "w-1/2 text-right text-green-600 ": "w-1/2 text-right text-red-600"}>{(message.Read)?"Read":"Unread"}</span>}
                    </div>
                    {extended &&
                        <div className="flex flex-col mt-3">
                            <span className="mt-2 font-bold">Message:</span>
                            <span className="mt-2">{message.Message}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}