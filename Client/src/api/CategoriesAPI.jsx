import { useEffect, useState } from "react"
import axios from "axios"


function CategoriesAPI() {

  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category')
      console.log('res categorias', res.data.categories)
      setCategories(res.data.categories)
    }
    getCategories()
  }, [callback])
  return (
    {categories, setCategories, callback, setCallback}
  )
}

export default CategoriesAPI