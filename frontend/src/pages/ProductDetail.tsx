import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Product } from '../types/api';
import Breadcrumb from '../components/Breadcrumb';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await api.getProduct(parseInt(id));
        setProduct(productData);
        
        const related = await api.getProducts({ 
          category__slug: productData.category_slug 
        });
        setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {currentLanguage === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentLanguage === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
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
          { label: t('common.nav.products'), path: '/products' },
          { label: currentLanguage === 'ar' ? product.name_ar : product.name_en }
        ]}
      />

      {/* Product Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xl aspect-square flex items-center justify-center p-8">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={currentLanguage === 'ar' ? product.name_ar : product.name_en}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-9xl text-gray-400">📦</span>
                )}
              </div>
              {product.is_featured && (
                <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg">
                  {currentLanguage === 'ar' ? '⭐ مميز' : '⭐ Featured'}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Badge */}
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                {currentLanguage === 'ar' ? product.category_name_ar : product.category_name_en}
              </div>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'ar' ? product.name_ar : product.name_en}
              </h1>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {currentLanguage === 'ar' ? product.description_ar : product.description_en}
                </p>
              </div>

              {/* Features List (Example - you can expand this) */}
              <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {currentLanguage === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' ? 'جودة عالية ومعتمدة' : 'High quality and certified'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' ? 'ضمان الشركة المصنعة' : 'Manufacturer warranty'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      {currentLanguage === 'ar' ? 'دعم فني متخصص' : 'Professional technical support'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate(`/contact?product=${encodeURIComponent(currentLanguage === 'ar' ? product.name_ar : product.name_en)}`)}
                  className="flex-1 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('common.requestQuote')}
                </button>
                <button 
                  onClick={() => navigate('/products')}
                  className="py-4 px-8 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t('common.viewAllProducts')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentLanguage === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    whileHover={{ y: -8 }}
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                      {relatedProduct.image ? (
                        <img 
                          src={relatedProduct.image} 
                          alt={currentLanguage === 'ar' ? relatedProduct.name_ar : relatedProduct.name_en}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <span className="text-6xl text-gray-400">📦</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {currentLanguage === 'ar' ? relatedProduct.name_ar : relatedProduct.name_en}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {currentLanguage === 'ar' ? relatedProduct.description_ar : relatedProduct.description_en}
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

export default ProductDetail;

