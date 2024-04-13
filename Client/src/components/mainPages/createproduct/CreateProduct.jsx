import axios from 'axios'
import { GlobalContext } from '../../../context/GlobalState'
import Loading from '../utils/Loading/Loading'
import { useContext, useState } from 'react'
import './CreateProduct.css'
import { useNavigate } from 'react-router-dom'


const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Description of product component create product',
    content: ' Content of product component create product',
    category: ''
}
function CreateProduct() {

    const [product, setProduct] = useState(initialState)
    const state = useContext(GlobalContext)
    console.log('Estado create product', state)
    const {categories} = state.categoriesApi
    console.log('categories create product', categories)
    const {isAdmin} = state.userApi
    const [ images, setImages ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const token = state.token[0]
    const navigate = useNavigate('/')

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({...product, [name]: value})
    }

    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not an Admin')
            const file = e.target.files[0]
            //console.log("file create product",file)
            if(!file) return alert("File not exist")
            if(file.size > 1024 * 1024) return alert("Size is too large")
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return alert("File format is incorrect")

            let formData = new FormData;
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    // Authorization: `Bearer ${state.user.token}`
                    Authorization: token
                }
            })
            setLoading(false)
            console.log("Res handle upload",res.data)
            setImages(res.data)
        } catch (error) {
            console.log("Error handle upload",error)
            alert(error.response.data.message)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert('You are not an Admin')
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: { Authorization: token}
            })
            setLoading(false)
            //setProduct({...product, images: ''})
            setImages(false)
        } catch (error) {
            console.log("Error handle destroy",error)
            alert(error.response.data.message)
        }
    }

    const handleSubmitCreateProduct = async (e) => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert('You are not an Admin')
            if(!images) return alert("No image Found")
            const res = await axios.post('/api/products', {...product, images}, {
                headers: { Authorization: token}
            })
            console.log("Res submit product create",res.data)
            //alert(res.data.message)
            setImages(false)
            setProduct(initialState)
            navigate('/')
        } catch (error) {
            console.log("Error submit create product",error)
            alert(error.response.data.message)
        }
    }
  return (
    <div className='create_product'>
        <div className='upload'>
            <input type="file" name='file' id='file_up' onChange={handleUpload}/>
            { loading 
            ? <div id="file_img"> <Loading/> </div>
            : <div id='file_img' style={styleUpload}>
                <img src={images ? images.url : ''} alt={product.title} />
                <span onClick={handleDestroy}> x </span>
            </div>}
        </div>

        <form action="" onSubmit={handleSubmitCreateProduct}>
            <div className='row'>
                <label htmlFor="product_id" > Product ID</label>
                <input type="text" name='product_id' id='product_id' required value={product.product_id}
                  onChange={handleChangeInput}/>
            </div>

            <div className='row'>
                <label htmlFor="title" > Title</label>
                <input type="text" name='title' id='title' required value={product.title}
                  onChange={handleChangeInput}/>
            </div>

            <div className='row'>
                <label htmlFor="price" > Price</label>
                <input type="number" name='price' id='price' required value={product.price}
                  onChange={handleChangeInput}/>
            </div>

            <div className='row'>
                <label htmlFor="description" > Description</label>
                <textarea rows="7" type="text" name='description' id='description' required value={product.description}
                 onChange={handleChangeInput} />
            </div>

            <div className='row'>
                <label htmlFor="content" > Content</label>
                <textarea rows="5" type="text" name='content' id='content' required value={product.content}
                  onChange={handleChangeInput}/>
            </div>

            <div className='row'>
                <label htmlFor="category" > Category</label>
                <select name="category" id="category" value={product.category}
                onChange={handleChangeInput} >
                    <option value="">Please select a category</option>
                    {
                        categories.map(category => (
                            <option key={category._id} value={category._id} > {category.name} </option>
                        ))
                    }
                </select>
            </div>

            <button type='submit'> Create Product </button>
        </form>
    </div>
  )
}

export default CreateProduct