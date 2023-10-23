import React from 'react'
import services from '.'
export default async function NewWishlist(product) {
   
    try {
        const ProductId =product[0].id
     
        const userID = localStorage.getItem("userid");
       const data ={
        productId:ProductId,
        userId:userID
        }
        const WishlistResponse = await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
    


        // getWishlistData= await services.Wishlist.GET_WISHLIST_DATA(userID)

    } catch (error) {
        // Handle errors here
        console.error("An error occurred:", error);
    }

}

