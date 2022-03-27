import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from './components/Spinner'
import ListingItem from './components/ListingItem'
import { FirebaseError } from 'firebase/app'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get referance
        const listingsRef = collection(db, 'listings')

        //Create a query
        const q = query(
          listingsRef,
          where('type','==',params.CategoryName),
          orderBy('timestamp','desc'),
          limit(10)
        )

        //Execute query
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  },[params.CategoryName])

    return (
      <div className='category'>
        <header>
          <p className="pageHeader">
            {params.CategoryName === 'rent'
              ? 'Places for rent'
              : 'Place for sale'}
          </p>
        </header>
        
        {loading ? (
          <Spinner /> 
        ) : listings && listings.length > 0 ?(
          <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                  <ListingItem 
                    listing={listing.data} 
                    id={listing.id} 
                    key={listing.id}
                  />
              ))}
            </ul>
          </main>
          </>
        ) : (
          <p>No listings for {params.CategoryName}</p>
        )}
      </div>
    );
  }
  
  export default Category;