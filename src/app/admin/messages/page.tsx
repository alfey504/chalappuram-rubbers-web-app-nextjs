import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
import { GetAuthToken } from "@/utils/auth-token-cookie";
import { MessageList } from "./client-components";


export default function MessagesPage(){
    return (
        <div className="min-h-screen">
            <MessagesSection className=" mx-2 sm:mx-10 md:mx-14 lg:mx-32 xl:mx-64 my-10"/>
        </div>
    )
}

const MessagesSection = async ({
    className,
}:{
    className?: string,
}) => {
    const messages = await getMessages()
    console.log(messages)
    return (
        <div className={className?? ""}>    
            <div>
                <MessageList messages={messages??[]}/>
            </div>
        </div>
    )
}


export type Message = {
    Id: number
    Name: string,
    Email: string,
    Message: string,
    Read: boolean,
    ReceivedAt: string
}

const getMessages = async () => {
    try{
        const apiService = new ApiService()
        const token = GetAuthToken()
        const response = await apiService.get("admin/message", {}, token, "no-cache")
        if (!response.ok){
            console.log(await response.json())
            return undefined
        }
        const responseData:Message[] = (await response.json()).Data.data
        return responseData
    }catch(e: any){
        console.log(e)
        return undefined
    }
}