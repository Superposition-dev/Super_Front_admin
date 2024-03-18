import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/page'
import MainPage from '../pages/Main/page'
import UserPage from '../pages/User'
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  )
}

export default Routers
