export const ENVIRONMENTS = {
  DEVELOPMENT: "http://localhost:2006",
  PRODUCTION: "http://localhost:2006",
};
export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;

export const CLIENT_ID = 'd35abc606e16552'