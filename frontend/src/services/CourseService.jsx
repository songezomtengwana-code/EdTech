import axios from "axios";
import Cookies from "js-cookie";
import { storeFile } from "@/utils/filesUpload";

const API_URL = "http://localhost:1337/api/courses";

const getAuthHeader = () => {
    const token = Cookies.get("token");
    if (!token) {
        return {};
    }
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}?populate[image][fields][0]=url`, {
            headers: { ...getAuthHeader() },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error);
        throw error;
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}?populate[image][fields][0]=url`, {
            headers: { ...getAuthHeader() },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching course ${id}:`, error.response?.data || error);
        throw error;
    }
};

export const createCourse = async (courseData) => {
    let imageId;

    if (courseData.image) {
        imageId = await storeFile(courseData.image);
    }

    const payload = {
        data: {
            ...courseData,
            image: imageId,
        },
    };

    try {
        const response = await axios.post(API_URL, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeader(),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating course:", error.response?.data || error);
        throw error;
    }
};

export const updateCourse = async (id, courseData) => {
    let imageId = courseData.image;

    if (courseData.image instanceof File || courseData.image instanceof Blob) {
        imageId = await storeFile(courseData.image);
    }

    const payload = {
        data: {
            ...courseData,
            image: imageId,
        },
    };

    try {
        const response = await axios.put(`${API_URL}/${id}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeader(),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating course:", error.response?.data || error);
        throw error;
    }
};

export const deleteCourse = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { ...getAuthHeader() },
        });
    } catch (error) {
        console.error(`Error deleting course ${id}:`, error.response?.data || error);
        throw error;
    }
};

