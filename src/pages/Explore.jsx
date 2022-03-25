import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
    return (
      <div className='explore'>
        <header>
            <p className="pageHeader">Explore</p>
        </header>

        <main>
            {/* Slider*/}

            <p className="exploreCategoryHeading"></p>
            <div className="exploreCategory">
                <Link to='/category/rent'>
                    <img src={rentCategoryImage}
                    alt="rent"
                    className='exploreCategoryImg' />
                    <p className="exploreCategoryName">Places For Rent</p>
                </Link>

                <Link to='/category/sell'>
                    <img src={sellCategoryImage}
                    alt="sell"
                    className='exploreCategoryImg' />
                    <p className="exploreCategoryName">Places For Sale</p>
                </Link>
            </div>
        </main>
      </div>
    );
  }
  
  export default Explore;