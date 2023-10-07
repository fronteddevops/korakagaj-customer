export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_BY_ID:(id)=> `/product/${id}`,
  GET_FILTER_PRODUCT:(categoryid)=>`/product/?categoryId=${categoryid}`
};
