import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function CreateListing() {
   const [geolocationEnabled, setGeolocationEnabled] = useState(true);
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      type: 'rent',
      name: '',
      bedrooms: 1,
      bathrooms: 1,
      parking: false,
      furnished: false,
      address: '',
      offer: false,
      regularPrice: 0,
      discountPrice: 0,
      images: {},
      latitude: 0,
      longitude: 0,
   });

   const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData;

   const auth = getAuth();
   const navigate = useNavigate();
   const isMounted = useRef(true);

   useEffect(() => {
      if (isMounted) {
         onAuthStateChanged(auth, (user) => {
            if (user) {
               setFormData({ ...formData, userRef: user.uid });
            } else {
               navigate('/sign-in');
            }
         });
      }

      return () => {
         isMounted.current = false;
      };
   }, [isMounted]);

   const onSubmit = async (e) => {
      e.preventDefault();
      // console.log(formData);
      setLoading(true);

      if (discountedPrice >= regularPrice) {
         setLoading(false);
         toast.error('Discounted price needs to be less than reguler price');
         return;
      }

      if (images.length > 6) {
         setLoading(false);
         toast.error('Max 6 images');
         return;
      }

      let geolocation = {};
      let location;

      if (geolocationEnabled) {
         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json? 
            address=${address}&key=$
            {process.env.REACT_APP_GEOCODE_API_KEY}`);

         const data = await response.json();

         geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
         geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

         location = data.status === 'ZERO_RESULTS' ? undefined : data.results[0]?.formatted_address;

         if (location === undefined || location.includes('undefined')) {
            setLoading(false);
            toast.error('Please enter a correct address');
            return;
         }
      } else {
         geolocation.lat = latitude;
         geolocation.lng = longitude;
         location = address;
      }

      setLoading(false);
   };

   const onMutate = (e) => {
      let boolean = null;

      if (e.target.value === 'true') {
         boolean = true;
      }
      if (e.target.value === 'false') {
         boolean = false;
      }

      //File
      if (e.target.files) {
         setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
         }));
      }

      //Text/Booleans/Numbers
      if (!e.target.files) {
         setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
         }));
      }
   };

   if (loading) {
      return <Spinner />;
   }

   return (
      <div className="profile">
         <header>
            <p className="pageHeader">Create a Listing in Dream Residencies</p>
         </header>

         <main>
            <div className="form-container">
               <form onSubmit={onSubmit}>
                  <label className="formLabel">Sell / Rent</label>
                  <div className="formButtons">
                     <button type="button" className={type === 'sale' ? 'formButtonActive' : 'formButton'} id="type" value="sale" onClick={onMutate}>
                        Sell
                     </button>
                     <button type="button" className={type === 'rent' ? 'formButtonActive' : 'formButton'} id="type" value="rent" onClick={onMutate}>
                        Rent
                     </button>
                  </div>

                  <div className="createListingCont">
                     <label className="formLabel">Name</label>
                     <input className="formInputName" type="text" id="name" value={name} onChange={onMutate} maxLength="32" minLength="10" required />
                  </div>
                  <div className="formRooms justify-center">
                     <div className="max-w-500">
                        <label className="formLabel">Bedrooms</label>
                        <input className="formInputSmall" type="number" id="bedrooms" value={bedrooms} onChange={onMutate} maxLength="1" minLength="50" required />
                     </div>
                     <div className="max-w-500">
                        <label className="formLabel">Bathrooms</label>
                        <input className="formInputSmall" type="number" id="bathrooms" value={bathrooms} onChange={onMutate} maxLength="1" minLength="50" required />
                     </div>
                  </div>

                  <label className="formLabel">Parking Spot</label>
                  <div className="formButtons">
                     <button className={parking ? 'formButtonActive' : 'formButton'} type="button" id="parking" value={true} onClick={onMutate} min="1" max="50">
                        Yes
                     </button>
                     <button className={!parking && parking !== null ? 'formButtonActive' : 'formButton'} type="button" id="parking" value={false} onClick={onMutate}>
                        No
                     </button>
                  </div>

                  <label className="formLabel">Furnished</label>
                  <div className="formButtons">
                     <button className={furnished ? 'formButtonActive' : 'formButton'} type="button" id="furnished" value={true} onClick={onMutate}>
                        Yes
                     </button>
                     <button className={!furnished && furnished !== null ? 'formButtonActive' : 'formButton'} type="button" id="furnished" value={false} onClick={onMutate}>
                        No
                     </button>
                  </div>

                  <label className="formLabel">Address</label>
                  <textarea className="formInputAddress" type="text" id="address" value={address} onChange={onMutate} required />

                  {!geolocationEnabled && (
                     <div className="formLatLng flex">
                        <div>
                           <label className="formLabel">Latitude</label>
                           <input className="formInputSmall" type="number" id="latitude" value={latitude} onChange={onMutate} required />
                        </div>
                        <div>
                           <label className="formLabel">Longitude</label>
                           <input className="formInputSmall" type="number" id="longitude" value={longitude} onChange={onMutate} required />
                        </div>
                     </div>
                  )}

                  <label className="formLabel">Offer</label>
                  <div className="formButtons">
                     <button className={offer ? 'formButtonActive' : 'formButton'} type="button" id="offer" value={true} onClick={onMutate}>
                        Yes
                     </button>
                     <button className={!offer && offer !== null ? 'formButtonActive' : 'formButton'} type="button" id="offer" value={false} onClick={onMutate}>
                        No
                     </button>
                  </div>

                  <label className="formLabel">Regular Price</label>
                  <div className="formPriceDiv">
                     <input className="formInputSmall w-89" type="number" id="regularPrice" value={regularPrice} onChange={onMutate} min="50" max="10000000000" required />
                     {type === 'rent' && <p className="formPriceText">$ / Month</p>}
                  </div>

                  {offer && (
                     <>
                        <label className="formLabel">Discounted Price</label>
                        <input style={{ width: '100%' }} className="formInputSmall" type="number" id="discountedPrice" value={discountedPrice} onChange={onMutate} min="50" max="10000000000" required={offer} />
                     </>
                  )}

                  <label className="formLabel">Images</label>
                  <p className="imagesInfo">The first image will be the cover (max 6).</p>
                  <input className="formInputFile" type="file" id="images" onChange={onMutate} max="6" accept=".jpg,.png,.jpeg" multiple required />
                  <button type="submit" className="primaryButton createListingButton">
                     Create Listing
                  </button>
               </form>
            </div>
         </main>
      </div>
   );
}

export default CreateListing;
