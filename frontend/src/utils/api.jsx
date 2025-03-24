import Cookies from "js-cookie";

/**
 * Returns the authorization headers if a token exists.
 * 
 * @returns {Object} Headers object containing the Authorization token.
 */
export const getAuthHeader = () => {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};
