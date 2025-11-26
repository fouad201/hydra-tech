export interface Service {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category: number;
  category_name_en: string;
  category_name_ar: string;
  category_slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  duration: string;
  level: string;
  level_display: string;
  is_featured: boolean;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  company_name_en: string;
  company_name_ar: string;
  short_about_en: string;
  short_about_ar: string;
  address_en: string;
  address_ar: string;
  email: string;
  phone1: string;
  phone2: string;
  footer_text_en: string;
  footer_text_ar: string;
  updated_at: string;
}

export interface ThreeDPrintingProject {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  is_featured: boolean;
  material: string;
  print_time: string;
  order: number;
  created_at: string;
  updated_at: string;
}

