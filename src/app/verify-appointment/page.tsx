import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
import { error } from "console";
import { redirect } from "next/navigation";

export default function VerifyAppointment( { searchParams } : { searchParams: any}){
    
    return (
        <main>
            <NavBar />
            <Message verification_hash={searchParams.verification_hash}  className=" h-screen"/>
            <Footer />
        </main> 
    )
}

const Message = async ({
    verification_hash,
    className,
} : {
    verification_hash: any,
    className?: string
}) => {

    if(verification_hash == undefined){
        redirect("/")
    }
    const message = await verifyAppointment(verification_hash)
    return (
        <div className={className ?? ""}>
            <span>{message}</span>
        </div>
    )
}

const verifyAppointment = async (verification_hash: string) => {
    try {
        const apiService = new ApiService()
        const response = await apiService.put("appointment/verify", {verification_hash: verification_hash}, {}, "no-store", undefined)
        if(!response.ok){
            const responseData = await response.json()
            console.log(responseData)
            return responseData.Message as string
        }
        return "Appointment was verified successfully"
    }catch(e: any){
        console.log(e)
        return "There was an issue verifying your appointment"
    }
}