

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/authentication/SignIn.jsx';
import SignUp from './pages/authentication/SignUp.jsx';
import Profile from './pages/profile/Profile.jsx';
import CreateListing from './pages/products/CreateProduct.jsx';
import CreateBlog from './pages/blogs/CreateBlog.jsx';
import PrivateRoute from './componenets/PrivateRote.jsx';
import EditProduct from './pages/products/EditProduct.jsx';
import EditBlog from './pages/blogs/EditBlog.jsx';
import Header from './componenets/Header.jsx';
import Footer from './componenets/Footer.jsx';
import ShowBlogs from './pages/blogs/ShowBlogs.jsx';
import ShowProducts from './pages/products/ShowProducts.jsx';
import ReadBlog from './pages/blogs/ReadBlog.jsx';
import BuyProduct from './pages/products/BuyProduct.jsx';
import DetailProduct from './pages/products/DetailProduct.jsx';
import SearchResult from './pages/SearchResult.jsx';
import UserProfile from './pages/profile/UserProfile.jsx';


export default function App() {



  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<SignIn  />} />
        <Route path='/products' element={<ShowProducts />}/>
        <Route path='/products/detail/:id' element={<DetailProduct />}/>
        <Route path='/blogs' element={<ShowBlogs/>}/>
        <Route path='/blogs/read/:id' element={<ReadBlog />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search/:searchTerm' element={<SearchResult/> }/>
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route element={<PrivateRoute/> }>
        <Route path='/products/buy/:id' element={<BuyProduct />}/>
          <Route path="/create-product" element={<CreateListing />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
   
  
  )
}


