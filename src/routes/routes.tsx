import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/page';
import MainPage from '../pages/Main/page';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage/>} />
    </Routes>
  );
}

export default Routers;
