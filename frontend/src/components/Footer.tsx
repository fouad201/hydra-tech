import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Service, ProductCategory, SiteSettings } from '../types/api';

const Footer = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, categoriesData, settingsData] = await Promise.all([
          api.getServices(),
          api.getProductCategories(),
          api.getSiteSettings(),
        ]);
        setServices(servicesData.slice(0, 3)); // Show first 3 services
        setCategories(categoriesData.slice(0, 5)); // Show first 5 categories
        setSiteSettings(settingsData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {currentLanguage === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {t('common.nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {t('common.nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {t('common.nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {t('common.nav.courses')}
                </Link>
              </li>
              <li>
                <Link to="/3d-printing" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {t('common.nav.3dprinting')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {currentLanguage === 'ar' ? service.title_ar : service.title_en}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-primary-400 hover:text-primary-300 transition-colors font-semibold text-sm"
                >
                  {t('common.viewAllServices')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.products')}
            </h3>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {currentLanguage === 'ar' ? category.name_ar : category.name_en}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products"
                  className="text-primary-400 hover:text-primary-300 transition-colors font-semibold text-sm"
                >
                  {t('common.viewAllProducts')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm leading-relaxed">
                  {siteSettings && (currentLanguage === 'ar' ? siteSettings.address_ar : siteSettings.address_en)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${siteSettings?.email || 'info@hydratech-eg.com'}`}
                  className="hover:text-primary-400 transition-colors text-sm"
                >
                  {siteSettings?.email || 'info@hydratech-eg.com'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${siteSettings?.phone1 || '01227226502'}`}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {siteSettings?.phone1 || '01227226502'}
                  </a>
                  {siteSettings?.phone2 && (
                    <a
                      href={`tel:${siteSettings.phone2}`}
                      className="hover:text-primary-400 transition-colors text-sm"
                    >
                      {siteSettings.phone2}
                    </a>
                  )}
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-block mt-4 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-semibold text-sm"
              >
                {t('common.nav.contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>{siteSettings && (currentLanguage === 'ar' ? siteSettings.footer_text_ar : siteSettings.footer_text_en)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


