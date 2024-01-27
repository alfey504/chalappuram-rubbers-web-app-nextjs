
export class ApiService {

    baseURI = new URL("http://localhost:8080/api/")

    async post(endpoint: string, data: any): Promise<Response>{
        const uri = this.baseURI + endpoint
        const response = await fetch(uri, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return response
    }

    async get(endpoint: string, params?: any): Promise<Response> {
        let uri: string
        let queryString = ""
        if (params != undefined){
            queryString = this.makeQueryString(params)
        }
        uri = this.baseURI + endpoint + queryString
        const response = await fetch(uri, {
            "method": "GET",
            "mode": "cors",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    }

    private makeQueryString(queries: any): string {
        let queryString = "?"
        for (const [key, value] of Object.entries(queries)){
            queryString += `${key}=${value}&`
        }
        return queryString
    }
} 