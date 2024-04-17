import { Link } from "react-router-dom"
import { GlobalContext } from "../../../context/GlobalState"
import { useContext, useEffect, useState } from "react"
import axios  from "axios"
import './Cart.css'
function Cart() {
  const state = useContext(GlobalContext)
  const { cart, setCart } = state.userApi
  const [total, setTotal] = useState(0)
  const token = state.token 
  

  //console.log("estado cart", state)
  //console.log("cart component", cart)
  //console.log(setTotal)
  //calcula el total del carrito
  console.log('token cart', token)
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
    try {
      await axios.patch('/api/user/addCart', {cart}, {
        headers: {
          Authorization: token
        }
      })

      await axios.patch('/api/user/clearCart', {}, {
        headers: {
          Authorization: token
        }
      });
      //actualizar el carrito
      // setCart(cart.map(item => item._id === cart[cart.length-1]._id ? item : item))
    } catch (error) {
      console.log('Error en add to cart', error.response.data.message)
    }
  }
  
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

  const clearCart = () => {
    if (window.confirm("¿Seguro que deseas vaciar el carrito?")) {
      setCart([]); // Vaciar el carrito
      // Actualizar el carrito en el backend (opcional)
      axios.patch('/api/user/clearCart', {}, {
        headers: {
          Authorization: token
        }
      })
    }
  };
  

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
                  <h5>${product.price * product.quantity}</h5>
                  <p>
                    <h4 style={{textDecoration: 'underline', color: 'whitesmoke'}}>Content: </h4>
                    {product.content}
                  </p>
                  <p>
                    <h4 style={{textDecoration: 'underline', color: 'whitesmoke'}}>Description: </h4>
                    {product.description}
                  </p>
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
        <div className="totalCart">
          <h4>Total: <span>$ {total}</span></h4>
          <button onClick={clearCart}>Vaciar Carrito</button>

          <Link to="/payment">Payment</Link>
          </div>
      </div>
    </div>
  )
}

export default Cart