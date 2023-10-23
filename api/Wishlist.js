  /*eslint-disable import/no-anonymous-default-export*/
  export default {
  
    CREATE_WISHLIST_BY_ID:()=> `/wishList/`,
    GET_WISHLIST_DATA: (userID) => `/wishList/?${userID}`,
    UPDATE_WISHLIST:(userID)=>`/wishList/${userID}`,
    };