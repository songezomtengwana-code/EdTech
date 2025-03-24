export const API_URL = process.env.API_URL || "http://localhost:1337/api";
export const FILE_UPLOAD_URL = process.env.FILE_UPLOAD_URL || `${API_URL}/upload`;
export const COURSES_API_URL = `${API_URL}/courses`;
export const INCLUDES_IMAGE_OWNER = '?populate[image][fields][0]=url&populate[owner][fields][0]=username';