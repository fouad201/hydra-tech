import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLanguage } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import { api } from '../services/api';
import type { Service, ProductCategory, Product, ThreeDPrintingProject } from '../types/api';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});
  const [projects, setProjects] = useState<ThreeDPrintingProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, categoriesData, productsData, projectsData] = await Promise.all([
          api.getServices(),
          api.getProductCategories(),
          api.getProducts(),
          api.get3DPrintingProjects(),
        ]);
        
        setServices(servicesData);
        setCategories(categoriesData);
        setProjects(projectsData.slice(0, 5));

        const grouped: { [key: string]: Product[] } = {};
        categoriesData.forEach(cat => {
          grouped[cat.slug] = productsData
            .filter(p => p.category_slug === cat.slug)
            .slice(0, 5);
        });
        setProductsByCategory(grouped);
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { key: 'home', path: '/', hasDropdown: false },
    { key: 'products', path: '/products', hasDropdown: true },
    { key: 'services', path: '/services', hasDropdown: true },
    { key: 'courses', path: '/courses', hasDropdown: false },
    { key: '3dprinting', path: '/3d-printing', hasDropdown: true },
    { key: 'contact', path: '/contact', hasDropdown: false },
  ];

  const handleMouseEnter = (key: string) => {
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/logo.png"
              alt="Hydratech Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div ref={dropdownRef} className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <div 
                key={item.key} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.key)}
                onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
              >
                {item.hasDropdown ? (
                  <button
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-1 group"
                  >
                    {t(`common.nav.${item.key}`)}
                    <FiChevronDown className={`transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`} />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium relative group"
                  >
                    {t(`common.nav.${item.key}`)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label={currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              title={currentLanguage === 'en' ? 'العربية' : 'English'}
            >
              <MdLanguage className="text-3xl" />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  >
                    {t(`common.nav.${item.key}`)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mega Menu Dropdowns */}
      <AnimatePresence>
        {openDropdown === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setOpenDropdown('products')}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 right-0 bg-white shadow-xl border-t"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                  <div key={category.id}>
                    <Link
                      to={`/products?category=${category.slug}`}
                      onClick={() => setOpenDropdown(null)}
                      className="text-lg font-bold text-gray-900 hover:text-primary-600 mb-3 block"
                    >
                      {currentLanguage === 'ar' ? category.name_ar : category.name_en}
                    </Link>
                    <ul className="space-y-2">
                      {productsByCategory[category.slug]?.map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/products/${product.id}`}
                            onClick={() => setOpenDropdown(null)}
                            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            {currentLanguage === 'ar' ? product.name_ar : product.name_en}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {productsByCategory[category.slug]?.length > 0 && (
                      <Link
                        to={`/products?category=${category.slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
                      >
                        {currentLanguage === 'ar' ? 'عرض الكل →' : 'View All →'}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {openDropdown === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 right-0 bg-white shadow-xl border-t"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                  <div key={service.id}>
                    <Link
                      to={`/services/${service.id}`}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 group"
                    >
                      <div className="text-3xl">{service.icon}</div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-600 mb-1">
                          {currentLanguage === 'ar' ? service.title_ar : service.title_en}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {currentLanguage === 'ar' ? service.description_ar : service.description_en}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/services"
                  onClick={() => setOpenDropdown(null)}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {currentLanguage === 'ar' ? 'عرض جميع الخدمات →' : 'View All Services →'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {openDropdown === '3dprinting' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setOpenDropdown('3dprinting')}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 right-0 bg-white shadow-xl border-t"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/3d-printing/${project.id}`}
                    onClick={() => setOpenDropdown(null)}
                    className="group"
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-primary-100 rounded-lg overflow-hidden mb-2">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={currentLanguage === 'ar' ? project.title_ar : project.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-primary-500">
                          🖨️
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                      {currentLanguage === 'ar' ? project.title_ar : project.title_en}
                    </h3>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/3d-printing"
                  onClick={() => setOpenDropdown(null)}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {currentLanguage === 'ar' ? 'عرض جميع المشاريع →' : 'View All Projects →'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
