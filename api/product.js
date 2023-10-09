export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(selectedColors,categoryid,subSubCategory,subCategory,max,min)=>`/product/?&priceFrom=${min}&priceTo=${max}&colour=${selectedColors}&subSubcategoryId=${subSubCategory}&subCategoryId=${subCategory}&categoryId=${categoryid}`
};
