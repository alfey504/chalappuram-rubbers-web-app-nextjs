"use client"

import { prettierDate } from "@/utils/datetime-utils"
import { Message } from "./page"
import { useState } from "react"
import { messageRead } from "./actions"
import { CustomCheckBox } from "@/components/custom-checkbox"

const MessageBox = ({
    className,
    message
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
            if(await messageRead(message.Id)) {message.Read = true}
            setMessageReadUpdating(false)
        }
    }

    return(
        <div className={className ?? ""}>
            <div onClick={onClick}> 
                <div className="flex flex-col border-2 border-light-primary justify-between px-5 py-3 rounded-xl hover:text-white hover:bg-light-secondary ">
                    <div className="flex flex-col md:flex-row">
                        <span className=" w-1/2 text-left">{message.Name}</span>
                        <span className=" w-1/2 text-left md:text-center">{prettierDate(message.ReceivedAt)}</span>
                        {messageReadUpdating && <span className={"w-1/2 text-left md:text-right"}>Loading..</span>}
                        {!messageReadUpdating && <span className={(message.Read)? "w-1/2 text-left md:text-right text-green-600 ": "w-1/2 text-right text-red-600"}>{(message.Read)?"Read":"Unread"}</span>}
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



const MessageTitle = ({
    className,
}:{
    className?: string
}) => {

    return(
        <div className={className ?? ""}>
            <div className="flex flex-row justify-between px-5 py-3 rounded-xl text-lg font-semibold text-light-primary">
                <span className="">Name</span>
                <span className="">Date</span>
                <span className="">Read Status</span>
            </div>
        </div>
    )
}

export const MessageList = ({
    messages,
    className,
}: {
    messages: Message[],
    className?: string
}) => {

    const [ showReadMessages, setShowReadMessages ] = useState(true)    

    const filteredMessage = function(){
        if(showReadMessages){ return messages }
        return messages.filter((message)=>{
            return !message.Read
        })
    }()

    const onClick = () => {
        setShowReadMessages((prevState) => {
            return !prevState
        })
    }

    return (
        <div className={className??""}>
            <ShowReadMessagesButton checked={showReadMessages} onClick={onClick}/>
            <MessageTitle />
            {filteredMessage == undefined &&
                <div className="text-center text-light-primary mt-5"> There was some issues getting the messages</div>
            }
            {filteredMessage != undefined && filteredMessage.length <= 0 &&
                <div className="text-center text-light-primary mt-5"> There are no messages </div>
            }
            {filteredMessage?.map( (message, i) =>{
                return <MessageBox className="my-3" message={message} key={i}/>
            })}
        </div>
    )
}

const ShowReadMessagesButton = ({
    className,
    onClick,
    checked,
}:{
    className?: string,
    onClick?: ()=>void,
    checked: boolean
}) => {

    return(
        <div className={className ?? ""}>
            <div className="flex flex-row justify-end px-5 py-3 rounded-xl text-lg">
                <div className="flex flex-row items-center">
                    <CustomCheckBox onClick={onClick} checked={checked}/>
                    <span className="text-light-primary ml-2"> show read messages</span>
                </div>
            </div>
        </div>
    )
}