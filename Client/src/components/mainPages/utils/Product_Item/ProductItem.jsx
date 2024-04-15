import { GlobalContext } from '../../../../context/GlobalState'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './ProductItem.css'
import Loading from '../Loading/Loading'


function ProductItem({product, setProducts, isAdmin, callback, setCallback}) {

  const state = useContext(GlobalContext)
  const { addCart } = state.userApi
  const token = state.token[0]
  const [ loading, setLoading ] = useState(false)
    //console.log('Estado en product item', state)
  //console.log('addCart', addCart)

  const deleteProduct = async() => {

    setLoading(true)
    try {
      const destroyImg = axios.post(`/api/products`, 
      {public_id: product.images.public_id},
      {headers: { Authorization: token}},
      )

      const deleteProduct = axios.delete(`/api/products/${product._id}`, 
      {headers: { Authorization: token}}
      )

      await destroyImg
      await deleteProduct
      setLoading(false)
      setCallback(!callback)
    } catch (error) {
      console.log('Error en delete product', error.response.data.message)
      alert(error.response.data.message)
    }
  }

  const handleCheck = async() => {
    product.checked = !product.checked
  }

  if(loading) return <div className='product_card'><Loading/></div> 

  return (
    <div className="product_card">
        {isAdmin && <input type="checkbox" checked={product.checked} onChange={handleCheck}/>}
        <img src={product.images.url} alt={product.title} />
        <div className="product_box"> 
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.description}</p>
        </div>
        <div className="row_btn">
            { isAdmin 
            ? <>
                <Link id="btn_buy" to="#!" onClick={deleteProduct}>DELETE </Link>
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