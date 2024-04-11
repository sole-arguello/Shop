import { useEffect, useState } from "react"
import axios from "axios"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart , setCart] = useState([])

    useEffect(() => {
       
        if(token) {
            //console.log('token user api', token)
            const getUser = async () => {
                try {
                    const res = await axios.get('/api/user/infor', {
                        headers: { Authorization: token }
                    })
                    //console.log('res userAPI', res)
                    setIsLogged(true)
                    console.log('RES', res.data.user.role)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)//cambia la vista del front
                    setCart(res.data.user.cart)
                } catch (error) {
                    console.log('error user api', error)
                    alert("User Api " + error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        //verificar si el usuario esta logueado
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item => {
            return item._id !== product._id
        })
        // verificar que el producto no este en el carrito
        if(check){

            setCart([...cart, {...product, quantity: 1}])
            await axios.patch('/api/user/addCart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: { Authorization: token }
            })

        }else{
            console.log('El producto ya existe en el carrito')
            alert("The product is already in the cart")
        }
    }
  return (
    {isLogged, setIsLogged, isAdmin, setIsAdmin, cart, setCart, addCart}
  )
}

export default UserAPI