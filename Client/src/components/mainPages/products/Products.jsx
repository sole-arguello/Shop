import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ProductItem from '../utils/Product_Item/ProductItem';
import Loading from '../utils/Loading/Loading';
import axios from 'axios';
import './Products.css';


function Products() {
    const state = useContext(GlobalContext);
    console.log('Estado componente products', state)
    const { products, setProducts } = state.productsApi;
    console.log('productos componente', products)
    const { isAdmin } = state.userApi
    console.log('Products isAdmin', isAdmin)
    // const { addCart } = state.userApi
    // console.log('addCart in products', addCart)

    //////Este bloque estaba en products.API////
    const getProducts = async () => {
        try {
          const res = await axios.get('/api/products');
          //console.log('res', res.data.products)
          setProducts(res.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert(error.response.data.message);
        }
      }
  
      useEffect(() => {
          getProducts()
      }, [])

      //////////////////////////////////////////////
    

    return (
        <>
            <div className='products'>
                {products.map( product => {
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin}/>})
                }
 
            </div>
            {
                products.length === 0 && <Loading />
            }
        </>
    );
}

export default Products;
