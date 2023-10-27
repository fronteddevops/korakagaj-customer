import React from 'react';
import ReactStars from "react-rating-stars-component";
import Layout from '../components/layout/Layout';


// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const ReviewRetting = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    return  <Layout parent="Home" sub="Pages" subChild="Review Reting">
    <div className="container m-20 p-20">

    <div className="container m-20 p-20">
         <div className='contanier d-flex-inline-block justify-content-center align-item-center  p-20'>

            <div className=''>
             <h4>Rating star</h4>
            <div className='mt-10 p-10'>     <ReactStars
    count={5}
    onChange={ratingChanged}
    size={37}
    activeColor="#ffd700"
  /></div>


            </div>
            <div className='mt-10'>
                <h4>Add a written review</h4>

                <textarea
  className="form-control mt-10"
  placeholder='What did you like or dislike? What did you use this product for'
  id="exampleFormControlTextarea1"
  style={{ height: "200px" }} // Adjust the height as needed
  rows="5"
  cols="10"
></textarea>
                <div className='mt-10'> <button className='btn btn-primary float-end'>Submit Review</button></div>
        
        </div>
               
            </div>
          

        <div>
        </div>
      
    </div>
    </div>
    </Layout>
}

ReviewRetting.propTypes = propTypes;
ReviewRetting.defaultProps = defaultProps;
// #endregion

export default ReviewRetting;