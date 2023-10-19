import React from 'react'
import services from '.'
export default async function newcard(prodcut) {
    try {
        // Step 1: Fetch the cart data
        const userID = localStorage.getItem("userid");
        const cartResponse = await services.cart.GET_CART(userID);

        console.log("Cart Response:", cartResponse);

        if (cartResponse) {
            console.log("Cart data is available");

            // Step 2: Join the cart data with the provided 'prodcut' array
            const cartData = cartResponse?.data?.data[0].cartDetail?.cartDetail1;
        
            const cartDetail1 = cartData.concat(prodcut)
            const data={
                cartDetail:{cartDetail1}
              }

            console.log("Joined Array:", data);

            // Step 3: Update the cart with the joined data
            const updateResponse = await services.cart.UPDATE_CART(data);

            console.log("Update Response:", updateResponse.data);
        }
    } catch (error) {
        // Handle errors here
        console.error("An error occurred:", error);
    }

    console.log("prodcut:", prodcut);
}

