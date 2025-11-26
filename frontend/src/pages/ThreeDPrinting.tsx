import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { ThreeDPrintingProject } from '../types/api';
import { FaCube, FaBolt, FaCrosshairs, FaWrench, FaStar, FaPalette, FaRulerCombined } from 'react-icons/fa';
import { MdSpeed, MdPrecisionManufacturing } from 'react-icons/md';
import { BiCustomize } from 'react-icons/bi';
import { GiMaterialsScience } from 'react-icons/gi';

const ThreeDPrinting = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<ThreeDPrintingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await api.get3DPrintingProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching 3D printing projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 70%' }}
        >
          <source src="/11898683_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        {/* Stronger dark overlays for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 drop-shadow-2xl flex justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center shadow-2xl">
                <FaCube className="text-6xl text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl opacity-50" style={{ color: '#0047AB' }}>
                  {currentLanguage === 'ar' ? 'الطباعة ثلاثية الأبعاد' : '3D Printing Services'}
                </span>
                <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                  {currentLanguage === 'ar' ? 'الطباعة ثلاثية الأبعاد' : '3D Printing Services'}
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {currentLanguage === 'ar' 
                ? 'تحويل أفكارك إلى واقع ملموس بتقنية الطباعة ثلاثية الأبعاد المتقدمة'
                : 'Transform your ideas into reality with advanced 3D printing technology'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30 text-white font-semibold">
                <MdSpeed className="text-yellow-300 text-2xl" />
                <span>{currentLanguage === 'ar' ? 'طباعة سريعة' : 'Fast Printing'}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30 text-white font-semibold">
                <MdPrecisionManufacturing className="text-cyan-300 text-2xl" />
                <span>{currentLanguage === 'ar' ? 'دقة عالية' : 'High Precision'}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30 text-white font-semibold">
                <BiCustomize className="text-purple-300 text-2xl" />
                <span>{currentLanguage === 'ar' ? 'حلول مخصصة' : 'Custom Solutions'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'مشاريعنا' : 'Our Projects'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === 'ar' 
                ? 'استكشف بعض المشاريع التي أنجزناها باستخدام تقنية الطباعة ثلاثية الأبعاد'
                : 'Explore some of the projects we\'ve completed using 3D printing technology'}
            </p>
          </motion.div>

          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-72 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            // No Projects
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center">
                  <FaCube className="text-5xl text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {currentLanguage === 'ar' ? 'لا توجد مشاريع' : 'No Projects Yet'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'ar' 
                  ? 'سيتم إضافة المشاريع قريباً'
                  : 'Projects will be added soon'}
              </p>
            </motion.div>
          ) : (
            // Projects Grid
            <motion.div
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/3d-printing/${project.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="h-72 bg-gradient-to-br from-purple-500 via-primary-600 to-cyan-600 flex items-center justify-center relative overflow-hidden p-6">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={currentLanguage === 'ar' ? project.title_ar : project.title_en}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <FaCube className="text-9xl text-white" />
                    )}
                    {project.is_featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <FaStar className="text-yellow-600" />
                        {currentLanguage === 'ar' ? 'مميز' : 'Featured'}
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {currentLanguage === 'ar' ? project.title_ar : project.title_en}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {currentLanguage === 'ar' ? project.description_ar : project.description_en}
                    </p>

                    {/* Project Meta */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.material && (
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
                          {project.material}
                        </span>
                      )}
                      {project.print_time && (
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.print_time}
                        </span>
                      )}
                    </div>

                    <div className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold text-center">
                      {currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'إمكانياتنا' : 'Our Capabilities'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: FaCrosshairs, color: 'text-red-500', bgColor: 'from-red-100 to-red-50', title_en: 'High Precision', title_ar: 'دقة عالية', desc_en: 'Layer accuracy up to 0.1mm', desc_ar: 'دقة الطبقة تصل إلى 0.1 ملم' },
              { Icon: GiMaterialsScience, color: 'text-purple-500', bgColor: 'from-purple-100 to-purple-50', title_en: 'Multiple Materials', title_ar: 'مواد متعددة', desc_en: 'PLA, ABS, PETG, Nylon & more', desc_ar: 'PLA, ABS, PETG, نايلون والمزيد' },
              { Icon: FaRulerCombined, color: 'text-blue-500', bgColor: 'from-blue-100 to-blue-50', title_en: 'Custom Design', title_ar: 'تصميم مخصص', desc_en: 'CAD design and optimization', desc_ar: 'تصميم CAD والتحسين' },
              { Icon: FaBolt, color: 'text-yellow-500', bgColor: 'from-yellow-100 to-yellow-50', title_en: 'Fast Turnaround', title_ar: 'تسليم سريع', desc_en: 'Quick production times', desc_ar: 'أوقات إنتاج سريعة' },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${capability.bgColor} flex items-center justify-center shadow-lg`}>
                    <capability.Icon className={`text-4xl ${capability.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {currentLanguage === 'ar' ? capability.title_ar : capability.title_en}
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === 'ar' ? capability.desc_ar : capability.desc_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 text-white">
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
                ? 'هل لديك مشروع طباعة ثلاثية الأبعاد؟' 
                : 'Have a 3D Printing Project?'}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {currentLanguage === 'ar' 
                ? 'تواصل معنا لمناقشة متطلباتك والحصول على عرض سعر'
                : 'Contact us to discuss your requirements and get a quote'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-xl"
            >
              {currentLanguage === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThreeDPrinting;
