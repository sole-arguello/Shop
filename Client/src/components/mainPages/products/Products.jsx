import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ProductItem from '../utils/Product_Item/ProductItem';
import './Products.css';
import Loading from '../utils/Loading/Loading';

function Products() {
    const state = useContext(GlobalContext);
    //console.log('Estado products', state)
    const { products } = state.productsApi;
    //console.log('products', products)
    const { isAdmin } = state.userApi
    console.log('Products isAdmin', isAdmin)
    // const { addCart } = state.userApi
    // console.log('addCart in products', addCart)

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
