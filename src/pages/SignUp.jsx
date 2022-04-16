import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

function SignUp() {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
   });
   const { name, email, password } = formData;

   const navigate = useNavigate();

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.id]: e.target.value,
      }));
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const auth = getAuth();
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;

         updateProfile(auth.currentUser, {
            displayName: name,
         });

         const formDataCopy = { ...formData };
         delete formDataCopy.password;
         formDataCopy.timestamp = serverTimestamp();

         await setDoc(doc(db, 'users', user.uid), formDataCopy);

         navigate('/');
      } catch (error) {
         toast.error('Something Went Wrong! Please Try Again');
      }
   };

   return (
      <>
         <div className="pageContainer">
            <header>
               <p className="pageHeader">Enter Your Details to Register</p>
            </header>

            <div className="form-container">
               <form onSubmit={onSubmit}>
                  <input type="text" name="" id="name" className="nameInput" placeholder="Enter Your Name" value={name} onChange={onChange} />

                  <input type="email" name="" id="email" className="emailInput" placeholder="Enter Your Email" value={email} onChange={onChange} />

                  <div className="passwordInputDiv">
                     <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Enter a Password" id="password" value={password} onChange={onChange} />

                     <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
                  </div>

                  {/* <Link to="/forgot-password" className="forgotPasswordLink">
                     Forgot Password{' '}
                  </Link> */}

                  {/* <div className="signInBar">
                     <p className="signInText">Sign In</p>
                     <button className="signInButton">
                        <ArrowRightIcon fill="#ffffff" width="34px" heigh="34px" />
                     </button>
                  </div> */}

                  <button className="signInBtn-2">Sign Up</button>
               </form>

               {/* Google OAuth */}
               <OAuth />

               <Link to="/sign-in" className="registerLink">
                  Sign In Instead
               </Link>
            </div>
         </div>
      </>
   );
}

export default SignUp;
