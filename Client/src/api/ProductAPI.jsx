import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductAPI() {

    const [products, setProducts] = useState([])
    const [callback , setCallback] = useState(false)

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get('/api/products');
          //console.log('res', res.data.products)
          setProducts(res.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }

      getProducts() 

    }, [callback])
    
  return (
    { products, setProducts, callback, setCallback }
  )
}

export default ProductAPI