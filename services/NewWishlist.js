import React from 'react'
import services from '.'
export default async function NewWishlist(product) {
    try {
        // Step 1: Fetch the cart data
        const userID = localStorage.getItem("userid");
        data ={
            productDetailId:product
        }
        console.log("4444444444444444",userID)
        const WishlistResponse = await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
    
        console.log("Cart Response:", WishlistResponse);


        // getWishlistData= await services.Wishlist.GET_WISHLIST_DATA(userID)

    } catch (error) {
        // Handle errors here
        console.error("An error occurred:", error);
    }

    console.log("prodcutsdgsdgsdgsdgsdgsd:", prodcut);
}

