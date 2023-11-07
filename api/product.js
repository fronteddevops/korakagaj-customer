export default {
  GET_PRODUCT: () => `/product`,
  GET_PRODUCT_AUTH: (query,) => `/product/me?${query}`,
  GET_PRODUCT_BY_ID: (id) => `/product/${id}`,
  UP_COMING_PRODUCT: () => `/product/isUpcoming`,
  GET_FILTER_PRODUCT: (query) => `/product?${query}`
};
