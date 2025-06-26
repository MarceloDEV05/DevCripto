import { FiLogIn } from "react-icons/fi"
import { Logo } from "../Logo"


export const Header = () => {
    return(
        <header className="flex w-full justify-between px-8 bg-zinc-950 h-16 items-center">
            <Logo/>
            <div>
                <button>
                    <FiLogIn size={25}/>
                </button>
            </div>
        </header>
    )
}