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
import AuthorPostPage from '../pages/AuthorPost'
import ExhibitionPage from '../pages/Exhibition'
import ExhibitionDetailPage from '../pages/ExhibitionDetail'
import ProductEdit from '../pages/ProductEdit'
import ExhibitionPostPage from '../pages/ExhibitionPost'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/:id" element={<UserDetailPage />} />
      <Route path="/author" element={<AuthorPage />} />
      <Route path="/author/:id" element={<AuthorDetailPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/product/edit" element={<ProductEdit />} />
      <Route path="/delete" element={<DeletePage />} />
      <Route path="/author/post" element={<AuthorPostPage />} />
      <Route path="/exhibition" element={<ExhibitionPage />} />
      <Route path="/exhibition/post" element={<ExhibitionPostPage />} />
      <Route path="/exhibition/edit" element={<ExhibitionPostPage />} />
      <Route path="/exhibition/:id" element={<ExhibitionDetailPage />} />
    </Routes>
  )
}

export default Routers
