export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(data)=>`/product?priceFrom=${data.minPrice}&priceTo=${data.maxPrice}&colour=${data.color}&size=${data.size}`
  // GET_FILTER_PRODUCT:(data)=>`/product/?priceFrom=${min}&priceTo=${max}&subSubcategoryId=${subSubCategory}&subCategoryId=${subCategory}&categoryId=${categoryid}`
};
