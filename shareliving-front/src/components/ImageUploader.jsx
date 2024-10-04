import React, { useState } from 'react';
import './ImageUploader.scss';

const ImageUploader = () => {
  const [images, setImages] = useState([]); 
  const maxImages = 5; 

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const updatedImages = [...images, ...files].slice(0, maxImages);
    setImages(updatedImages);
  };

  return (
    <div className="content">
      <div className="image-upload">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
          </div>
        ))}

        {images.length < maxImages && (
          <div className="upload-button">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              style={{ display: 'none' }}
              id="image-input"
            />
            <label htmlFor="image-input" className="plus-icon">
              +
            </label>
            <span className="image-count">{images.length}/{maxImages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
