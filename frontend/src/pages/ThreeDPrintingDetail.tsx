import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { ThreeDPrintingProject } from '../types/api';
import Breadcrumb from '../components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { FaCube, FaStar } from 'react-icons/fa';

const ThreeDPrintingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const [project, setProject] = useState<ThreeDPrintingProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ThreeDPrintingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [projectData, allProjects] = await Promise.all([
          api.get3DPrintingProject(parseInt(id)),
          api.get3DPrintingProjects(),
        ]);
        setProject(projectData);
        setRelatedProjects(allProjects.filter(p => p.id !== projectData.id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching 3D printing project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {currentLanguage === 'ar' ? 'المشروع غير موجود' : 'Project Not Found'}
          </h2>
          <button
            onClick={() => navigate('/3d-printing')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentLanguage === 'ar' ? 'العودة للطباعة ثلاثية الأبعاد' : 'Back to 3D Printing'}
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
          { label: t('common.nav.3dprinting'), path: '/3d-printing' },
          { label: currentLanguage === 'ar' ? project.title_ar : project.title_en }
        ]}
      />

      {/* Project Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500 via-primary-600 to-cyan-600 rounded-2xl overflow-hidden shadow-2xl aspect-square flex items-center justify-center p-8">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={currentLanguage === 'ar' ? project.title_ar : project.title_en}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <FaCube className="text-9xl text-white" />
                )}
              </div>
              {project.is_featured && (
                <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <FaStar className="text-yellow-600" />
                  {currentLanguage === 'ar' ? 'مميز' : 'Featured'}
                </div>
              )}
            </motion.div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'ar' ? project.title_ar : project.title_en}
              </h1>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {currentLanguage === 'ar' ? project.description_ar : project.description_en}
                </p>
              </div>

              {/* Project Specs */}
              <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {currentLanguage === 'ar' ? 'المواصفات' : 'Specifications'}
                </h3>
                <div className="space-y-3">
                  {project.material && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        {currentLanguage === 'ar' ? 'المادة' : 'Material'}
                      </span>
                      <span className="text-gray-900 font-semibold">{project.material}</span>
                    </div>
                  )}
                  {project.print_time && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        {currentLanguage === 'ar' ? 'وقت الطباعة' : 'Print Time'}
                      </span>
                      <span className="text-gray-900 font-semibold">{project.print_time}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 font-medium">
                      {currentLanguage === 'ar' ? 'التقنية' : 'Technology'}
                    </span>
                    <span className="text-gray-900 font-semibold">FDM</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate(`/contact?project=${encodeURIComponent(currentLanguage === 'ar' ? project.title_ar : project.title_en)}`)}
                  className="flex-1 py-4 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:via-purple-700 hover:to-primary-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {t('common.requestQuote')}
                </button>
                <button 
                  onClick={() => navigate('/3d-printing')}
                  className="py-4 px-8 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t('common.backTo')} {t('common.nav.3dprinting')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentLanguage === 'ar' ? 'مشاريع أخرى' : 'Other Projects'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <motion.div
                    key={relatedProject.id}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate(`/3d-printing/${relatedProject.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-purple-500 via-primary-600 to-cyan-600 flex items-center justify-center p-4">
                      {relatedProject.image ? (
                        <img 
                          src={relatedProject.image} 
                          alt={currentLanguage === 'ar' ? relatedProject.title_ar : relatedProject.title_en}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <FaCube className="text-6xl text-white" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {currentLanguage === 'ar' ? relatedProject.title_ar : relatedProject.title_en}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {currentLanguage === 'ar' ? relatedProject.description_ar : relatedProject.description_en}
                      </p>
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

export default ThreeDPrintingDetail;

