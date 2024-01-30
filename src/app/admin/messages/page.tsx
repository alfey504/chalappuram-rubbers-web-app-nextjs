import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
import { GetAuthToken } from "@/utils/auth-token-cookie";
import { MessageBox, MessageList } from "./client-components";
import { CustomCheckBox } from "@/components/custom-checkbox";


export default function MessagesPage(){
    return (
        <div>
            <AdminNavBar />
            <MessagesSection className=" mx-64 my-10"/>
            <Footer />
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