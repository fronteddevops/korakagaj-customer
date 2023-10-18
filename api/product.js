export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(data,)=>`/product?&priceFrom=${data?.minPrice}&priceTo=${data?.maxPrice}&colour=${data?.color}&size=${data?.size}&subSubCategoryId=${data?.subSubCategory}&categoryId=${data?.categoryId}`,
  // GET_FILTER_PRODUCT:(data)=>`/product/?priceFrom=${min}&priceTo=${max}&subSubcategoryId=${subSubCategory}&subCategoryId=${subCategory}&categoryId=${categoryid}`
  PRODCUT_GET_LowToHigh:()=> `/product/getLowToHigh`,
  PRODCUT_GET_HighToLow:()=> `/product/getHighToLow`
};
