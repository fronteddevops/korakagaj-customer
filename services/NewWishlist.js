import React from 'react'
import services from '.'
export default async function NewWishlist(product) {
   
    

    // if(productdata===false){


        try {
            const ProductId =product[0].id
         
            const userID = localStorage.getItem("userid");
           const data ={
            productId:ProductId,
            userId:userID
            }
            const productdata = localStorage.getItem("productstatus")
            const data1=productdata=true
            const data2=productdata=false
            console.log("kkkkkkkkkkkkkkkkkkk",data1)
            if(productdata==data2){
              
                const WishlistResponse = await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
                localStorage.setItem("productstatus",true)
            }else if(productdata==data1){
                const WishlistResponse = await services.Wishlist.DELETE_WISHLIST_BY_ID(ProductId);
                localStorage.setItem("productstatus",false)
            }
          
        
        } catch (error) {
            
            console.error("An error occurred:", error);
        }

   
       
    // }else if(productdata===true){
        // try {
        //     const ProductId =product[0].id
         
        //     const userID = localStorage.getItem("userid");
       
        //     const WishlistResponse = await services.Wishlist.DELETE_WISHLIST_BY_ID(ProductId);
        
        // } catch (error) {
            
        //     console.error("An error occurred:", error);
        // }
    // }
    
   
    // try {
    //     const ProductId =product[0].id
     
    //     const userID = localStorage.getItem("userid");
    //    const data ={
    //     productId:ProductId,
    //     userId:userID
    //     }
    //     const WishlistResponse = await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
    
    // } catch (error) {
        
    //     console.error("An error occurred:", error);
    // }
    


   

}

