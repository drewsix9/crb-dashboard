import PropTypes from 'prop-types';
import { useState } from 'react';
import Badge from '../../ui/Badge';
import Spinner from '../../ui/Spinner';

/**
 * Image Grid component with lazy loading
 */
const ImageGrid = ({ 
  images = [],
  onImageClick,
  loading = false,
  className = '',
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" text="Loading images..." />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No images found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onImageClick?.(image)}
        >
          {/* Image */}
          <div className="aspect-square bg-gray-100 relative">
            {!loadedImages.has(image.id) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size="sm" />
              </div>
            )}
            <img
              src={image.image_url}
              alt={`Capture from ${image.trap_id}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200" />
          </div>

          {/* Info */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">
                {image.trap_id}
              </span>
              <Badge 
                variant={image.gender === 'male' ? 'info' : 'default'}
                size="sm"
              >
                {image.gender === 'male' ? 'Male' : 'Female'}
              </Badge>
            </div>
            
            <p className="text-xs text-gray-500">
              {new Date(image.captured_at).toLocaleDateString()} at{' '}
              {new Date(image.captured_at).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      trap_id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      gender: PropTypes.string,
      captured_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default ImageGrid;
