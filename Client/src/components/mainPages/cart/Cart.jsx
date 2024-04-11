import { Link } from "react-router-dom"
import { GlobalContext } from "../../../context/GlobalState"
import { useContext } from "react"

function Cart() {
//res.data.user.cart
  const state = useContext(GlobalContext)
  console.log("estado cart", state)
  const { cart } = state.userApi
  console.log("cart component", cart)

  if(cart.length === 0) 
    return (<h2 style={{textAlign: 'center', fontSize:'5rem'}}>Cart Empty</h2>)
  
  return (
    <div>
      { 
        cart.map(product => {
          return(
            <>
              <div className='detail'>
                <img src={product.images.url} alt={product.title} />
                <div className='box-detail'>
                    <div className='row'>
                    <h2>{product.title}</h2>
                    <h6>{product.product_id}</h6>
                    </div>
                    <span>${product.price}</span>
                    <p>{product.content}</p>
                    <p>{product.description}</p>
                    <p>Sold: {product.sold}</p>
                    <Link to='/cart' className='cart'>BUY NOW</Link>
                </div>
              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default Cart