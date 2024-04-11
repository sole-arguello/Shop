import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Menu from "./icons/bar.svg"
import Cart from "./icons/cart.svg"
import Close from "./icons/close.svg"//fontawesome icons
import '../header/header.css'
import { Link } from "react-router-dom"
import axios from 'axios'
function Header() {
    const state = useContext(GlobalContext)
    console.log('state', state)
    const { isLogged, setIslogged, isAdmin, setIsAdmin } = state.userApi
    console.log('isLogged', state.userApi.isLogged)
    console.log('isAdmin', state.userApi.isAdmin)
    const { cart } = state.userApi
    console.log('cart in header', cart)
    const adminRouter = () =>{
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>,
                <li><Link to="/category">Category</Link></li>
            </>
           )
    }

    const loggedOut = async () =>{
        await axios.get('/api/user/logout')
        localStorage.clear()
        setIslogged(false)
        setIsAdmin(false)
    }
    const loggedRouter = () =>{
        return (
            <>
                <li><Link to="/history">History</Link></li>,
                <li><Link to="/" onClick={loggedOut}>Logout</Link></li>
            </>
           )
    }

return (
    <header>
        <div className="menu">
            
            <img src={Menu} alt="menu" width={30}/>
        </div>
        <div className="logo">
            <h1>
                <Link to="/">{isAdmin ? 'Admin' : 'My Shop'}</Link>
            </h1>
        </div>

        <ul>
            <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
            {isAdmin && adminRouter()}
            {isLogged ? loggedRouter() : <li><Link to="/login">Login & Register</Link></li>}
            <li>
                <img src={Close} alt="close" width={30} className="menu"/>
            </li>
        </ul>
        {
            isAdmin 
            ? '' 
            : <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to='/cart'>
                    <img src={Cart} alt="cart" width={40}/>
                </Link>
              </div> 
        }
    </header>
  )
}

export default Header
