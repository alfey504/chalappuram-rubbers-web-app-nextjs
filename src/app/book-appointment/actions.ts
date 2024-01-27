"use server"

import { ApiService } from "@/utils/api-services"
import { revalidatePath } from "next/cache"
import { FormStateType } from "./client-components"


type AppointmentData = {
    fullName: string,
    email: string,
    date: string,
    timeSlot: string,
} 

export const submitBookAssignment = async (prevState: any, formData: FormData): Promise<FormStateType> => {
    try{
        const appointmentData = parseFormData(formData)
        console.log(appointmentData)
        
        const apiService = new ApiService()
        const data = {
            fullName: appointmentData.fullName,
            email: appointmentData.email,
            appointmentDate: appointmentData.date,
            appointmentTime: appointmentData.timeSlot
        }
        console.log(data)
        const response = await apiService.post("appointment", data)
        console.log(await response.json())
        revalidatePath('/')
        return { success: true, message: "successfully sent appointment request"}
    }catch(e: any){
        console.error(e)
        return { success: false, message: (e.message == undefined)? "there was an issue submitting the appointment request": e.message }
    } 
}

const parseFormData = (formData: FormData): AppointmentData => {
   const fullName = (formData.get("fullName")?? "").toString()
   const email = (formData.get("email")?? "").toString()
   const date = (formData.get("date")?? "").toString()
   const time = (formData.get("timeSlot")?? "").toString()

   if(fullName == ""){ throw new Error("Name not found")}
   if(email == ""){ throw new Error("Email not found")}
   if(date == ""){ throw new Error("Date not found") }
   if(time == ""){ throw new Error("Please select a time slot") }

   return {
        fullName: fullName,
        email: email,
        date: date,
        timeSlot: time,
   }
 }
