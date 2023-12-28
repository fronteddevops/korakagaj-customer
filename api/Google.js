export default {
  GoogleAuth: (data) => `/auth/loginWithGoogle${data ? data : ""}`,
};
