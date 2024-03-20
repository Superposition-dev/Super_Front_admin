import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/page'
import MainPage from '../pages/Main'
import UserPage from '../pages/User'
import AuthorPage from '../pages/Author'

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/author" element={<AuthorPage />} />
    </Routes>
  )
}

export default Routers
