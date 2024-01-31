"use server"

import { ApiService } from "@/utils/api-services"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const Login = async (prevState: any, formData: FormData) => {
    const { success, message, data } = parseFormData(formData)
    let loginSuccess = false
    console.log(success, message, data)
    if (!success){
        return message 
    }

    try {
        const response = await makeLoginRequest(data.username, data.password)
        if(!response.ok){
            const responseData = await response.json()
            if(responseData.Status != undefined && responseData.Status == 401){
                return "Incorrect username or password"
            }
            return "there was an issue logging you in"
        }

        const responseData = await response.json()
        console.log(responseData)
        setHttpOnlyCookies("AUTH_TOKEN", responseData.Data?.data?.token ?? "uff")
        loginSuccess = true

    }catch(e: any){
        console.log(e)
        return "there was an issue logging you in"
    }

    if (loginSuccess){
        redirect("/admin/appointment-requests")
    }
}

const setHttpOnlyCookies = (name: string, value: string) => {
    const cookieStore = cookies()
    cookieStore.set({
        name: name,
        value: value,
        httpOnly: true,
        path: "/"
    })
}

const parseFormData = (formData: FormData) => {
    const username = formData.get("username")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""

    if (username == "" || password == ""){
        return {
            success: false,
            message: "missing username or password",
            data: {}
        }
    }

    return {
        success: true,
        message: "success",
        data: {
            username: username,
            password: password,
        }
    }
}

const makeLoginRequest = async (username?: string, password?: string) => {
    const apiService = new ApiService()
        const body = {
            username: username ?? "",
            password: password ?? ""
        }
    return await apiService.post("admin/log-in", body, "no-cache")
}