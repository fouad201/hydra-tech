import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Course } from '../types/api';

const Courses = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = selectedLevel === 'all' 
          ? await api.getCourses() 
          : await api.getCourses({ level: selectedLevel });
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedLevel]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const levelOptions = [
    { value: 'all', label_en: 'All Levels', label_ar: 'جميع المستويات' },
    { value: 'beginner', label_en: 'Beginner', label_ar: 'مبتدئ' },
    { value: 'intermediate', label_en: 'Intermediate', label_ar: 'متوسط' },
    { value: 'advanced', label_en: 'Advanced', label_ar: 'متقدم' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/Roundtable%20future%20energy%20seminar.png)' }}
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
                  {currentLanguage === 'ar' ? 'دوراتنا التدريبية' : 'Our Training Courses'}
                </span>
                <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                  {currentLanguage === 'ar' ? 'دوراتنا التدريبية' : 'Our Training Courses'}
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg leading-relaxed">
              {currentLanguage === 'ar' 
                ? 'اكتسب مهارات جديدة مع دورات تدريبية متخصصة يقدمها خبراء معتمدون'
                : 'Gain new skills with specialized training courses delivered by certified experts'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Level Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {levelOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLevel(option.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedLevel === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currentLanguage === 'ar' ? option.label_ar : option.label_en}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                  <div className="w-20 h-20 rounded-2xl bg-gray-200 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            // No Courses
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {currentLanguage === 'ar' ? 'لا توجد دورات' : 'No Courses Found'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'ar' 
                  ? 'لم يتم العثور على دورات في هذا المستوى'
                  : 'No courses found for this level'}
              </p>
            </motion.div>
          ) : (
            // Courses Grid
            <motion.div
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-br-full opacity-50"></div>

                  {/* Featured Badge */}
                  {course.is_featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      {currentLanguage === 'ar' ? 'مميز' : 'Featured'}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-6xl mb-4 relative z-10">{course.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                    {currentLanguage === 'ar' ? course.title_ar : course.title_en}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 relative z-10 line-clamp-3">
                    {currentLanguage === 'ar' ? course.description_ar : course.description_en}
                  </p>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm relative z-10">
                    {course.duration && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.level_display}
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <div className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-center relative z-10">
                    {currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details'}
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
                ? 'ابدأ رحلتك التعليمية اليوم' 
                : 'Start Your Learning Journey Today'}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {currentLanguage === 'ar' 
                ? 'تواصل معنا للتسجيل أو للحصول على مزيد من المعلومات'
                : 'Contact us to enroll or get more information'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-xl"
            >
              {currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
