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
import ProtectedRoute from './ProtectedRoute' // import ProtectedRoute
import ExhibitionPostPage from '../pages/ExhibitionPost'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
            <UserDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/author"
        element={
          <ProtectedRoute>
            <AuthorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/author/:id"
        element={
          <ProtectedRoute>
            <AuthorDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/edit"
        element={
          <ProtectedRoute>
            <ProductEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete"
        element={
          <ProtectedRoute>
            <DeletePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/author/post"
        element={
          <ProtectedRoute>
            <AuthorPostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exhibition"
        element={
          <ProtectedRoute>
            <ExhibitionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exhibition/:id"
        element={
          <ProtectedRoute>
            <ExhibitionDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exhibition/post"
        element={
          <ProtectedRoute>
            <ExhibitionPostPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default Routers
