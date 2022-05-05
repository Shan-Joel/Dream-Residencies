import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc, deleteDoc, collection, query, where, orderBy, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { async } from '@firebase/util';

function Profile() {
   const auth = getAuth();
   const [loading, setLoading] = useState(true)
   const [listings, setListings] = useState(null)
   const [changeDetails, setChangeDetails] = useState(false);
   const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
   })

   const { name, email } = formData;

   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserListings = async () => {
        const listingsRef = collection(db, 'listings')
  
        const q = query(
          listingsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )
  
        const querySnap = await getDocs(q)
  
        let listings = []
  
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
  
        setListings(listings)
        setLoading(false)
      }
  
      fetchUserListings()
    }, [auth.currentUser.uid])


   const onLogOut = () => {
      auth.signOut();
      navigate('/');
   };

   const deleteUser = async (id) => {
      try {
         console.log(id);
         const delDoc = doc(db, 'users', auth.currentUser.uid);
         await deleteDoc(delDoc);
         navigate('/');
         toast.success('Profile deleted successfully');
      } catch (error) {
         toast.error('Something went wrong. Please try again');
      }
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

   const onDelete = async (listingId) => {
      if(window.confirm('Are your sure you want to delete?'))
      {
         await deleteDoc(doc(db, 'listings', listingId))
         const updatedListings = listings.filter((listing) =>
         listing.id !== listingId)

         setListings(updatedListings)
         toast.success('Successfully deleted listing')
      }
   }

   const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

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
               <button type="button" className="deleteBtn" onClick={deleteUser}>
                  Delete Profile
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

               <Link to="/create-listing" className="createListing">
                  <img src={homeIcon} alt="home" />
                  <p>Sell or Rent your home</p>
                  <img src={arrowRight} alt="arrow right" />
               </Link>
               <Link to="/add-faq" className="createListing">
                  <img src={homeIcon} alt="home" />
                  <p>Add FAQ</p>
                  <img src={arrowRight} alt="arrow right" />
               </Link>
               <Link to="/contact-us" className="createListing">
                  <img src={homeIcon} alt="home" />
                  <p>Contact Us</p>
                  <img src={arrowRight} alt="arrow right" />
               </Link>
               <Link to="/view-faq" className="createListing">
                  <img src={homeIcon} alt="home" />
                  <p>View FAQ</p>
                  <img src={arrowRight} alt="arrow right" />
               </Link>

               {!loading && listings?.length > 0 && (
               <>
                  <p className='listingText'>Your Listings</p>
                  <ul className='listingsList'>
                  {listings.map((listing) => (
                     <ListingItem
                        key={listing.id}
                        listing={listing.data}
                        id={listing.id}
                        onDelete={() => onDelete(listing.id)}
                        onEdit={() => onEdit(listing.id)}
                     />
                      ))}
                  </ul>
               </>
            )}
            </main>
         </div>
      </div>
   )
}

export default Profile;
