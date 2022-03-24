import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<Explore />} Route />
               <Route path="/forgot-password" element={<ForgotPassword />} Route />
               <Route path="/offers" element={<Offers />} Route />
               <Route path="/profile" element={<SignIn />} Route />
               <Route path="/sign-in" element={<SignIn />} Route />
               <Route path="/sign-up" element={<SignUp />} Route />
            </Routes>
            <Navbar />
         </Router>
      </>
   );
}

export default App;
