'use client';

import { useRef } from 'react';
import { usePathname, useParams } from 'next/navigation';
import ButtonCircle from '@/components/ButtonCircle';
import ProductCard from '@/components/ProductCard';
import productsLifts from '@/data/products-lifts.json';
import productsLighting from '@/data/products-lighting.json';

const ProductsCarousel = ({ currentProductSlug, productsSectionId }) => {
  const carouselRef = useRef(null);
  const pathname = usePathname();
  const params = useParams();

  const isLifts = productsSectionId === 'products-lifts';
  const route = isLifts ? '/products/lifts/' : '/products/lighting/';
  const isProductPage = pathname.startsWith(route) && params?.slug;
  const products = isLifts ? productsLifts : productsLighting;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="product-carousel-wrapper">
      <button className="carousel-button left" onClick={scrollLeft} aria-label="Попередній">
        <ButtonCircle />
      </button>
      <div className="product-carousel" ref={carouselRef}>
        <div className="product-card-placeholder"> </div>
        {products.map(
          (product) =>
            currentProductSlug !== product.slug && (
              <ProductCard
                key={product.id}
                product={product}
                route={route}
                isProductPage={isProductPage}
              />
            )
        )}
      </div>
      <button className="carousel-button right" onClick={scrollRight} aria-label="Наступний">
        <ButtonCircle />
      </button>
    </div>
  );
};

export default ProductsCarousel;
