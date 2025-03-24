import axios from "axios";
import { storeFile } from "@/utils/filesUpload";
import { getAuthHeader } from "@/utils/api";
import { COURSES_API_URL, INCLUDES_IMAGE_OWNER } from "@/utils/config";

/**
 * Fetch all courses with the specified populated fields.
 * 
 * @returns {Promise<Object>} API response containing courses data nested with key data.
 */
export const getCourses = async () => {
    try {
        const response = await axios.get(`${COURSES_API_URL + INCLUDES_IMAGE_OWNER}`, {
            headers: { ...getAuthHeader() },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error);
        throw error;
    }
};

/**
 * Fetch a single course by documentId with populated fields.
 * 
 * @param {string} id - The documentId of the course.
 * @returns {Promise<Object>} API response containing course data.
 */
export const getCourseById = async (id) => {
    try {
        const response = await axios.get(`${COURSES_API_URL}/${id + INCLUDES_IMAGE_OWNER}`, {
            headers: { ...getAuthHeader() },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching course ${id}:`, error.response?.data || error);
        throw error;
    }
};

/**
 * Create a new course with optional image upload.
 * 
 * @param {Object} courseData - The course data.
 * @returns {Promise<Object>} API response containing created course data.
 */
export const createCourse = async (courseData) => {
    let imageId;

    // Initially upload image if included on form
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
        const response = await axios.post(COURSES_API_URL, payload, {
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

/**
 * Update an existing course with optional image upload.
 * 
 * @param {string} id - The course documentId.
 * @param {Object} courseData - Updated course data.
 * @returns {Promise<Object>} API response containing updated course data.
 */
export const updateCourse = async (id, courseData) => {
    let imageId = courseData.image;

    // Check if image is a new file and upload if necessary
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
        const response = await axios.put(`${COURSES_API_URL}/${id}`, payload, {
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

/**
 * Delete a course by documentId.
 * 
 * @param {string} id - The course ID to delete.
 * @returns {Promise<void>} Resolves if the deletion is successful.
 */
export const deleteCourse = async (id) => {
    try {
        await axios.delete(`${COURSES_API_URL}/${id}`, {
            headers: { ...getAuthHeader() },
        });
    } catch (error) {
        console.error(`Error deleting course ${id}:`, error.response?.data || error);
        throw error;
    }
};