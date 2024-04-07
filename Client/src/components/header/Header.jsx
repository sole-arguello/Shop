import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Menu from "./icons/bar.svg"
import Cart from "./icons/cart.svg"
import Close from "./icons/close.svg"//fontawesome icons
import '../header/header.css'
import { Link } from "react-router-dom"
function Header() {
    const value = useContext(GlobalContext)
  return (
    <header>
        <div className="menu">
            
            <img src={Menu} alt="menu" width={30}/>
        </div>
        <div className="logo">
            <h1>
                <Link to="/">My Shop</Link>
            </h1>
        </div>

        <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/login">Login & Register</Link></li>
            <li>
                <img src={Close} alt="close" width={30} className="menu"/>
            </li>
        </ul>
        <div className="cart-icon">
            <span>0</span>
            <Link to='/cart'>
                <img src={Cart} alt="cart" width={40}/>
            </Link>
        </div>
    </header>
  )
}

export default Header
