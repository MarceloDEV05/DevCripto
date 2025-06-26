import { useState, useEffect } from "react"
import { type CoinsProps } from "../Home"
import { useParams, useNavigate } from "react-router-dom"
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

interface DataProps{
    data: CoinsProps
}

export const Details = () => {
    const [detailCoin, setDetailCoin] = useState<CoinsProps>()
    const navigate = useNavigate()
    const {cripto} = useParams()
    const url = `https://rest.coincap.io/v3/assets/${cripto}?apiKey=b0461c460124d6bb429754a4a5c6913c89ac80b1fcd7694cb3d2e83c0a77624a`

    useEffect(() => {
 async function getDetailsCoins(){
    fetch(url)
    .then((response) => response.json())
    .then((data: DataProps) => {
        if('error' in data){
            navigate('/')
            return
        }

        const price = Intl.NumberFormat('en-US', {
            style: "currency",
            currency: 'USD'
        });

        const priceCompact = Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'USD',
            notation: 'compact'
        });

        const result = {
                ...data.data,
                formatPrice: price.format(Number(data.data.priceUsd)),
                formatValueMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                formatVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
            }
            

        setDetailCoin(result)
        
        
    })
    }
     getDetailsCoins()
     }, [cripto])


     function goHome() {
        navigate('/')
     }

    return(
        <main className="w-full h-full px-8 justify-center mt-20">
            <div className="bg-zinc-800 rounded-xl px-10 py-10 lg:p-20 max-w-2xl flex m-auto">
                {detailCoin && (
                    <section key={detailCoin.id} className="flex flex-col justify-center w-full text-center items-center">

                    <div className="flex items-center gap-3">
                        <img src={`https://assets.coincap.io/assets/icons/${detailCoin.symbol.toLocaleLowerCase()}@2x.png`} alt="" className="h-12 lg:h-20 hover:scale-110 duration-300 hover:rotate-25" />

                        <h1 className=" text-3xl">{detailCoin.name}</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 text-xl">
                        <h2 className="text-center">Preço: {detailCoin.formatPrice}</h2>

                        <h3 className="text-center">Valor Mercado: {detailCoin.formatValueMarket}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5 text-xl">
                           <h2 className="text-center flex justify-center items-center">Volume: {detailCoin.formatVolume}</h2>

                        <h3 className="flex gap-3 text-center">
                            {Number(detailCoin.changePercent24Hr) > 0 ? (
                            <div className="flex gap-2">
                            <p className="flex">Mudança 24h:</p>
                             <span className="text-green-500 flex items-center gap-2">{Number(detailCoin.changePercent24Hr).toFixed(2)}%
                             <FaCaretUp size={15} color="#fff" className="animate-pulse"/>
                             </span>
                              </div>
                            ) : (
                            <div className="flex gap-2">
                            <p className="flex">Mudança 24h:</p>
                             <span className="text-red-500 flex items-center gap-2">{Number(detailCoin.changePercent24Hr).toFixed(2)}%
                             <FaCaretDown size={15} color="#fff" className="animate-pulse"/>
                             </span>
                              </div>
                            )}
                        </h3>

                    </div>
                </section>
                )}

            </div>
                <div className="mt-10 text-center">
                    <button onClick={goHome} className="bg-blue-500 p-2 w-60 rounded-md font-medium hover:scale-110 duration-300">
                      Voltar
                     </button>
                </div>
            </main>
    )
}