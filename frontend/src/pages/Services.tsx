import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Service } from '../types/api';

const Services = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await api.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-indigo-500 to-purple-500',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/data-center-automation.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl opacity-50" style={{ color: '#0047AB' }}>
                  {currentLanguage === 'ar' ? 'خدماتنا' : 'Our Services'}
                </span>
                <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                  {currentLanguage === 'ar' ? 'خدماتنا' : 'Our Services'}
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg leading-relaxed">
              {currentLanguage === 'ar' 
                ? 'نقدم مجموعة شاملة من الخدمات الفنية والحلول المبتكرة لتلبية احتياجاتك'
                : 'We offer a comprehensive range of technical services and innovative solutions to meet your needs'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                  <div className="w-20 h-20 rounded-2xl bg-gray-200 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            // No Services
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {currentLanguage === 'ar' ? 'لا توجد خدمات' : 'No Services Found'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'ar' 
                  ? 'لم يتم العثور على خدمات متاحة حالياً'
                  : 'No services available at the moment'}
              </p>
            </motion.div>
          ) : (
            // Services Grid
            <motion.div
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden cursor-pointer"
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"></div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-4xl mb-6 relative z-10 shadow-lg`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                    {currentLanguage === 'ar' ? service.title_ar : service.title_en}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                    {currentLanguage === 'ar' ? service.description_ar : service.description_en}
                  </p>

                  {/* Learn More Button */}
                  <div className="relative flex items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium tracking-wide border-none cursor-pointer overflow-hidden transition-all duration-300 px-5 py-2 pl-5 pr-14 text-base rounded-2xl h-11 shadow-[inset_0_0_1.6em_-0.6em_rgba(0,71,171,0.6)] z-10 group">
                    <span className="relative z-10">{currentLanguage === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                    <div className="absolute right-1 bg-white rounded-xl h-9 w-9 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]">
                      <svg 
                        className="w-4 h-4 text-primary-600 transition-transform group-hover:translate-x-1"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {currentLanguage === 'ar' 
                ? 'هل أنت مستعد للبدء؟' 
                : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {currentLanguage === 'ar' 
                ? 'اتصل بنا اليوم لمناقشة مشروعك واحتياجاتك'
                : 'Contact us today to discuss your project and requirements'}
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center bg-white text-primary-600 font-medium tracking-wide border-none cursor-pointer overflow-hidden transition-all duration-300 px-5 py-2 pl-5 pr-14 text-lg rounded-2xl h-14 shadow-[inset_0_0_1.6em_-0.6em_rgba(0,71,171,0.4)]"
            >
              <span className="relative z-10">{currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
              <div className="absolute right-1 bg-primary-600 rounded-xl h-11 w-11 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]">
                <svg 
                  className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
