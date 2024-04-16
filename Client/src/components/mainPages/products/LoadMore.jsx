import { useContext } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import './LoadMore.css'

function LoadMore() {

    
    const state = useContext(GlobalContext)
    const { products, setProducts, callback, setCallback,
         category, setCategory, sort, setSort, search, setSearch, 
         page, setPage, result, setResult} = state.productsApi
    
    const {categories} = state.categoriesApi

  return (
    <div className="load-more">
        { 
            result < page * 9 
            ? ""
            : <button onClick={() => setPage(page + 1)}>Load More</button>
        }
    </div>
  )
}

export default LoadMore