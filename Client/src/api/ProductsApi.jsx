import { useEffect, useState } from "react"
import axios from "axios"

function ProductsApi() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await axios.get('/api/products')
        console.log(response.data.products)
        const data = await response.json()
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])
  return  {products: [products, setProducts]}
}

export default ProductsApi