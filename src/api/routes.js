const base = process.env.BASE_URL || "http://10.0.2.2:8080/api";
const authUserBase = base + "/auth/user";
const authAdminBase = base + "/auth/admin";
export const loginUrl = authUserBase + "/login";
export const registerUrl = authUserBase + "/register";