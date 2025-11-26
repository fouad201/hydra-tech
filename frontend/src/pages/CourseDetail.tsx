import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Course } from '../types/api';
import Breadcrumb from '../components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { FaChalkboardTeacher, FaBook, FaTools, FaGraduationCap } from 'react-icons/fa';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [courseData, allCourses] = await Promise.all([
          api.getCourse(parseInt(id)),
          api.getCourses(),
        ]);
        setCourse(courseData);
        setRelatedCourses(allCourses.filter(c => c.id !== courseData.id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-32 bg-gray-200 rounded-3xl mb-8"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {currentLanguage === 'ar' ? 'الدورة غير موجودة' : 'Course Not Found'}
          </h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentLanguage === 'ar' ? 'العودة للدورات' : 'Back to Courses'}
          </button>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t('common.nav.home'), path: '/' },
          { label: t('common.nav.courses'), path: '/courses' },
          { label: currentLanguage === 'ar' ? course.title_ar : course.title_en }
        ]}
      />

      {/* Course Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Icon */}
              <div className="inline-block mb-6">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-7xl shadow-2xl">
                  {course.icon}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'ar' ? course.title_ar : course.title_en}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                {course.duration && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-gray-700">{course.duration}</span>
                  </div>
                )}
                <div className={`px-4 py-2 rounded-full shadow-md font-semibold ${getLevelColor(course.level)}`}>
                  {course.level_display}
                </div>
                {course.is_featured && (
                  <div className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full shadow-md font-bold">
                    {currentLanguage === 'ar' ? '⭐ مميز' : '⭐ Featured'}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {currentLanguage === 'ar' ? course.description_ar : course.description_en}
              </p>
            </motion.div>

            {/* Course Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 mb-12"
            >
              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    📚
                  </span>
                  {currentLanguage === 'ar' ? 'ما ستتعلمه' : 'What You\'ll Learn'}
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
                        ? 'المفاهيم الأساسية والنظرية العملية'
                        : 'Fundamental concepts and practical theory'}
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
                        ? 'تطبيقات عملية وتمارين واقعية'
                        : 'Hands-on applications and real-world exercises'}
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
                        ? 'أفضل الممارسات الصناعية'
                        : 'Industry best practices and standards'}
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
                        ? 'شهادة إتمام معتمدة'
                        : 'Certificate of completion'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Course Includes */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    ✓
                  </span>
                  {currentLanguage === 'ar' ? 'تشمل الدورة' : 'Course Includes'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaChalkboardTeacher className="text-2xl text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'مدربون خبراء' : 'Expert Instructors'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'مهندسون معتمدون بخبرة واسعة'
                          : 'Certified engineers with extensive experience'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaBook className="text-2xl text-green-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'مواد تدريبية' : 'Training Materials'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'جميع المواد والمراجع اللازمة'
                          : 'All necessary materials and references'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaTools className="text-2xl text-orange-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'تدريب عملي' : 'Practical Training'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'تطبيقات عملية على المعدات'
                          : 'Hands-on practice with equipment'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FaGraduationCap className="text-2xl text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {currentLanguage === 'ar' ? 'شهادة معتمدة' : 'Certified Certificate'}
                      </h3>
                      <p className="text-primary-100 text-sm">
                        {currentLanguage === 'ar' 
                          ? 'شهادة إتمام معتمدة'
                          : 'Official certificate upon completion'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Should Attend */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentLanguage === 'ar' ? 'من يجب أن يحضر؟' : 'Who Should Attend?'}
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'المهندسون والفنيون العاملون في مجال الأتمتة'
                        : 'Engineers and technicians working in automation'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'الطلاب الذين يرغبون في التخصص في المجال'
                        : 'Students looking to specialize in the field'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' 
                        ? 'المحترفون الذين يسعون لتطوير مهاراتهم'
                        : 'Professionals seeking to develop their skills'}
                    </span>
                  </li>
                </ul>
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
                {currentLanguage === 'ar' ? 'مهتم بهذه الدورة؟' : 'Interested in This Course?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {currentLanguage === 'ar' 
                  ? 'تواصل معنا للتسجيل أو الحصول على مزيد من المعلومات حول مواعيد الدورات القادمة'
                  : 'Contact us to enroll or get more information about upcoming course schedules'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate(`/contact?course=${encodeURIComponent(currentLanguage === 'ar' ? course.title_ar : course.title_en)}`)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {currentLanguage === 'ar' ? 'طلب التسجيل' : 'Request Enrollment'}
                </button>
                <button 
                  onClick={() => navigate('/courses')}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t('common.viewAllCourses')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {currentLanguage === 'ar' ? 'دورات أخرى قد تهمك' : 'Other Courses You Might Like'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedCourses.map((relatedCourse) => (
                  <motion.div
                    key={relatedCourse.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/courses/${relatedCourse.id}`)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className="text-5xl mb-4">{relatedCourse.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? relatedCourse.title_ar : relatedCourse.title_en}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {currentLanguage === 'ar' ? relatedCourse.description_ar : relatedCourse.description_en}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {relatedCourse.duration && (
                        <span>{relatedCourse.duration}</span>
                      )}
                    </div>
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

export default CourseDetail;

