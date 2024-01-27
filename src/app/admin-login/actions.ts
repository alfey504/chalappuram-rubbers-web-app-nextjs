"use server"

import { ApiService } from "@/utils/api-services"
import { cookies } from "next/headers"

export const Login = async (prevState: any, formData: FormData) => {
    const { success, message, data } = parseFormData(formData)
    console.log(success, message, data)
    if (!success){
        return {
            success: success,
            message: message 
        }
    }

    try {
        const apiService = new ApiService()
        const body = {
            username: data.username ?? "",
            password: data.password ?? ""
        }
        const response = await apiService.post("admin/log-in", body)
        if(!response.ok){
            const responseData = await response.json()
            return {
                success: false,
                message: responseData.Message ?? "failed to login"
            }
        }
        const responseData = await response.json()
        setHttpOnlyCookies("AUTH_TOKEN", responseData.Data?.data?.token ?? "uff")
        return {
            success: true,
            message: "successfully logged in"
        }
    }catch(e: any){
        console.log(e)
        return {
            success: false,
            message: e.message  as string ?? "failed to login user"
        }
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