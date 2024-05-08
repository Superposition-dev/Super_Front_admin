import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login'
import MainPage from '../pages/Main'
import UserPage from '../pages/User'
import AuthorPage from '../pages/Author'
import UserDetailPage from '../pages/UserDetail'
import AuthorDetailPage from '../pages/AuthorDetail'
import ProductPage from '../pages/Product'
import DeletePage from '../pages/Delete'
import ProductDetailPage from '../pages/ProductDetail'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/:id" element={<UserDetailPage />} />
      <Route path="/author" element={<AuthorPage />} />
      <Route path="/author/:id" element={<AuthorDetailPage />} />
      <Route path='/product' element={<ProductPage />} />
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='/delete' element={<DeletePage />} />
    </Routes>
  )
}

export default Routers
