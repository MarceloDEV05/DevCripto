import { FiSearch } from "react-icons/fi"

import { useState, useEffect, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";


export interface CoinsProps {
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
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const [coins, setCoins] = useState<CoinsProps[]>([])
    const[offset, setOffset] = useState(0)
    const url = `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=b0461c460124d6bb429754a4a5c6913c89ac80b1fcd7694cb3d2e83c0a77624a`

    useEffect(() => {
    getCoins()
   }, [offset])

    async function getCoins(){
    fetch(url)
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
    
    function searchCoin(e:FormEvent){
        e.preventDefault()

        if(input === ''){
            alert('Digite o nome da moeda')
            return
        }
        navigate(`/detail/${input}`)
    }


    function getMoreCoins(){
        if(offset === 0){
            setOffset(10)
            return
        } else{
            setOffset(offset + 10)
        }
    }


    return(
        <main className="w-full h-screen px-8">
            <form onSubmit={searchCoin} className="flex gap-2 items-center justify-center m-auto w-100 max-w-3xl p-2 rounded bg-zinc-900 mt-6">
                <input type="text"
                placeholder="Ex. Bitcoin"
                value={input}
                onChange={ (e) => setInput(e.target.value)}
                className=" p-2 w-full rounded bg-zinc-950 shadow-white outline-none "
                />

                <button type="submit" className="flex items-center justify-center">
                    <FiSearch size={28}/>
                </button>
            </form>

            <div className="bg-black px-5 rounded-md p-6 flex flex-col w-full text-center gap-8  mt-20">
                {coins.length > 0 && coins.map((coin) => (
                    <section key={coin.id} className="grid grid-cols-3 items-center text-center justify-between border-b-2 border-gray-600">

                    <div className="flex items-center gap-3">
                        <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`} alt="" className="h-10 hover:scale-110 duration-300 hover:rotate-25" />

                        <h1 className="text-center">{coin.name}</h1>
                    </div>

                    <div className="flex items-center justify-around gap-20">
                          <h2 className="text-center">Preço: {coin.formatPrice}</h2>

                        <h3>Valor de Mercado: {coin.formatValueMarket}</h3>
                    </div>

                    <div className="flex items-center gap-20 justify-center">
                           <h2>Volume: {coin.formatVolume}</h2>

                        <h3 className="flex gap-4">
                            Mudança 24Hr: <span className={Number(coin.changePercent24Hr) > 0 ? 'text-green-500': 'text-red-500'}> {Number(coin.changePercent24Hr).toFixed(2)}%</span>
                        </h3>

                    </div>
                </section>
                ))}
            </div>

          <button 
          className="bg-blue-500 w-60 mt-10 flex items-center justify-center p-2 rounded-md ml-20"
          onClick={getMoreCoins}>
            mais...
            </button>
        </main>
    )
}