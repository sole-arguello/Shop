import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductAPI() {

    const [products, setProducts] = useState([])
    const [callback , setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            `/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
          //console.log('res', res.data.products)
          setProducts(res.data.products);
          setResult(res.data.result);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }

      getProducts() 

    }, [callback, page, category, sort, search])
    
  return (
    { products, setProducts, callback, setCallback, category, setCategory, 
      sort, setSort, search, setSearch, page, setPage, result, setResult }

  )
}

export default ProductAPI