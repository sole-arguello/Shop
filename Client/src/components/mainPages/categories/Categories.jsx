import { useContext, useState } from "react"
import { GlobalContext } from "../../../context/GlobalState"
import axios from 'axios'
import './Categories.css'

function Categories() {
    const state = useContext(GlobalContext)
    const { categories, setCategories, callback, setCallback } = state.categoriesApi
    const [category, setCategory] = useState('')
    const token  = state.token

    console.log('Estado categorias', state)
    console.log('Categorias', categories)
    console.log('Callback categorias', callback)
    console.log('Token categorias', token)

    const createCategories = async (e) =>{
        e.preventDefault()
        try {
                const res = await axios.post('/api/category', {name: category},{
                    headers:{Authorization: token}
                })
                console.log('Respuesta axios categoria', res)
                setCallback(!callback)
                
                alert(res.data.msg)
        } catch (error) {
            console.log("Error submit categorias ",error) 
            alert(error.response.data.msg)
        }

    }

  return (
    <div className="categories">
        <form onSubmit={createCategories}>
            <label htmlFor="category"> Category</label>
            <input type="text" name="category" value={category} required 
            onChange={(e) => setCategory(e.target.value)}/>

            <button type="submit">Save</button>
             
        </form>

        <div className="col">
            { categories.map((category) => (
                
                    <div className="row" key={category._id}>
                        <p>{category.name}</p>
                        <div>
                            <button>Delete</button>
                            <button>Edit</button> 
                        </div>
                    </div>               
                
            ))}
        </div>
    </div>
  )
}

export default Categories