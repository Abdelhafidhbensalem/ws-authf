
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import { getAllProducts } from './redux/actions/productsActions';
import { Routes, Route, Link } from "react-router-dom"
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { getCurrentUser } from './redux/actions/actionsUser';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllProducts())
  }, [])
const user=useSelector(state=>state.userReducer.currentUser)
  return (
    <Routes>
      <Route path="/" element={<div><NavBar />{user&&user.role=='admin'?<Link to="/addProduct" ><button>ADD PRODUCT</button></Link> :null}<ProductList /> </div>} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
