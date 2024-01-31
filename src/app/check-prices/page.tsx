import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { ApiService } from "@/utils/api-services";
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
            <Prices className="mt-20" goodsPrices={data}/>
            <Footer className="mt-20"/>
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
    const classes = (className == undefined) ? "" : className
    const titleClasses = "h-16 text-white text-xl font-light"
    return(
        <div className={classes  + " flex flex-col items-center justify-center"}>
            <span className=" text-2xl text-light-primary font-bold">Prices</span>
            <table className="mt-10 rounded-lg w-10/12 sm:w-4/5">
                <thead>
                    <tr className="bg-light-secondary">
                        <th className={titleClasses}>produce</th>
                        <th className={titleClasses}>best price</th>
                        <th className={titleClasses}>average price</th>
                        <th className={titleClasses}>worst price</th>
                    </tr>
                </thead>
                <tbody className="[&>*:nth-child(even)]:bg-light-alt">
                    <GoodsRow prices={goodsPrices.Rubber} goods="Rubber" />
                    <GoodsRow prices={goodsPrices.Pepper} goods="Pepper" />
                    <GoodsRow prices={goodsPrices.Nutmeg} goods="Nutmeg" />
                    <GoodsRow prices={goodsPrices.Mace} goods="Mace" />
                </tbody>

            </table>
        </div>
    )
}

const GoodsRow = ({
    prices,
    goods,
}:{
    prices: Prices,
    goods: string,
}): ReactElement => {

    const className = "text-center h-16 text-xl pl-5 sm:h-24"
    return(
        <tr>
            <td className={className + " text-light-primary"}>{goods}</td>
            <td className={className}>{prices.MaxPrice}</td>
            <td className={className}>{prices.AvgPrice}</td>
            <td className={className}>{prices.MinPrice}</td>
        </tr>
    )
}

type Prices = {
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
    try {
        const apiService = new ApiService()
        const response = await apiService.get("goods", undefined, "no-cache")
        const data = await response.json()
        const goodsPrices: GoodsPrices = data.Data.data
        console.log(goodsPrices)
        return {success: true, data: goodsPrices, message: "success"}
    }catch(e: any){
        console.log(e)
        return {success: false, data: undefined, message: "There was some issues fetching the data"}
    }
}
