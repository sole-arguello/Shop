import { GlobalContext } from '../../../../context/GlobalState'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'


function ProductItem({product, isAdmin}) {

  const state = useContext(GlobalContext)
  console.log('Estado en product item', state)
  const { addCart } = state.userApi
  console.log('addCart', addCart)


  return (
    <div className="product_card">
        {isAdmin && <input type="checkbox" checked={product.checked} />}
        <img src={product.images.url} alt={product.title} />
        <div className="product_box"> 
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.description}</p>
        </div>
        <div className="row_btn">
            { isAdmin 
            ? <>
                <Link id="btn_buy" to="#!">DELETE </Link>
                <Link id="btn_view" to={`/edit_product/${product._id}`}>EDIT </Link>
              </> 
            : <>
                <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>Buy </Link>
                <Link id="btn_view" to={`/detail/${product._id}`}>View </Link>            
              </>
            }
       
        </div>
    </div>
  )
}

export default ProductItem