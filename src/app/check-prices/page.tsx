import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
import { prettierDate } from "@/utils/datetime-utils";
import { revalidatePath } from "next/cache";
import { ReactElement } from "react"

export default async function CheckPrices(): Promise<ReactElement> {
    
    const {success, data, message} = await getGoodsPrices();

    if(!success || data == undefined){
        return (
            <div className="flex justify-center items-center"><span>{message}</span></div>
        )
    }

    return ( 
        <main>
            <NavBar />
            <Prices className="mt-10 mx-2 md:mx-10" goodsPrices={data}/>
            <Footer className="mt-14"/>
        </main>   
    )
}

const Prices = ({
    className,
    goodsPrices,
}:{
    className?: string,
    goodsPrices: GoodsPrices
}): ReactElement => {
    return(
        <div className={className ?? ""}>
            <div className="flex flex-row flex-wrap justify-around">
                <GoodsTable className="mt-5" goodsName="Rubber" goodsPrice={goodsPrices.Rubber}/>
                <GoodsTable className="mt-5" goodsName="Pepper" goodsPrice={goodsPrices.Pepper}/>
                <GoodsTable className="mt-5" goodsName="Arecanut" goodsPrice={goodsPrices.Arecanut}/>
                <GoodsTable className="mt-5" goodsName="Nutmeg" goodsPrice={goodsPrices.Nutmeg}/>
                <GoodsTable className="mt-5" goodsName="Mace" goodsPrice={goodsPrices.Mace}/>
            </div>
        </div>
    )
}

const GoodsTable = ({
    className,
    goodsName,
    goodsPrice
}:{
    className?: string,
    goodsName: string
    goodsPrice: Prices
}) => {

    return (
        <div className={className ?? ""}>
            <table className="rounded-lg ">
                <thead className="bg-light-secondary">
                    <tr className="flex flex-col items-start  text-light-secondary p-2 px-4 rounded-md py-5">
                        <th  className="text-xl font-bold">{goodsName}</th>
                        <th className="font-semibold"> Source : {goodsPrice.Source}</th>
                        <th className="font-medium">updated on: { prettierDate(goodsPrice.DateUpdated)}</th>
                    </tr>
                </thead>
                <GoodsPrices  prices={goodsPrice}/>
            </table>
        </div>
    )
}

const GoodsPrices = ({
    prices,
}:{
    prices: Prices,
}): ReactElement => {
    const className = "text-lg h-12 p-2"
    return(
        <tbody className="[&>*:nth-child(even)]:bg-light-alt">
            <tr>
                <td className={className}>Average Price</td>
                <td className={className}>{prices.AvgPrice}</td>
            </tr>
            <tr>
                <td className={className}>Minimum Price</td>
                <td className={className}>{prices.MinPrice}</td>
            </tr>
            <tr>
                <td className={className}>Maximum Price</td>
                <td className={className}>{prices.MaxPrice}</td>
            </tr>
        </tbody>
    )
}

type Prices = {
    Source: string,
    SourceLink: string,
    DateUpdated: string,
    MaxPrice: string,
    AvgPrice: string,
    MinPrice: string,
}

type GoodsPrices = {
    Rubber: Prices,
    Pepper: Prices,
    Nutmeg: Prices,
    Mace: Prices,
    Arecanut: Prices
}

const getGoodsPrices = async () => {
    "use server"
    try {
        const apiService = new ApiService()
        const response = await apiService.get("goods", undefined, "no-store")
        const data = await response.json()
        const goodsPrices: GoodsPrices = data.Data.data
        console.log(goodsPrices)
        revalidatePath("/")
        return {success: true, data: goodsPrices, message: "success"}
    }catch(e: any){
        console.log(e)
        return {success: false, data: undefined, message: "There was some issues fetching the data"}
    }
}
