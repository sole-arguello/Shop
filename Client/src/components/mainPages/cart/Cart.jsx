import { Link } from "react-router-dom"
import { GlobalContext } from "../../../context/GlobalState"
import { useContext, useEffect, useState } from "react"
import './Cart.css'
import axios  from "axios"

function Cart() {
//res.data.user.cart
  const state = useContext(GlobalContext)
  console.log("estado cart", state)
  const { cart, setCart } = state.userApi
  console.log("cart component", cart)

  const [total, setTotal] = useState(0)
  console.log(setTotal)
  const { token } = state.token 
  console.log('token cart', token)

  //calcula el total del carrito
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const addToCart = async () => {
    await axios.patch('/api/user/addCart', {cart}, {
      headers: {
        Authorization: token
      }
    })
  }
  
  //incrementar
  const increment = (id) => {
     cart.forEach(item => {
       if(item._id === id){
         item.quantity += 1
       }
     }) 
     setCart([...cart])
     addToCart()
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    }) 
    setCart([...cart])
    addToCart()
  }
  //remover del carrito
  const removeItem = (id) => {
    if(window.confirm("Do you want to delete this product?")){
      cart.forEach((item, index) => {
        if(item._id === id){
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart()
    }
  }

  if(cart.length === 0) 
    return (<h2 style={{textAlign: 'center', fontSize:'5rem'}}>Cart Empty</h2>)
  
  return (
    <div>
      { 
        cart.map(product => {
          return(
            <>
            
              <div className='detail cart'>
                <img src={product.images.url} alt={product.title} className="img_container" />
                <div className='box-detail'>
                  
                  <h2>{product.title}</h2>
                  <span>${product.price * product.quantity}</span>
                  <p>{product.content}</p>
                  <p>{product.description}</p>
                  <div className="amount">
                    <button onClick={() => decrement(product._id)}> - </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increment(product._id)}> + </button>
                  </div>

                  <div className="delete" onClick={() => removeItem(product._id)}> x </div>
                </div>   
                
              </div>
            
            </>
          )
        })
      }
      <div className="total">
        <h4>Total: $ {total}</h4>
        <Link to="#">Payment</Link>
      </div>
    </div>
  )
}

export default Cart