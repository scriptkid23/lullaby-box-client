export const ENVIRONMENTS = {
  DEVELOPMENT: "https://api.tarend.app",
  PRODUCTION: "https://api.tarend.app",
};
export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;

export const CLIENT_ID = 'd35abc606e16552'