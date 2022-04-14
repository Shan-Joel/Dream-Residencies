import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { async } from '@firebase/util';

function ForgotPassword() {
   const [email, setEmail] = useState('');

   const onChange = (e) => setEmail(e.target.value);

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const auth = getAuth();
         await sendPasswordResetEmail(auth, email);
         toast.success('Email was sent successfully');
      } catch (error) {
         toast.error('Could not send reset email');
      }
   };

   return (
      <div className="pageContainer">
         <header>
            <p className="pageHeader">Forgot Password</p>
         </header>
         <main>
            <div className="form-container">
               <form onSubmit={onSubmit}>
                  <input type="email" name="email" id="email" value={email} className="emailInput" onChange={onChange} placeholder="Enter your email" />
                  <Link className="forgotPasswordLink" to="/sign-in">
                     Sign In
                  </Link>
                  <div className="signInBar">
                     {/* <div className="signInText">Send Reset Link</div>
                     <button className="signInButton">
                        <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                     </button> */}
                     <button className="forgotBtn-2">Send Reset Link</button>
                  </div>
               </form>
            </div>
         </main>
      </div>
   );
}

export default ForgotPassword;
