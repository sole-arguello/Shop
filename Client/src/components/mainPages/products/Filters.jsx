import { useContext } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import './Filters.css'

function Filters() {
    const state = useContext(GlobalContext)
    const {   callback, setCallback, category, setCategory, sort,
         setSort, search, setSearch} = state.productsApi
    
    const {categories} = state.categoriesApi

    const handleCategory = (e) => {
        setCallback(!callback)
        setCategory(e.target.value)
    }
  return (
    <div className="filter-menu">
        <div className="row">
            <span>Filters</span>
            <select  name="category" value={category} onChange={handleCategory}>
                <option value="">All Products</option>
                {
                    categories.map(category => (
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
        <input type="text" value={search} placeholder="Enter the name for search" 
        onChange={e => setSearch(e.target.value.toLocaleLowerCase())}/>
        
        <div className="row">
            <span>Sort:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-sold">Best Sales</option>
                <option value="sort=-price">Price:  High-Low</option>
                <option value="sort=price">Price: Low-High</option>
            </select>
        </div>
{/* video 31 6.33 */}
    </div>
  )
}

export default Filters