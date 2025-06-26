import { FiSearch } from "react-icons/fi"
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

import { useState, useEffect, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export interface CoinsProps {
    formatPrice?: string;
    formatValueMarket?: string;
    formatVolume: string;
    id: string;
    symbol: string;
    name: string;
    changePercent24Hr: string;
    priceUsd: string;
    marketCapUsd: string;
    volumeUsd24Hr: string

}

interface DataProp {
    data: CoinsProps[]
}

export const Home = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const [coins, setCoins] = useState<CoinsProps[]>([])
    const [offset, setOffset] = useState(0)
    const url = `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=b0461c460124d6bb429754a4a5c6913c89ac80b1fcd7694cb3d2e83c0a77624a`

    useEffect(() => {
        getCoins()
    }, [offset])

    async function getCoins() {
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

    function searchCoin(e: FormEvent) {
        e.preventDefault()

        if (input === '') {
            toast.error('Digite o nome da moeda')
            return
        }
        navigate(`/detail/${input}`)
    }


    function getMoreCoins() {
        if (offset === 0) {
            setOffset(10)
            return
        } else {
            setOffset(offset + 10)
        }
    }


    return (
        <main className="w-full px-4 lg:px-8 pb-10">
            <form onSubmit={searchCoin} className="flex gap-2 items-center justify-center m-auto lg:w-100 w-full max-w-xl lg:max-w-3xl p-2 rounded bg-zinc-900 mt-6">
                <input type="text"
                    placeholder="Ex. Bitcoin"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className=" p-2 w-full rounded bg-zinc-950 shadow-white outline-none "
                />

                <button type="submit" className="flex items-center justify-center">
                    <FiSearch size={28} />
                </button>
            </form>

            <div className="bg-black px-5 rounded-md p-6 flex flex-col w-full h-full text-center gap-8 mt-20">
                {coins.length > 0 && coins.map((coin) => (
                    <section key={coin.id} className="grid grid-cols-1 lg:grid-cols-3 items-center text-center justify-between border-b-2 border-gray-600 gap-5 py-3">

                        <div className="flex items-center gap-3 w-full">
                            <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`} alt="" className="h-10 hover:scale-110 duration-300 hover:rotate-25" />

                            <Link to={`/detail/${coin.id}`}>
                                <h1 className="text-center text-2xl lg:text-xl">{coin.name}</h1>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:flex-row items-center lg:justify-around gap-10 mt-10 lg:gap-20 lg:mt-0">
                            
                            <div className="text-center flex gap-2">
                                <p>Preço:</p>
                                <span>{coin.formatPrice}</span>

                            </div>

                            <div className="flex gap-3">
                                <p className="flex">Mercado:</p>
                                <span>{coin.formatValueMarket}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:flex items-center gap-10 lg:gap-20 justify-center">
                            <h2 className="flex">Volume: {coin.formatVolume}</h2>

                            <div className="flex justify-between gap-2">
                                <p className="font-medium">24h:</p>
                                <span className={Number(coin.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Number(coin.changePercent24Hr).toFixed(2)}%
                                    {Number(coin.changePercent24Hr) > 0 ? (
                                        <FaCaretUp size={15} className="inline animate-pulse ml-1"/>
                                    ) : (
                                        <FaCaretDown size={15} className="inline animate-pulse ml-1" />
                                    )}
                                </span>
                            </div>

                        </div>
                    </section>
                ))}
            </div>

            <button
                className="bg-blue-500 lg:w-60 w-full  mt-10 flex items-center justify-center p-2 rounded-md"
                onClick={getMoreCoins}>
                mais...
            </button>
        </main>
    )
}