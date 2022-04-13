import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
   const auth = getAuth();
   const [changeDetails, setChangeDetails] = useState(false);
   const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
   });

   const { name, email } = formData;

   const navigate = useNavigate();

   const onLogOut = () => {
      auth.signOut();
      navigate('/');
   };

   const onSubmit = async () => {
      try {
         if (auth.currentUser.displayName !== name) {
            // Update display name in firebase
            await updateProfile(auth.currentUser, {
               displayName: name,
            });

            // Update in firestore
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, {
               name,
            });

            toast.success('Profile updated successfully');
         }
      } catch (error) {
         toast.error('Could not update profile details');
      }
   };

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.id]: e.target.value,
      }));
   };

   return (
      <div className="profile">
         <header className="profileHeader">
            <p className="pageHeader">My Profile</p>
         </header>
         <div className="form-container">
            <div className="flex-end">
               <button type="button" className="logOut" onClick={onLogOut}>
                  Logout
               </button>
            </div>

            <main>
               <div className="profileDatailsHeader">
                  <p className="profileDetailsText">Personal Details</p>
                  <p
                     className="changePersonalDetails"
                     onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState);
                     }}
                  >
                     {changeDetails ? 'Done' : 'Update Details'}
                  </p>
               </div>

               <div className="profileCard">
                  <form>
                     <input type="text" name="" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />
                     <input type="text" name="" id="email" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange} />
                  </form>
               </div>
            </main>
         </div>
      </div>
   );
}

export default Profile;