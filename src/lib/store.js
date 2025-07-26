import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      
      login: (userData, tokens) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        set({ 
          user: userData, 
          isAuthenticated: true,
          loading: false 
        });
      },
      
      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ 
          user: null, 
          isAuthenticated: false,
          loading: false 
        });
      },
      
      setLoading: (loading) => set({ loading }),
      
      updateUser: (userData) => set({ user: userData }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// UI store for global UI state
export const useUIStore = create((set) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  
  // Loading states
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({
      notifications: [...state.notifications, { 
        id: Date.now(), 
        ...notification 
      }]
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
  
  // Modal states
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Filters
  filters: {},
  setFilters: (filters) => set({ filters }),
  updateFilter: (key, value) => 
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  clearFilters: () => set({ filters: {} }),
}));

// Site settings store
export const useSiteStore = create((set) => ({
  settings: null,
  services: [],
  projects: [],
  testimonials: [],
  blogPosts: [],
  teamMembers: [],
  packages: [],
  faqs: [],
  
  setSettings: (settings) => set({ settings }),
  setServices: (services) => set({ services }),
  setProjects: (projects) => set({ projects }),
  setTestimonials: (testimonials) => set({ testimonials }),
  setBlogPosts: (blogPosts) => set({ blogPosts }),
  setTeamMembers: (teamMembers) => set({ teamMembers }),
  setPackages: (packages) => set({ packages }),
  setFAQs: (faqs) => set({ faqs }),
  
  // Add single items
  addService: (service) => 
    set((state) => ({ services: [...state.services, service] })),
  addProject: (project) => 
    set((state) => ({ projects: [...state.projects, project] })),
  addTestimonial: (testimonial) => 
    set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
  addBlogPost: (blogPost) => 
    set((state) => ({ blogPosts: [...state.blogPosts, blogPost] })),
  
  // Update items
  updateService: (id, updatedService) =>
    set((state) => ({
      services: state.services.map(s => s.id === id ? { ...s, ...updatedService } : s)
    })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map(p => p.id === id ? { ...p, ...updatedProject } : p)
    })),
  updateBlogPost: (id, updatedPost) =>
    set((state) => ({
      blogPosts: state.blogPosts.map(p => p.id === id ? { ...p, ...updatedPost } : p)
    })),
  
  // Remove items
  removeService: (id) =>
    set((state) => ({
      services: state.services.filter(s => s.id !== id)
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter(p => p.id !== id)
    })),
  removeBlogPost: (id) =>
    set((state) => ({
      blogPosts: state.blogPosts.filter(p => p.id !== id)
    })),
}));

// Admin store for admin-specific state
export const useAdminStore = create((set) => ({
  dashboardStats: null,
  leads: [],
  invoices: [],
  jobApplications: [],
  
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  setLeads: (leads) => set({ leads }),
  setInvoices: (invoices) => set({ invoices }),
  setJobApplications: (applications) => set({ jobApplications: applications }),
  
  // Lead management
  updateLead: (id, updatedLead) =>
    set((state) => ({
      leads: state.leads.map(l => l.id === id ? { ...l, ...updatedLead } : l)
    })),
  removeLead: (id) =>
    set((state) => ({
      leads: state.leads.filter(l => l.id !== id)
    })),
  
  // Invoice management
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
  updateInvoice: (id, updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map(i => i.id === id ? { ...i, ...updatedInvoice } : i)
    })),
  removeInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter(i => i.id !== id)
    })),
}));

