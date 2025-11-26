import type { Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export type { Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject };
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const api = {
  getServices: async (): Promise<Service[]> => {
    const response = await fetch(`${API_BASE_URL}/services/`);
    if (!response.ok) throw new Error('Failed to fetch services');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  },

  getService: async (id: number): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  getProductCategories: async (): Promise<ProductCategory[]> => {
    const response = await fetch(`${API_BASE_URL}/product-categories/`);
    if (!response.ok) throw new Error('Failed to fetch product categories');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  },

  getProducts: async (params?: {
    category__slug?: string;
    is_featured?: boolean;
  }): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    if (params?.category__slug) queryParams.append('category__slug', params.category__slug);
    if (params?.is_featured !== undefined) queryParams.append('is_featured', String(params.is_featured));
    
    const url = `${API_BASE_URL}/products/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getCourses: async (params?: {
    level?: string;
    is_featured?: boolean;
  }): Promise<Course[]> => {
    const queryParams = new URLSearchParams();
    if (params?.level) queryParams.append('level', params.level);
    if (params?.is_featured !== undefined) queryParams.append('is_featured', String(params.is_featured));
    
    const url = `${API_BASE_URL}/courses/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch courses');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  },

  getCourse: async (id: number): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch course');
    return response.json();
  },

  getSiteSettings: async (): Promise<SiteSettings> => {
    const response = await fetch(`${API_BASE_URL}/site-settings/`);
    if (!response.ok) throw new Error('Failed to fetch site settings');
    return response.json();
  },

  get3DPrintingProjects: async (params?: {
    is_featured?: boolean;
  }): Promise<ThreeDPrintingProject[]> => {
    const queryParams = new URLSearchParams();
    if (params?.is_featured !== undefined) queryParams.append('is_featured', String(params.is_featured));
    
    const url = `${API_BASE_URL}/3d-printing/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch 3D printing projects');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  },

  get3DPrintingProject: async (id: number): Promise<ThreeDPrintingProject> => {
    const response = await fetch(`${API_BASE_URL}/3d-printing/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch 3D printing project');
    return response.json();
  },
};

