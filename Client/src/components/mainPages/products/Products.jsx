import { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ProductItem from '../utils/Product_Item/ProductItem';
import Loading from '../utils/Loading/Loading';
import Filters from './Filters';
import LoadMore from './LoadMore';
import axios from 'axios';
import './Products.css';


function Products() {
    const state = useContext(GlobalContext);
    const { products, setProducts, callback, setCallback } = state.productsApi;
    const { isAdmin } = state.userApi
    const [ isChecked, setIsChecked ] = useState(false)
    const token = state.token[0]
    const [ setLoading ] = useState(false)

    

      // console.log('Estado componente products', state)
      // console.log('productos componente', products)
     // console.log('Products isAdmin', isAdmin)
    // console.log('addCart in products', addCart)

    const deleteProduct = async(id, public_id) => {

        try {
          setLoading(true)
          const destroyImg = axios.post(`/api/destroy`, 
          {public_id: public_id},
          {headers: { Authorization: token}},
          )
    
          const deleteProduct = axios.delete(`/api/products/${id}`, 
          {headers: { Authorization: token}}
          )
    
          await destroyImg
          await deleteProduct
          setLoading(false)
          setCallback(!callback)
        } catch (error) {
          //console.log('Error en delete product', error.response.data.message)
          alert(error.response.data.message)
        }
      }

    const checkAll = () => {
        setIsChecked(!isChecked)
        products.forEach(product => {
            product.checked = !isChecked
        })
        setProducts([...products])
    }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
        
    }
   
    return (
        <>
        <Filters />
        { isAdmin &&
            <div className='delete-all' style={{textAlign: 'right', margin: '20px'}}>
                <span style={{textTransform: 'uppercase', color: 'blue', letterSpacing: '1.3px' }}>Select All</span>
                <input type="checkbox" checked={isChecked} onChange={checkAll} 
                style={{height: '25px', width: '25px', transform: 'translateX(5px)', margin: '0 15px' }}/>
                <button onClick={deleteAll} 
                style={{ border: '1px solid crimson ', padding: '10px 25px', 
                color:'crimson', textTransform: 'uppercase'}}>Delete all</button>    
            </div>
        }
            <div className='products'>
                {products.map( product => {
                    return <ProductItem key={product._id} product={product} setProducts={setProducts} isAdmin={isAdmin}
                    callback={callback} setCallback={setCallback} deleteProduct={deleteProduct} products={products}/>})
                }
 
            </div>
            <LoadMore />
            {
                products.length === 0 && <Loading />
            }
        </>
    );
}

export default Products;
