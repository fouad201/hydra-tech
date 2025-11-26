import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray-400" aria-hidden="true">
                  {currentLanguage === 'ar' ? '←' : '→'}
                </span>
              )}
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 font-semibold">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;

