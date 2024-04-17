import { useContext, useState } from "react"
import { GlobalContext } from "../../context/GlobalState"
import Menu from "./icons/bar.svg"
import Cart from "./icons/cart.svg"
import Close from "./icons/close.svg"//fontawesome icons
import '../header/header.css'
import { Link } from "react-router-dom"
import axios from 'axios'
function Header() {
    const state = useContext(GlobalContext)
    const { isLogged, setIslogged, isAdmin, setIsAdmin, cart } = state.userApi
    const [ menu, setMenu ] = useState(false)

    //console.log('state header', state)
    //console.log('cart in header', cart)
   // console.log('isLogged', state.userApi.isLogged)
    //console.log('isAdmin', state.userApi.isAdmin)
    const adminRouter = () =>{
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
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
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={loggedOut()}>Logout</Link></li>
            </>
           )
    }

    const toggleMenu = () =>{
        setMenu(!menu)
    }

    const styleMenu ={
        left: menu ? 0 : '-100%'
    }

return (
    <header>
        <div className="menu" onClick={toggleMenu}>
            
            <img src={Menu} alt="menu" width={30}/>
        </div>
        <div className="logo">
            <h1>
                <Link to="/">{isAdmin ? 'Admin' : 'My Shop'}</Link>
            </h1>
        </div>

        <ul style={styleMenu}>
            <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
            {isAdmin && adminRouter()}
            {isLogged ? loggedRouter() : <li><Link to="/login">Login & Register</Link></li>}

            <li onClick={toggleMenu}>
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
