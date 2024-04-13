import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import axios from "axios";
import "./Categories.css";

function Categories() {

  const state = useContext(GlobalContext);
  const { categories, setCategories, callback, setCallback } = state.categoriesApi;
  const [category, setCategory] = useState("");
  const token = state.token[0];
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");
  

  console.log("Estado categorias", state);
  console.log("Token categorias", token);

  const createCategories = async (e) => {
    e.preventDefault();
    try {

        if(onEdit){
            const res = await axios.put(`/api/category/${id} `, { name: category },
                { headers: { Authorization: token } }
            );
            //console.log("Respuesta axios categoria put", res.data.message);
            alert(res.data.message);            

        }else{
            
            const res = await axios.post(
                "/api/category", { name: category },
                { headers: { Authorization: token } }
            );
            //console.log('res axios categorias post', res.data.message)
            alert(res.data.message);

        }
        
        setCallback(!callback);//actualizar categorias
        setCategory(" ");//limpiar categorias
    } catch (error) {
      console.log("Error submit categorias ", error.response.message);
      alert(error.response.data.message);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.message);
      setCallback(!callback);
    } catch (error) {
      console.log('error en delete category', error);
    }
  };

  return (
    <div className="categories">

      <form action="" onSubmit={createCategories}>
        <label htmlFor="category"> Category</label>
        <input type="text" name="category" value={category} required 
        onChange={(e) => setCategory(e.target.value)} />

        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
              <button onClick={() => deleteCategory(category._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Categories;
