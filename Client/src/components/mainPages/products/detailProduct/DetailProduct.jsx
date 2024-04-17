import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../../context/GlobalState';
import ProductItem from '../../utils/Product_Item/ProductItem';

import './DetailProduct.css';

function DetailProduct() {
  const { id } = useParams(); // Obtenemos el id del producto de los parámetros de la URL
  const state = useContext(GlobalContext); // Accedemos al contexto para obtener los productos
  const { products, addCart } = state.productsApi;
  const [detailProduct, setDetailProduct] = useState(null);
  const navigate = useNavigate();

  //console.log("idParams", id);

  useEffect(() => {
    const product = products.find(product => product._id === id);
    setDetailProduct(product);
  }, [id, products]);
  //console.log("detailProduct", detailProduct)
  if (!detailProduct) return <div>Producto no encontrado</div>; // Manejar el caso en que el producto no se encuentre

  
  const handleBuyNow = async () => {
    try {
      // Agregar el producto al carrito
      await addCart(detailProduct);

      // Redirigir al usuario al carrito
      navigate('/cart');
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
  return (
    <>
        <div className='detail'>
            <img src={detailProduct.images.url} alt={detailProduct.title} />
            <div className='box-detail'>
                <div className='row'>
                <h2>{detailProduct.title}</h2>
                <h6>ID: {detailProduct.product_id}</h6>
                </div>
                <h5>${detailProduct.price}</h5>
                <p>
                    <h4 style={{textDecoration: 'underline', color: 'whitesmoke'}}>Content: </h4>
                    {detailProduct.content}
                </p>
                <p>
                    <h4 style={{textDecoration: 'underline', color: 'whitesmoke'}}>Description: </h4>
                    {detailProduct.description}
                </p>
                <p>SOLD: {detailProduct.sold}</p>
                <button className='cart' onClick={handleBuyNow}>BUY NOW</button>
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
