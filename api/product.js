export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(categoryid,subSubCategory,subCategory,max,min)=>`/product/?priceFrom=${min}&priceTo=${max}&subSubcategoryId=${subSubCategory}&subCategoryId=${subCategory}&categoryId=${categoryid}`
};
