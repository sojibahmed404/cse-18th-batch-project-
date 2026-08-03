import api from './api';
import { ApiResponse, Course, CourseMaterial } from '../types';

export const courseService = {
  getAll: async (semesterId?: string) => {
    const params = semesterId ? { semesterId } : {};
    const { data } = await api.get<ApiResponse<Course[]>>('/courses', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Course>>(`/courses/${id}`);
    return data;
  },

  getMaterials: async (courseId: string) => {
    const { data } = await api.get<ApiResponse<CourseMaterial[]>>(`/courses/${courseId}/materials`);
    return data;
  },

  uploadMaterial: async (courseId: string, formData: FormData) => {
    const { data } = await api.post<ApiResponse<CourseMaterial>>(`/courses/${courseId}/materials`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
