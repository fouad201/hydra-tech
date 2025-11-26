from django.core.management.base import BaseCommand
from content.models import Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject


class Command(BaseCommand):
    help = 'Seed database with initial data matching frontend content'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # Create Services
        services_data = [
            {
                'title_en': 'Smart Home',
                'title_ar': 'المنزل الذكي',
                'description_en': 'Explore innovative smart home solutions to enhance comfort, security, and energy efficiency with cutting-edge automation technology.',
                'description_ar': 'اكتشف حلول المنزل الذكي المبتكرة لتعزيز الراحة والأمان وكفاءة الطاقة بتقنية الأتمتة المتطورة.',
                'icon': '🏠',
                'order': 1
            },
            {
                'title_en': 'Automation Development',
                'title_ar': 'تطوير الأتمتة',
                'description_en': 'Operation, maintenance and development of water plants with advanced automation systems for optimal efficiency.',
                'description_ar': 'تشغيل وصيانة وتطوير محطات المياه بأنظمة أتمتة متقدمة لتحقيق كفاءة مثالية.',
                'icon': '⚙️',
                'order': 2
            },
            {
                'title_en': 'SCADA Systems',
                'title_ar': 'أنظمة سكادا',
                'description_en': 'Operation, maintenance and development of drainage stations with state-of-the-art SCADA monitoring and control systems.',
                'description_ar': 'تشغيل وصيانة وتطوير محطات الصرف الصحي بأحدث أنظمة المراقبة والتحكم سكادا.',
                'icon': '📊',
                'order': 3
            },
        ]

        for service_data in services_data:
            Service.objects.get_or_create(
                title_en=service_data['title_en'],
                defaults=service_data
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(services_data)} services'))

        # Create Product Categories
        categories_data = [
            {'name_en': 'Automation', 'name_ar': 'الأتمتة', 'slug': 'automation', 'order': 1},
            {'name_en': 'Electrical Components', 'name_ar': 'المكونات الكهربائية', 'slug': 'electrical-components', 'order': 2},
            {'name_en': 'Low Voltage Panels', 'name_ar': 'لوحات الجهد المنخفض', 'slug': 'low-voltage-panels', 'order': 3},
            {'name_en': 'Control Panels', 'name_ar': 'لوحات التحكم', 'slug': 'control-panels', 'order': 4},
            {'name_en': 'Equipment & Machinery', 'name_ar': 'المعدات والآلات', 'slug': 'equipment-machinery', 'order': 5},
        ]

        for cat_data in categories_data:
            ProductCategory.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(categories_data)} product categories'))

        # Create Products
        panel_cat = ProductCategory.objects.get(slug='low-voltage-panels')
        electrical_cat = ProductCategory.objects.get(slug='electrical-components')
        automation_cat = ProductCategory.objects.get(slug='automation')

        products_data = [
            {
                'category': panel_cat,
                'name_en': 'Panel Power for Low Voltage',
                'name_ar': 'لوحة الطاقة للجهد المنخفض',
                'description_en': 'High-quality low voltage power distribution panels',
                'description_ar': 'لوحات توزيع الطاقة ذات الجهد المنخفض عالية الجودة',
                'is_featured': True,
                'order': 1
            },
            {
                'category': electrical_cat,
                'name_en': 'Contactor',
                'name_ar': 'كونتاكتور',
                'description_en': 'Industrial-grade contactors for reliable switching',
                'description_ar': 'كونتاكتور صناعي للتبديل الموثوق',
                'is_featured': True,
                'order': 2
            },
            {
                'category': automation_cat,
                'name_en': 'PLC',
                'name_ar': 'PLC',
                'description_en': 'Advanced programmable logic controllers',
                'description_ar': 'وحدات تحكم منطقية قابلة للبرمجة متقدمة',
                'is_featured': True,
                'order': 3
            },
        ]

        for product_data in products_data:
            Product.objects.get_or_create(
                name_en=product_data['name_en'],
                category=product_data['category'],
                defaults=product_data
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(products_data)} products'))

        # Create Courses
        courses_data = [
            {
                'title_en': 'PLC Basics',
                'title_ar': 'أساسيات PLC',
                'description_en': 'Master the fundamentals of Programmable Logic Controllers',
                'description_ar': 'إتقان أساسيات وحدات التحكم المنطقية القابلة للبرمجة',
                'duration': '4 weeks',
                'level': 'beginner',
                'is_featured': True,
                'icon': '💻',
                'order': 1
            },
            {
                'title_en': 'Technology of Pumps & Compressors',
                'title_ar': 'تكنولوجيا المضخات والضواغط',
                'description_en': 'Comprehensive training on industrial pump and compressor systems',
                'description_ar': 'تدريب شامل على أنظمة المضخات والضواغط الصناعية',
                'duration': '6 weeks',
                'level': 'intermediate',
                'is_featured': True,
                'icon': '⚡',
                'order': 2
            },
            {
                'title_en': 'Classic Control',
                'title_ar': 'التحكم الكلاسيكي',
                'description_en': 'Learn traditional control systems and their applications',
                'description_ar': 'تعلم أنظمة التحكم التقليدية وتطبيقاتها',
                'duration': '3 weeks',
                'level': 'beginner',
                'is_featured': True,
                'icon': '🎛️',
                'order': 3
            },
        ]

        for course_data in courses_data:
            Course.objects.get_or_create(
                title_en=course_data['title_en'],
                defaults=course_data
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(courses_data)} courses'))

        # Create Site Settings
        site_settings_data = {
            'company_name_en': 'Hydra Tech',
            'company_name_ar': 'هيدرا تك',
            'short_about_en': 'HYDRATECH provides high quality services, taking into consideration the time and cost factor and in line with the local market determinants. This is achieved through technical expertise of the management and employees of the company.',
            'short_about_ar': 'تقدم هيدراتك خدمات عالية الجودة، مع الأخذ في الاعتبار عامل الوقت والتكلفة وبما يتماشى مع محددات السوق المحلية. يتحقق ذلك من خلال الخبرة الفنية للإدارة والموظفين في الشركة.',
            'address_en': '53 Gesr El Suez St. - Nozha - Heliopolis - Building 3 C - Second Floor - Apartment 203',
            'address_ar': '53 شارع جسر السويس - نزهة - مصر الجديدة - مبنى 3 C - الطابق الثاني - شقة 203',
            'email': 'info@hydratech-eg.com',
            'phone1': '01227226502',
            'phone2': '0221922715',
            'footer_text_en': '© Copyrights 2025. All Rights Reserved.',
            'footer_text_ar': '© حقوق النشر 2025. جميع الحقوق محفوظة.'
        }

        site_settings = SiteSettings.load()
        for key, value in site_settings_data.items():
            setattr(site_settings, key, value)
        site_settings.save()
        self.stdout.write(self.style.SUCCESS('Created site settings'))

        # Create 3D Printing Projects
        printing_projects_data = [
            {
                'title_en': 'Custom Industrial Parts',
                'title_ar': 'قطع صناعية مخصصة',
                'description_en': 'High-precision 3D printed industrial components and replacement parts',
                'description_ar': 'مكونات صناعية مطبوعة ثلاثية الأبعاد عالية الدقة وقطع غيار',
                'material': 'ABS, Nylon',
                'print_time': '2-48 hours',
                'is_featured': True,
                'order': 1
            },
            {
                'title_en': 'Prototyping Services',
                'title_ar': 'خدمات النماذج الأولية',
                'description_en': 'Rapid prototyping for product development and testing',
                'description_ar': 'نماذج أولية سريعة لتطوير المنتجات والاختبار',
                'material': 'PLA, PETG',
                'print_time': '1-24 hours',
                'is_featured': True,
                'order': 2
            },
            {
                'title_en': 'Custom Enclosures',
                'title_ar': 'غلافات مخصصة',
                'description_en': 'Tailored protective enclosures for electronic equipment',
                'description_ar': 'غلافات واقية مخصصة للمعدات الإلكترونية',
                'material': 'ABS, PETG',
                'print_time': '3-12 hours',
                'is_featured': False,
                'order': 3
            },
        ]

        for project_data in printing_projects_data:
            ThreeDPrintingProject.objects.get_or_create(
                title_en=project_data['title_en'],
                defaults=project_data
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(printing_projects_data)} 3D printing projects'))

        self.stdout.write(self.style.SUCCESS('\nDatabase seeding completed successfully!'))

