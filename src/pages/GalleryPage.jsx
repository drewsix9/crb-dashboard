import { useState } from 'react';
import { ImageFilters, ImageGrid } from '../components/features';
import Container from '../components/layout/Container';
import Modal, { ModalContent } from '../components/ui/Modal';
import { mockImages } from '../services/mockData/images.mock';
import { mockTraps } from '../services/mockData/traps.mock';

const GalleryPage = () => {
  const [filters, setFilters] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  // Transform images to match ImageGrid component expectations
  const transformedImages = mockImages.map(img => ({
    id: img.id,
    trap_id: img.trap_id,
    image_url: img.image_url,
    gender: img.metadata?.gender || 'unknown',
    captured_at: img.taken_at,
  }));

  // Filter images based on current filters
  const filteredImages = transformedImages.filter(image => {
    if (filters.trapId && image.trap_id !== filters.trapId) return false;
    if (filters.gender && image.gender !== filters.gender) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!image.trap_id.toLowerCase().includes(searchLower)) return false;
    }
    return true;
  });

  return (
    <>
      <Container maxWidth="2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
            <p className="text-gray-600 mt-2">
              Browse captured CRB images from all traps
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Total Images</p>
              <p className="text-2xl font-bold text-gray-900">{transformedImages.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-primary-700">{filteredImages.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Male</p>
              <p className="text-2xl font-bold text-[#60a5fa]">
                {filteredImages.filter(img => img.gender === 'male').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Female</p>
              <p className="text-2xl font-bold text-[#f472b6]">
                {filteredImages.filter(img => img.gender === 'female').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <ImageFilters 
            traps={mockTraps}
            onFilterChange={setFilters}
          />

          {/* Image Grid */}
          <ImageGrid 
            images={filteredImages}
            onImageClick={setSelectedImage}
          />
        </div>
      </Container>

      {/* Image Detail Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title="Capture Details"
          size="lg"
        >
          <ModalContent>
            <div className="space-y-4">
              <img
                src={selectedImage.image_url}
                alt={`Capture from ${selectedImage.trap_id}`}
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Trap ID</p>
                  <p className="font-semibold">{selectedImage.trap_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold capitalize">{selectedImage.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Captured</p>
                  <p className="font-semibold">
                    {new Date(selectedImage.captured_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Image ID</p>
                  <p className="font-semibold">#{selectedImage.id}</p>
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default GalleryPage;
