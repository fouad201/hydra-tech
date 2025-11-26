import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Service, Product, Course } from '../types/api';
import { FaUserTie, FaStar, FaHeadset, FaRocket } from 'react-icons/fa';

const Home = () => {
  const { t, i18n } = useTranslation();
  const { isRTL, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, productsData, coursesData] = await Promise.all([
          api.getServices(),
          api.getProducts({ is_featured: true }),
          api.getCourses({ is_featured: true }),
        ]);
        setServices(servicesData);
        setProducts(productsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/automation_new.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/3141210-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>

        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        
        {/* Animated Overlay Elements */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-blue-500/10"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Main Title with Ambient Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight relative">
                <span className="relative inline-block">
                  <span className="absolute inset-0 blur-2xl opacity-50" style={{ color: '#0047AB' }}>
                    {t('home.hero.title')}
                  </span>
                  <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                    {t('home.hero.title')}
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with Better Contrast */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-6 font-semibold text-white drop-shadow-lg"
            >
              {t('home.hero.subtitle')}
            </motion.p>

            {/* Description with Background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 py-4 px-6 rounded-2xl border border-white/10">
                {t('home.hero.description')}
              </p>
            </motion.div>

            {/* CTA Buttons with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={() => navigate('/services')}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium tracking-wide border-none cursor-pointer overflow-hidden transition-all duration-300 px-5 py-2 pl-5 pr-14 text-lg rounded-2xl h-14 shadow-[inset_0_0_1.6em_-0.6em_rgba(0,71,171,0.6)]"
              >
                <span className="relative z-10">{t('common.viewSolutions')}</span>
                <motion.div
                  className="absolute right-1 bg-white rounded-xl h-11 w-11 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]"
                >
                  <motion.svg 
                    className="w-5 h-5 text-primary-600 transition-transform group-hover:translate-x-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.div>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/contact')}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium tracking-wide border-none cursor-pointer overflow-hidden transition-all duration-300 px-5 py-2 pl-5 pr-14 text-lg rounded-2xl h-14 shadow-[inset_0_0_1.6em_-0.6em_rgba(139,92,246,0.6)]"
              >
                <span className="relative z-10">{t('common.contactUs')}</span>
                <motion.div
                  className="absolute right-1 bg-white rounded-xl h-11 w-11 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]"
                >
                  <motion.svg 
                    className="w-5 h-5 text-purple-600 transition-transform group-hover:translate-x-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </motion.svg>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator with Enhanced Style */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm font-medium tracking-wider">SCROLL</span>
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t('home.solutions.title')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {loading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                  <div className="w-16 h-16 rounded-2xl bg-gray-200 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200"
                  style={{ opacity: 1 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-3xl mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>
                    {currentLanguage === 'ar' ? service.title_ar : service.title_en}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4B5563' }}>
                    {currentLanguage === 'ar' ? service.description_ar : service.description_en}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('home.about.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              {t('home.about.cta')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {t('home.courses.title')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {loading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
                  <div className="w-16 h-16 bg-white/20 rounded mb-4"></div>
                  <div className="h-8 bg-white/20 rounded mb-3"></div>
                  <div className="h-16 bg-white/20 rounded"></div>
                </div>
              ))
            ) : (
              courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="text-5xl mb-4">{course.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">
                    {currentLanguage === 'ar' ? course.title_ar : course.title_en}
                  </h3>
                  <p className="text-gray-300">
                    {currentLanguage === 'ar' ? course.description_ar : course.description_en}
                  </p>
                  {course.duration && (
                    <p className="text-gray-400 text-sm mt-3">
                      {course.duration}
                    </p>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {t('home.products.title')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {loading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="relative bg-gradient-to-br from-primary-900 to-primary-800 rounded-[28px] overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{ 
                    opacity: 1,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Background Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-primary-500/20 blur-[80px] rounded-full"></div>
                  
                  {/* Wavy Lines */}
                  <svg className="absolute top-6 left-6 w-10 h-6 text-primary-500 z-10" viewBox="0 0 40 20" fill="none">
                    <path d="M0 10 Q 10 0, 20 10 T 40 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  </svg>
                  
                  {/* Circles */}
                  <div className="absolute top-8 right-8 w-6 h-6 rounded-full border-2 border-gray-600/50 z-10"></div>
                  <div className="absolute top-4 right-16 w-8 h-8 rounded-full border-2 border-gray-600/40 z-10"></div>
                  <div className="absolute bottom-20 left-6 w-7 h-7 rounded-full border-2 border-gray-600/40 z-10"></div>

                  {/* Featured Badge */}
                  {product.is_featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-400 to-cyan-400 text-white px-3 py-1 rounded-lg text-xs font-bold z-20 shadow-lg">
                      {currentLanguage === 'ar' ? 'مميز' : 'Featured'}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="h-52 flex items-center justify-center relative z-10 bg-white p-6">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={currentLanguage === 'ar' ? product.name_ar : product.name_en}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-7xl text-gray-400">📦</span>
                    )}
                  </div>

                  {/* Bottom Dark Section */}
                  <div className="bg-primary-950 p-5 flex-grow relative z-10" style={{ backgroundColor: '#001a3d' }}>
                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide leading-tight min-h-[2.5rem]">
                      {currentLanguage === 'ar' ? product.name_ar : product.name_en}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {currentLanguage === 'ar' ? product.description_ar : product.description_en}
                    </p>

                    {/* Vertical Divider with Details */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-primary-400 text-xs uppercase mb-1 font-semibold">
                          {currentLanguage === 'ar' ? 'الفئة' : 'Category'}
                        </p>
                        <p className="text-white text-sm">
                          {currentLanguage === 'ar' ? product.category_name_ar : product.category_name_en}
                        </p>
                      </div>
                      <div className="w-px bg-primary-500/30"></div>
                      <div className="flex-1">
                        <p className="text-primary-400 text-xs uppercase mb-1 font-semibold">
                          {currentLanguage === 'ar' ? 'الحالة' : 'Status'}
                        </p>
                        <p className="text-white text-sm">
                          {currentLanguage === 'ar' ? 'متوفر' : 'Available'}
                        </p>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-bold py-2.5 rounded-xl uppercase text-xs tracking-widest hover:from-primary-600 hover:to-cyan-600 transition-all">
                      {currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            {t('home.why.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: FaUserTie, key: 'expertise', color: 'text-blue-600' },
              { Icon: FaStar, key: 'quality', color: 'text-yellow-500' },
              { Icon: FaHeadset, key: 'support', color: 'text-green-600' },
              { Icon: FaRocket, key: 'innovation', color: 'text-purple-600' }
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                    <item.Icon className={`text-4xl ${item.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(`home.why.${item.key}`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`home.why.${item.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              {t('home.cta.description')}
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center bg-white text-primary-600 font-medium tracking-wide border-none cursor-pointer overflow-hidden transition-all duration-300 px-5 py-2 pl-5 pr-14 text-lg rounded-2xl h-14 shadow-[inset_0_0_1.6em_-0.6em_rgba(0,71,171,0.4)]"
            >
              <span className="relative z-10">{t('home.cta.button')}</span>
              <motion.div
                className="absolute right-1 bg-primary-600 rounded-xl h-11 w-11 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]"
              >
                <motion.svg 
                  className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </motion.svg>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;


