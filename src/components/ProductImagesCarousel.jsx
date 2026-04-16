'use client';

import { useRef, useState } from 'react';
import ButtonCircle from '@/components/ButtonCircle';

const ProductImagesCarousel = ({ productImages, productId }) => {
  const carouselRef = useRef(null);
  const defaultActiveIndex = 0;
  const [activeImageIndex, setActiveImageIndex] = useState(defaultActiveIndex);

  const scrollByImageHeight = (direction) => {
    const newActiveImageIndex = activeImageIndex + direction * 1;

    if (newActiveImageIndex < 0 || newActiveImageIndex > productImages.length - 1) {
      return;
    }

    if (carouselRef.current) {
      const imageHeight = carouselRef.current.children[newActiveImageIndex].offsetHeight;
      const imagesGap = 10;
      const imagesPerPage = 4;
      const translateValue = -(imageHeight + imagesGap) * newActiveImageIndex;
      const maxTranslateValue = -(imageHeight + imagesGap) * (productImages.length - imagesPerPage);

      if (translateValue >= maxTranslateValue) {
        carouselRef.current.style.transform = `translateY(${translateValue}px)`;
      }
    }

    setActiveImageIndex(newActiveImageIndex);
  };

  return (
    <div className="product-images">
      <button
        className="carousel-button up"
        onClick={() => scrollByImageHeight(-1)}
        disabled={activeImageIndex === defaultActiveIndex}
        aria-label="Попереднє зображення"
      >
        <ButtonCircle />
      </button>
      <button
        className="carousel-button down"
        onClick={() => scrollByImageHeight(1)}
        disabled={activeImageIndex === productImages.length - 1}
        aria-label="Наступне зображення"
      >
        <ButtonCircle />
      </button>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            {productImages?.length > 1 &&
              productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`carousel-image ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${productId} — зображення ${index + 1}`} />
                </button>
              ))}
          </div>
        </div>
      </div>
      <img
        className="active-image"
        src={productImages.length > 0 ? productImages[activeImageIndex] : '/images/img-placeholder.webp'}
        alt={productImages.length > 0 ? `Продукт ${productId}` : 'Зображення відсутнє'}
      />
    </div>
  );
};

export default ProductImagesCarousel;
