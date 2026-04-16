'use client';

import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import ProductImagesCarousel from '@/components/ProductImagesCarousel';
import LightingDescription from '@/components/LightingDescription';
import ProductsCarousel from '@/components/ProductsCarousel';
import ProductInfo from '@/components/ProductInfo';
import ProductShippingInfo from '@/components/ProductShippingInfo';
import productsLighting from '@/data/products-lighting.json';

const LightingProductPage = ({ slug }) => {
  const product = productsLighting.find((p) => p.slug === slug);
  const { setHeaderTheme } = useAppContext();

  useEffect(() => {
    setHeaderTheme('light');
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page lighting-page">
      {product ? (
        <>
          <div className="section-main">
            <ProductImagesCarousel productId={product.id} productImages={product.images} />
            <ProductInfo
              productName={product.name}
              productPrice={product.price}
              productToOrder={product.to_order}
              isLighting={true}
            />
          </div>
          <div className="section-secondary">
            <LightingDescription productDescription={product.description} />
            <ProductShippingInfo />
          </div>
          <p className="finish-text">
            З радістю прорахуємо та виконаємо індивідуальне замовлення під вас.
          </p>
          <h2 className="product-carousel-title">Інше вуличне освітлення</h2>
          <ProductsCarousel currentProductSlug={slug} productsSectionId="products-lighting" />
        </>
      ) : (
        <div className="product-not-found">
          <p>Товар не знайдено</p>
        </div>
      )}
    </div>
  );
};

export default LightingProductPage;
