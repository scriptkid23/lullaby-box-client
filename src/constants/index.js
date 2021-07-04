export const ENVIRONMENTS = {
  DEVELOPMENT: "http://localhost:8081",
  PRODUCTION: "http://metaphor-service.herokuapp.com",
};
export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ENVIRONMENTS.DEVELOPMENT
    : ENVIRONMENTS.PRODUCTION;

export const CLIENT_ID = 'd35abc606e16552'