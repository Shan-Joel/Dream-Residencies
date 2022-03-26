import { BrowserRouter as Router, Routes, Route}
from 'react-router-dom'
import {ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'

import Explore from "./pages/Explore";
import Category from './pages/Category';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/category/:catagoryName' element={<Category/>} />
      </Routes>
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
