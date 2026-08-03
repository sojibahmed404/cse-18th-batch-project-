import api from './api';
import { ApiResponse, Assignment, AssignmentSubmission } from '../types';

export const assignmentService = {
  getAll: async (courseId?: string) => {
    const params = courseId ? { courseId } : {};
    const { data } = await api.get<ApiResponse<Assignment[]>>('/assignments', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Assignment>>(`/assignments/${id}`);
    return data;
  },

  submit: async (id: string, formData: FormData) => {
    const { data } = await api.post<ApiResponse<AssignmentSubmission>>(`/assignments/${id}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  publish: async (formData: FormData) => {
    const { data } = await api.post<ApiResponse<Assignment>>('/assignments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
