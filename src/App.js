import { BrowserRouter as Router, Routes, Route}
from 'react-router-dom'
import {ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'

import Explore from "./pages/Explore";
import Category from './pages/Category';
import Offers from './pages/Offers';
import CreateListing from './pages/CreateListing';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/category/:catagoryName' element={<Category/>} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/create-listing' element={<CreateListing />} />
      </Routes>
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
