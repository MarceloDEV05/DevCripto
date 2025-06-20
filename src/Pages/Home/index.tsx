import { FiSearch } from "react-icons/fi"

import { useState, useEffect } from "react"


interface CoinsProps {
    formatPrice?: string;
    formatValueMarket?: string;  
    formatVolume:string;   
    id:string;
    symbol:string;
    name:string;
    changePercent24Hr: string;
    priceUsd:string;
    marketCapUsd:string;
    volumeUsd24Hr:string

}

interface DataProp{
    data: CoinsProps[]
}

export const Home = () => {

    const [coins, setCoins] = useState<CoinsProps[]>([])

    useEffect(() => {
    getCoins()
   }, [])

    async function getCoins(){
    fetch(`https://rest.coincap.io/v3/assets?apiKey=b0461c460124d6bb429754a4a5c6913c89ac80b1fcd7694cb3d2e83c0a77624a`)
    .then((response) => response.json())
    .then((data: DataProp) => {
        const coinData = data.data
        const price = Intl.NumberFormat('en-US', {
            style: "currency",
            currency: 'USD'
        });

        const priceCompact = Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD',
            notation: 'compact'
        });

        const formatPrice = coinData.map((item) => {
            const format = {
                ...item,
                formatPrice: price.format(Number(item.priceUsd)),
                formatValueMarket: priceCompact.format(Number(item.marketCapUsd)),
                formatVolume: priceCompact.format(Number(item.volumeUsd24Hr))
            }
            return format
        })

        const coinList = [...coins, ...formatPrice]
        setCoins(coinList)
        
        
    })
    }
    


    return(
        <main className="w-full h-screen ">
            <form className="flex gap-2 items-center justify-center m-auto w-100 max-w-3xl p-2 rounded bg-zinc-900 mt-6">
                <input type="text"
                placeholder="Ex. Bitcoin"
                className=" p-2 w-full rounded bg-zinc-950 shadow-white outline-none "
                />

                <button className="flex items-center justify-center">
                    <FiSearch size={28}/>
                </button>
            </form>

          <aside className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-3 gap-8 px-8 ">
           {coins.length > 0 &&
              coins.map((coin) => (

                <section key={coin.id} className="mt-10 border rounded-md w-full max-w-xl h-70 bg-zinc-900 hover:scale-110 duration-300 cursor-pointer">

                <article className="flex gap-5 items-center px-5 py-5">
                    <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`} alt="" className="h-10 hover:scale-110 duration-300 hover:rotate-25" />

                    <h1 className="font-bold text-xl">{coin.name}</h1>
                </article>

                <div className="flex justify-around px-1">
                    <div className="mt-6">
                        <h2>Preço: {coin.formatPrice}</h2>
                          <br />
                        <h3>Valor de Mercado: {coin.formatValueMarket}</h3>
                    </div>

                    <div className="mt-6">
                        <h2>Volume: {coin.formatVolume}</h2>
                           <br />

                        <h3 className="text-right">
                        Mudança 24H: <p className={Number(coin.changePercent24Hr) > 0 ? 'text-green-500': 'text-red-500'}>{Number(coin.changePercent24Hr).toFixed(2)}%</p>
                        </h3>

                    </div>
                </div>
            </section>
            ))}
          </aside>
        </main>
    )
}