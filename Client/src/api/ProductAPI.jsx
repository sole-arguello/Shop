import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductAPI() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        //console.log('res', res.data.products)
        setProducts(res.data.products);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
    }

    useEffect(() => {
        getProducts()
    }, [])
  return (
    {products}
  )
}

export default ProductAPI