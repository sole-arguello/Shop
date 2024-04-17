import { GlobalContext } from '../../../../context/GlobalState'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './ProductItem.css'

function ProductItem({product, products, setProducts, isAdmin, deleteProduct}) {

  const state = useContext(GlobalContext)
  const { addCart } = state.userApi

  const [ loading ] = useState(false)
    //console.log('Estado en product item', state)
  //console.log('addCart', addCart)

  const handleCheck = async(id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    });
    setProducts([...products])
  }


  if(loading) return <div className='product_card'><Loading/></div> 

  return (
    <div className="product_card">
        
        {isAdmin && <input type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)}/>}
        
        <img src={product.images.url} alt={product.title} />
        <div className="product_box"> 
            <h2>{product.title}</h2>
            <h1>${product.price}</h1>
            <p>{product.description}</p>
        </div>
        <div className="row_btn">
            { isAdmin 
            ? <>
                <Link id="btn_buy" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>DELETE </Link>
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