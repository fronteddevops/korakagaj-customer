import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import services from '../services';
import nextConfig from '../next.config';
import { useTranslation } from 'react-i18next';

const propTypes = {};

const defaultProps = {};

const ReviewRetting = () => {
  const { t } = useTranslation("common");

  const Router = useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState();
  const [reviewRating, setReviewRating] = useState();
  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const ProductId = Router.query.orderId
const imageUrl = nextConfig.BASE_URL_UPLOADS
  const orderDetials = async (id) => {

    try {

      const response = await services.orderDetails.GET_ORDER_DETAILS_BY_ID(ProductId);
      setOrderDetailsData(response?.data?.data)
    } catch (error) {
      console.log(error);

    }
  }

  const ReviewByUser = async () => {

    setIsDisable(true)
 
    // try {
    //   const data={
    //  description:description,
    //  starRating:reviewRating
    //   }

    //   const response = await services.review.POST_REVIEW_BY_USER(data);

    // } catch (error) {
    //   console.log(error);

    // }
  }
  useEffect(() => {
    orderDetials()
  }, []);


  const ratingChanged = (newRating) => {
    if(newRating<1){
      setIsDisable(true)
      setReviewRating("")
    }else{
      setReviewRating(newRating)
      setIsDisable(false)
      console.log(newRating);
    }
   
  };
  return <Layout parent={t("Home")}  sub={<a  href="/myprofile?index=2"> <>{t("Pages")}</></a>} subChild={t("Review Reting")} >
    <div className='d-flex-inline-block justify-content-center align-item-center '>
      <div className="container m-20 p-20 w-50 ">

        <div className="container m-20 p-20">

          {orderDetailsData?.map((item, key) => {
            return (
              <div className="card">
                <div className="card-header" key={key}>
                  <h3 className='fw-bold'> {item?.Product?.brandName}</h3>
                 

                </div>
                <div className="card-body">

                  <div className='d-flex justify-content-start align-item-center '>

                    <div className=' '>  <img
                      className='rounded'
                      crossOrigin='anonymous'
                      src={imageUrl + item?.Product?.image[0]}
                      alt='Image'
                      height={100}
                      width={100}
                    />
                      {/* ))} */}
                    </div>

                    <div className='ms-3'>   <h5 className="card-title">{item?.Product?.productName}</h5>
                      <p className="card-text">{item?.Product?.additionalInformation}</p>
                      <span className='fw-bold'>{t("Total Quantity :")} {item?.totalQuantity}</span>&nbsp;  &nbsp; &nbsp;
                      <span className='fw-bold'>{t("Price :")} {item?.Product?.totalPrice}</span>  
                      </div>
                  </div>


                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
              </div>
            )
          })}

          <div className='contanier d-flex-inline-block justify-content-center align-item-center  p-20'>

            <div className=''>
              <h4>{t("Rating star")}</h4>
              <div className='mt-10 p-10'>    
               <ReactStars
                count={5}
                onChange={ratingChanged}
                size={37}
                activeColor="#ffd700"
              /></div>


            </div>
            <div className='mt-10'>
              <h4>{t("Add a written review")}</h4>

              <textarea
                className="form-control mt-10"
                value={description}
                onChange={(e)=>{
                  if(e.target.value==""){
                     setdescriptionError("Required")
                     setIsDisable(true)
                  }else{
                    setdescriptionError("")
                    setIsDisable(false)
                    setdescription(e.target.value)
                  }
                  setdescription(e.target.value)
                }}
                placeholder={t('What did you like or dislike? What did you use this product for')}
                id="exampleFormControlTextarea1"
                style={{ height: "100px" }} // Adjust the height as needed
                rows="5"
                cols="10"
              ></textarea>
              {descriptionError&&(
                <span className='text-danger'>{descriptionError}</span>
              )}
              <div className='mt-10'> <button className='btn btn-primary float-end'
              disabled={isDisable }
              onClick={ReviewByUser}>{t("Submit Review")}</button></div>

            </div>

          </div>


          <div>
          </div>

        </div>
      </div>
    </div>

  </Layout>
}

ReviewRetting.propTypes = propTypes;
ReviewRetting.defaultProps = defaultProps;
// #endregion

export default ReviewRetting;