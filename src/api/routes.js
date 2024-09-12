const base = process.env.EXPO_PUBLIC_BASE
    // || "http://10.0.2.2:8080";
const authUserBase = base + "/api/auth";
const authAdminBase = base + "/auth/admin";
export const loginUrl = authUserBase + "/login";
export const registerUrl = authUserBase + "/register";
const userBase = base + "/api/user/"
export const userProfileUrl = (id) => userBase + id;
export const userReviewsUrl = (id) => userBase + id + "/reviews";
export const userRatingsUrl = (id) => userBase + id + "/rating";