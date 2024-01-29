import { Footer } from "@/components/footer";
import { AdminNavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
import { GetAuthToken } from "@/utils/auth-token-cookie";
import { MessageBox } from "./client-components";


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
                <MessageTitle />
                {messages?.map( (message, i) =>{
                    return <MessageBox className="my-3" message={message} key={i}/>
                })}
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
            <a href=""> 
                <div className="flex flex-row justify-between px-5 py-3 rounded-xl text-lg">
                    <span className="">Name</span>
                    <span className="">Date</span>
                    <span className="">Read Status</span>
                </div>
            </a>
        </div>
    )
}

export type Message = {
    Id: number
    Name: string,
    Email: string,
    Message: string,
    Read: false,
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