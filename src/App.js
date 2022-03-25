import { BrowserRouter as Router, Routes, Route}
from 'react-router-dom'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Explore from "./pages/Explore";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
      </Routes>
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
