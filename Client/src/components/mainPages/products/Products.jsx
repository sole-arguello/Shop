import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ProductItem from '../utils/Product_Item/ProductItem';
import Loading from '../utils/Loading/Loading';
import './Products.css';


function Products() {
    const state = useContext(GlobalContext);
    const { products, setProducts, callback, setCallback } = state.productsApi;
    const { isAdmin } = state.userApi
    //const { addCart } = state.userApi
    

      // console.log('Estado componente products', state)
      // console.log('productos componente', products)
     // console.log('Products isAdmin', isAdmin)
    // console.log('addCart in products', addCart)
   
    return (
        <>
            <div className='products'>
                {products.map( product => {
                    return <ProductItem key={product._id} product={product} setProducts={setProducts} isAdmin={isAdmin}
                    callback={callback} setCallback={setCallback}/>})
                }
 
            </div>
            {
                products.length === 0 && <Loading />
            }
        </>
    );
}

export default Products;
