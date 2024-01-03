export default {
  GET_CMS: () => `/setting`,
  Contact: (data) => `/contact${data ? data : ""}`,
};
