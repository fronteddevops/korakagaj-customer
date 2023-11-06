export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_AUTH: () => `/product/isWishlisted/`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(data,)=>`/product?order=${data.order}&productType=${data.productType}&priceFrom=${data?.minPrice}&priceTo=${data?.maxPrice}&colour=${data?.color}&size=${data?.size}&subSubCategoryId=${data?.subSubCategory}&categoryId=${data?.categoryId}`,
  PRODCUT_GET_HighToLow:()=> `/product/getHighToLow`,
UP_COMING_PRODUCT:()=>`/product/isUpcoming`
};
