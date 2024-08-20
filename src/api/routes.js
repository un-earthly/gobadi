const base = process.env.BASE_URL || "http://10.0.2.2:8080/api";
const authUserBase = base + "/auth";
const authAdminBase = base + "/auth/admin";
export const loginUrl = authUserBase + "/login";
export const registerUrl = authUserBase + "/register";
const userBase = base + "/users/"
export const userProfileUrl = (id) => userBase + id;
export const userReviewsUrl = (id) => userBase + id + "/reviews";
export const userRatingsUrl = (id) => userBase + id + "/rating";