import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/authentication/SignIn.jsx';
import SignUp from './pages/authentication/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import CreateListing from './pages/products/CreateProduct.jsx';
import CreateBlog from './pages/blogs/CreateBlog.jsx';
import PrivateRoute from './componenets/PrivateRote.jsx';
import EditProduct from './pages/products/EditProduct.jsx';
import EditBlog from './pages/blogs/EditBlog.jsx';

export default function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<SignIn  />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute/> }>
        <Route path="/profile" element={<Profile />} />
          <Route path="/create-product" element={<CreateListing />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
   
  
  )
}


