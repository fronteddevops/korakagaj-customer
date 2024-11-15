export default {
  GET_DISCOUNT: (query) => `/discountCoupon/verify?${query ? query : ""}`,
};
