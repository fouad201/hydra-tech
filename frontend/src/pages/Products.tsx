import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import type { Product, ProductCategory } from '../types/api';

const Products = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          selectedCategory === 'all' 
            ? api.getProducts() 
            : api.getProducts({ category__slug: selectedCategory }),
          api.getProductCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/factory-workshop-interior-machines-glass-production-background-3-scaled-2560x1280.jpg)' }}
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
                  {currentLanguage === 'ar' ? 'منتجاتنا' : 'Our Products'}
                </span>
                <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                  {currentLanguage === 'ar' ? 'منتجاتنا' : 'Our Products'}
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg leading-relaxed">
              {currentLanguage === 'ar' 
                ? 'اكتشف مجموعة واسعة من المنتجات الكهربائية ومعدات الأتمتة عالية الجودة'
                : 'Discover our wide range of high-quality electrical products and automation equipment'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {currentLanguage === 'ar' ? 'الكل' : 'All Products'}
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currentLanguage === 'ar' ? category.name_ar : category.name_en}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            // No Products
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {currentLanguage === 'ar' ? 'لا توجد منتجات' : 'No Products Found'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'ar' 
                  ? 'لم يتم العثور على منتجات في هذه الفئة'
                  : 'No products found in this category'}
              </p>
            </motion.div>
          ) : (
            // Products Grid
            <motion.div
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="relative bg-gradient-to-br from-primary-900 to-primary-800 rounded-[28px] overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{ 
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
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
