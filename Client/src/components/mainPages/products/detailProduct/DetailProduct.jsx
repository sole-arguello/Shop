import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../../context/GlobalState';
import ProductItem from '../../utils/Product_Item/ProductItem';

import './DetailProduct.css';

function DetailProduct() {
  const { id } = useParams(); // Obtenemos el id del producto de los parámetros de la URL
  //console.log("idParams", id);
  const { productsApi } = useContext(GlobalContext); // Accedemos al contexto para obtener los productos
  const { products } = productsApi;
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    const product = products.find(product => product._id === id);
    setDetailProduct(product);
  }, [id, products]);
  //console.log("detailProduct", detailProduct)
  if (!detailProduct) return <div>Producto no encontrado</div>; // Manejar el caso en que el producto no se encuentre

  return (
    <>
        <div className='detail'>
            <img src={detailProduct.images.url} alt={detailProduct.title} />
            <div className='box-detail'>
                <div className='row'>
                <h2>{detailProduct.title}</h2>
                <h6>{detailProduct.product_id}</h6>
                </div>
                <span>${detailProduct.price}</span>
                <p>{detailProduct.content}</p>
                <p>{detailProduct.description}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to='/cart' className='cart'>BUY NOW</Link>
            </div>
        </div>

        <div>
            <h2>Related Products</h2>
            <div className='products'>
                {
                    products.map(product => (
                        product.category === detailProduct.category 
                        ? <ProductItem key={product._id} product={product} /> 
                        : null
                    ))
                }
            </div>
        </div>
    </>
  );
  
}

export default DetailProduct;
