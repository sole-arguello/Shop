import { useEffect, useState } from "react"
import axios from "axios"

function ProductsApi() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await axios.get('/api/products')
        console.log("data", response.data.products)
    
    }

    useEffect(() => {
        getProducts()
    }, [])
  return  {products: [products, setProducts]}
}

export default ProductsApi