import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Mfaq from './pages/Mfaq';
import Mupdate from './pages/Mupdate';
import Mcontact from './pages/Mcontact';
import Mview from './pages/Mview';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   return (
      <>
         <Router>
            <Routes>
               <ToastContainer position="top-center" />
               <Route path="/" element={<Explore />} Route />
               <Route path="/forgot-password" element={<ForgotPassword />} Route />
               <Route path="/offers" element={<Offers />} Route />
               <Route path="/profile" element={<SignIn />} Route />
               <Route path="/sign-in" element={<SignIn />} Route />
               <Route path="/sign-up" element={<SignUp />} Route />

               <Route path="/add-faq" element={<Mfaq />} Route />
               <Route path="/update-faq" element={<Mupdate />} Route />
               <Route path="/contact-us" element={<Mcontact />} Route />
               <Route path="/view-faq" element={<Mview />} Route />

            </Routes>
            <Navbar />
         </Router>
      </>
   );
}

export default App;
