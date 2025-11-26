import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Service } from '../types/api';
import Breadcrumb from '../components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { FaTrophy, FaTools, FaUsers, FaCertificate } from 'react-icons/fa';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [serviceData, servicesData] = await Promise.all([
          api.getService(parseInt(id)),
          api.getServices(),
        ]);
        setService(serviceData);
        setAllServices(servicesData.filter(s => s.id !== serviceData.id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-32 bg-gray-200 rounded-3xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {currentLanguage === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'}
          </h2>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentLanguage === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t('common.nav.home'), path: '/' },
          { label: t('common.nav.services'), path: '/services' },
          { label: currentLanguage === 'ar' ? service.title_ar : service.title_en }
        ]}
      />

      {/* Service Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Icon */}
              <div className="inline-block mb-6">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${gradients[service.order % gradients.length]} flex items-center justify-center text-7xl shadow-2xl`}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'ar' ? service.title_ar : service.title_en}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {currentLanguage === 'ar' ? service.description_ar : service.description_en}
              </p>
            </motion.div>

            {/* Service Details Sections */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 mb-12"
            >
              {/* What We Offer */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    ✓
                  </span>
                  {currentLanguage === 'ar' ? 'ما نقدمه' : 'What We Offer'}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'استشارات تقنية متخصصة من خبراء معتمدين'
                        : 'Professional technical consultations from certified experts'}
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'حلول مخصصة تناسب احتياجاتك الخاصة'
                        : 'Customized solutions tailored to your specific needs'}
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'صيانة ودعم فني مستمر'
                        : 'Ongoing maintenance and technical support'}
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'ضمان الجودة والالتزام بالمواعيد'
                        : 'Quality assurance and timely delivery'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    ⭐
                  </span>
                  {currentLanguage === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaTrophy className="text-2xl text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'خبرة واسعة' : 'Extensive Experience'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'سنوات من الخبرة في المجال'
                          : 'Years of industry experience'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaTools className="text-2xl text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'معدات حديثة' : 'Modern Equipment'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'أحدث التقنيات والمعدات'
                          : 'Latest technology and equipment'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaUsers className="text-2xl text-green-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'فريق محترف' : 'Professional Team'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'مهندسون وفنيون معتمدون'
                          : 'Certified engineers and technicians'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaCertificate className="text-2xl text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'التزام بأعلى معايير الجودة'
                          : 'Commitment to highest quality standards'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentLanguage === 'ar' ? 'مهتم بهذه الخدمة؟' : 'Interested in This Service?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {currentLanguage === 'ar' 
                  ? 'تواصل معنا اليوم للحصول على استشارة مجانية'
                  : 'Contact us today for a free consultation'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate(`/contact?service=${encodeURIComponent(currentLanguage === 'ar' ? service.title_ar : service.title_en)}`)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('common.requestQuote')}
                </button>
                <button 
                  onClick={() => navigate('/services')}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t('common.viewAllServices')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Other Services */}
          {allServices.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {currentLanguage === 'ar' ? 'خدمات أخرى' : 'Other Services'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {allServices.map((otherService, index) => (
                  <motion.div
                    key={otherService.id}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate(`/services/${otherService.id}`)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {otherService.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? otherService.title_ar : otherService.title_en}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {currentLanguage === 'ar' ? otherService.description_ar : otherService.description_en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

