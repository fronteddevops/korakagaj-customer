export default {
  LOGIN: () => "/auth/login",
  FORGOT_PASSWORD: () => `/auth/forgot-password`,
  RESET_PASSWORD:(query)=>`/auth/reset-password?${query? query:""}`,
  REGISTER: () => `/auth/register`,
  UPDATE: () => `/update/`,
};
