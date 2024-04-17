
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';
import Products from "./products/Products"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Cart from "./cart/Cart"
import NotFound from "./utils/NotFound"
import DetailProduct from './products/detailProduct/DetailProduct';
import Categories from './categories/Categories';
import CreateProduct from './createproduct/CreateProduct';
import Payment from './payment/Payment';

function Pages() {
  const state = useContext(GlobalContext)
  const { isLogged } = state.userApi
  return (
    
      
  <Routes>
    <Route path="/" exact element={<Products />} />
    <Route path="/login" element={ isLogged ? <NotFound /> : <Login />} />
    <Route path="/register" element={ isLogged ? <NotFound /> : <Register />} />
    <Route path="/category" element={ isLogged ? <Categories /> : <NotFound />} />
    <Route path='/create_product' element={isLogged ? <CreateProduct /> : <NotFound />} />
    <Route path='/edit_product/:id' element={isLogged ? <CreateProduct /> : <NotFound />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/detail/:id" element={<DetailProduct />} />
    <Route path="/payment" element={isLogged ? <Payment /> : <NotFound />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
      
    
  )
}

export default Pages