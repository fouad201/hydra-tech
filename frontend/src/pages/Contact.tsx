import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useSearchParams } from 'react-router-dom';

const Contact = () => {
  const { currentLanguage } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // Prefill subject from URL params (product, service, course, or project)
  useEffect(() => {
    const product = searchParams.get('product');
    const service = searchParams.get('service');
    const course = searchParams.get('course');
    const project = searchParams.get('project');
    
    if (product) {
      setFormData(prev => ({
        ...prev,
        subject: currentLanguage === 'ar' 
          ? `استفسار عن المنتج: ${product}`
          : `Inquiry about product: ${product}`
      }));
    } else if (service) {
      setFormData(prev => ({
        ...prev,
        subject: currentLanguage === 'ar' 
          ? `استفسار عن الخدمة: ${service}`
          : `Inquiry about service: ${service}`
      }));
    } else if (course) {
      setFormData(prev => ({
        ...prev,
        subject: currentLanguage === 'ar' 
          ? `طلب التسجيل في الدورة: ${course}`
          : `Enrollment request for course: ${course}`
      }));
    } else if (project) {
      setFormData(prev => ({
        ...prev,
        subject: currentLanguage === 'ar' 
          ? `طلب مشروع طباعة ثلاثية الأبعاد: ${project}`
          : `3D printing project request: ${project}`
      }));
    }
  }, [searchParams, currentLanguage]);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(currentLanguage === 'ar' 
        ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
        : 'An error occurred while sending your message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl opacity-50" style={{ color: '#0047AB' }}>
                  {currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </span>
                <span className="relative text-white drop-shadow-[0_0_30px_rgba(0,71,171,0.8)]">
                  {currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </span>
              </span>
            </h1>
            <p className="text-xl text-primary-100">
              {currentLanguage === 'ar' 
                ? 'نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن'
                : 'We\'re here to help. Reach out to us and we\'ll respond as soon as possible'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentLanguage === 'ar' ? 'معلومات الاتصال' : 'Get in Touch'}
              </h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLanguage === 'ar' 
                        ? '53 شارع جسر السويس - نزهة - مصر الجديدة - مبنى 3 C - الطابق الثاني - شقة 203'
                        : '53 Gesr El Suez St. - Nozha - Heliopolis - Building 3 C - Second Floor - Apartment 203'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <a href="mailto:info@hydratech-eg.com" className="text-primary-600 hover:text-primary-700">
                      info@hydratech-eg.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? 'الهاتف' : 'Phone'}
                    </h3>
                    <div className="space-y-1">
                      <a href="tel:01227226502" className="block text-primary-600 hover:text-primary-700">
                        01227226502
                      </a>
                      <a href="tel:0221922715" className="block text-primary-600 hover:text-primary-700">
                        0221922715
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {currentLanguage === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLanguage === 'ar' 
                        ? 'السبت - الخميس: 9:00 صباحاً - 5:00 مساءً'
                        : 'Saturday - Thursday: 9:00 AM - 5:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLanguage === 'ar' ? 'الاسم' : 'Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                    placeholder={currentLanguage === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                    placeholder={currentLanguage === 'ar' ? 'بريدك الإلكتروني' : 'your.email@example.com'}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLanguage === 'ar' ? 'الهاتف' : 'Phone'} 
                    <span className="text-gray-400 font-normal ml-1">({currentLanguage === 'ar' ? 'اختياري' : 'optional'})</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                    placeholder={currentLanguage === 'ar' ? 'رقم هاتفك' : 'Your phone number'}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLanguage === 'ar' ? 'الموضوع' : 'Subject'} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                    placeholder={currentLanguage === 'ar' ? 'موضوع رسالتك' : 'Message subject'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLanguage === 'ar' ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors resize-none"
                    placeholder={currentLanguage === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-800 font-semibold">
                        {currentLanguage === 'ar' 
                          ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                          : 'Message sent successfully! We\'ll get back to you soon.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-800 font-semibold">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {currentLanguage === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'ar' ? 'زوروا مكتبنا' : 'Visit Our Office'}
            </h2>
            <p className="text-gray-600 mb-8">
              {currentLanguage === 'ar' 
                ? 'نرحب بزيارتكم في مكتبنا خلال ساعات العمل الرسمية'
                : 'We welcome you to visit our office during business hours'}
            </p>
            {/* Placeholder for map - you can integrate Google Maps later */}
            <div className="bg-white rounded-2xl p-8 shadow-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <p className="text-gray-500">
                  {currentLanguage === 'ar' ? 'خريطة الموقع' : 'Map Integration Coming Soon'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
