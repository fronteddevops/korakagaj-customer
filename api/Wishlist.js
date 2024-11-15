  /*eslint-disable import/no-anonymous-default-export*/
  export default {
  
    CREATE_WISHLIST_BY_ID:()=> `/wishList/me`,
    GET_WISHLIST_DATA: () => `/wishList/me`,
    UPDATE_WISHLIST:(userID)=>`/wishList/${userID}`,
    DELETE_WISHLIST_BY_ID:(id)=>`/wishList/me/${id}`,
    };
    // /wishList/me/