import axios from 'axios';

// API base URL - adjust for production
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Authentication
  login: (credentials) => api.post('/auth/login/', credentials),
  refreshToken: (refresh) => api.post('/auth/refresh/', { refresh }),

  // Public endpoints
  getServices: () => api.get('/services/'),
  getService: (slug) => api.get(`/services/${slug}/`),
  
  getProjects: (params = {}) => api.get('/projects/', { params }),
  getProject: (slug) => api.get(`/projects/${slug}/`),
  
  getTestimonials: (params = {}) => api.get('/testimonials/', { params }),
  
  getBlogPosts: (params = {}) => api.get('/blog-posts/', { params }),
  getBlogPost: (slug) => api.get(`/blog-posts/${slug}/`),
  getBlogCategories: () => api.get('/blog-categories/'),
  getBlogTags: () => api.get('/blog-tags/'),
  
  getPackages: () => api.get('/packages/'),
  
  getTeamMembers: () => api.get('/team-members/'),
  
  getJobs: (params = {}) => api.get('/jobs/', { params }),
  getJob: (slug) => api.get(`/jobs/${slug}/`),
  
  getFAQs: (params = {}) => api.get('/faqs/', { params }),
  
  getSiteSettings: () => api.get('/settings/'),
  
  // Contact form
  submitContactForm: (data) => api.post('/contact/', data),
  
  // Job application
  submitJobApplication: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/apply/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Admin endpoints (require authentication)
  getDashboardStats: () => api.get('/dashboard/stats/'),
  
  // CRUD operations for admin
  createService: (data) => api.post('/services/', data),
  updateService: (id, data) => api.patch(`/services/${id}/`, data),
  deleteService: (id) => api.delete(`/services/${id}/`),
  
  createProject: (data) => api.post('/projects/', data),
  updateProject: (id, data) => api.patch(`/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/projects/${id}/`),
  
  getLeads: (params = {}) => api.get('/leads/', { params }),
  updateLead: (id, data) => api.patch(`/leads/${id}/`, data),
  deleteLead: (id) => api.delete(`/leads/${id}/`),
  
  createBlogPost: (data) => api.post('/blog-posts/', data),
  updateBlogPost: (id, data) => api.patch(`/blog-posts/${id}/`, data),
  deleteBlogPost: (id) => api.delete(`/blog-posts/${id}/`),
  
  getInvoices: (params = {}) => api.get('/invoices/', { params }),
  createInvoice: (data) => api.post('/invoices/', data),
  updateInvoice: (id, data) => api.patch(`/invoices/${id}/`, data),
  deleteInvoice: (id) => api.delete(`/invoices/${id}/`),
};

export default api;

