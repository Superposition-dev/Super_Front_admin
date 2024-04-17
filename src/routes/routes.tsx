import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login'
import MainPage from '../pages/Main'
import UserPage from '../pages/User'
import AuthorPage from '../pages/Author'
import UserDetailPage from '../pages/UserDetail'
import AuthorDetailPage from '../pages/AuthorDetail'
import AuthorPostPage from '../pages/AuthorPost'
import ExhibitionPage from '../pages/Exhibition'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/:id" element={<UserDetailPage />} />
      <Route path="/author" element={<AuthorPage />} />
      <Route path="/author/:id" element={<AuthorDetailPage />} />
      <Route path="/author/post" element={<AuthorPostPage />} />
      <Route path="/exhibition" element={<ExhibitionPage />} />
    </Routes>
  )
}

export default Routers
