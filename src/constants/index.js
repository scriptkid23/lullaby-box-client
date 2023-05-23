export const ENVIRONMENTS = {
  DEVELOPMENT: "https://34.142.244.8",
  PRODUCTION: "https://34.142.244.8",
};
export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;

export const CLIENT_ID = 'd35abc606e16552'