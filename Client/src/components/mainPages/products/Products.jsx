import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import ProductItem from '../utils/Product_Item/ProductItem';
import './Products.css';
import Loading from '../utils/Loading/Loading';

function Products() {
    const { productsApi } = useContext(GlobalContext);
    //console.log('productos', productsApi.products);

    const { products } = productsApi;

    return (
        <>
            <div className='products'>
                {products.map( product => {return <ProductItem key={product._id} product={product}/>})}
                    {/* <ul>
                        {productsApi.products.map(product => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Price: {product.price}</p>
                            </li>
                        ))}
                    </ul> */}
            </div>
            {
                products.length === 0 && <Loading />
            }
        </>
    );
}

export default Products;
