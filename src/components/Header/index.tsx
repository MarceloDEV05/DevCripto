import { FiLogIn } from "react-icons/fi"


export const Header = () => {
    return(
        <header className="flex w-full justify-between px-8 bg-zinc-950 h-16 items-center">
            <h1 className="font-bold text-3xl text-white">Web<strong className="text-blue-600">CRIPTO</strong></h1>
            <div>
                <button>
                    <FiLogIn size={25}/>
                </button>
            </div>
        </header>
    )
}