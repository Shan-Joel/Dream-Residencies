import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import SliderOneImg from '../assets/jpg/SliderOneImg.jpg';
import SliderTwoImg from '../assets/jpg/SliderTwoImg.jpg';
import SliderThreeImg from '../assets/jpg/SliderThreeImg.jpg';

function Explore() {
   return (
      <div className="explore">
         <header>
            <p className="pageHeader">Explore</p>
         </header>

         <main>
            {/* Slider*/}

            <p className="exploreCategoryHeading">Categories</p>
            <div className="exploreCategories">
               <Link to="/category/rent">
                  <img src={SliderTwoImg} alt="rent" className="exploreCategoryImg" />
                  <p className="exploreCategoryName">Places For Rent</p>
               </Link>

               <Link to="/category/sale">
                  <img src={SliderThreeImg} alt="sell" className="exploreCategoryImg" />
                  <p className="exploreCategoryName">Places For Sale</p>
               </Link>
            </div>
         </main>
      </div>
   );
}

export default Explore;
