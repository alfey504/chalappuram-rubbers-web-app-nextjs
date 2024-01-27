"use server"

import { ApiService } from "@/utils/api-services"
import { FormStateType } from "../book-appointment/client-components"

export async function SendMessage(prevState: any, formData: FormData) : Promise<FormStateType> {
    try{
        var { name, email, message } = parseFormData(formData)
    }catch(e: any){
        return { success: false, message: (e.message == undefined)? "Failed to parse form data": e.message}
    }


    const data = {
        name: name,
        message: message,
        email: email,
    }
    
    try{
        const apiService = new ApiService()
        const response = await apiService.post("message", data)
        const responseData = await response.json()
        if(!response.ok){
            return {success: false, message: responseData.Message}
        }
        return {success: true, message: "Successfully sent message"}
    }catch(e: any){
        console.log(e)
        return {
            success: false, 
            message: (e.message == undefined)? "there was an issue sending message. please try again": e.message
        }
    }
}

const parseFormData = (formData: FormData) => {
    const name = formData.get("name")?.toString() ?? ""
    const email = formData.get("email")?.toString() ?? ""
    const message = formData.get("message")?.toString() ?? ""

    if(name == "") throw new Error("Please enter a name")
    if(email == "") throw new Error("Please enter a email")
    if(message == "") throw new Error("Please enter a message")

    return {
        name: name,
        email: email,
        message: message
    }
}