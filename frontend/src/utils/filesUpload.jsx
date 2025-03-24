import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * Uploads a file to the server and returns the file ID.
 *
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<string|null>} - The uploaded file ID or null if no file is provided.
 */
export const storeFile = async (file) => {
    const token = Cookies.get("token");
    const FILE_UPLOAD_URL = process.env.FILE_UPLOAD_URL || "http://localhost:1337/api/upload";

    if (file) {
        const formData = new FormData();
        formData.append("files", file);

        try {
            const uploadRes = await axios.post(FILE_UPLOAD_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return uploadRes.data[0].id;
        } catch (error) {
            console.error("Error uploading file:", error.response?.data || error);
            throw error;
        }
    }

    return null;
};