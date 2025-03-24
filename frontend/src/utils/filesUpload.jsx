import axios from 'axios';
import Cookies from 'js-cookie';

export const storeFile = async (file) => {
    const token = Cookies.get("token");
    const FILE_UPLOAD_URL = process.env.FILE_UPLOAD_URL;

    if (file) {
        const formData = new FormData();
        formData.append("files", file);

        const uploadRes = await axios.post(FILE_UPLOAD_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return uploadRes.data[0].id;
    }

    return null
}