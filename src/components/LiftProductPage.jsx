'use client';

import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import ProductImagesCarousel from '@/components/ProductImagesCarousel';
import ProductDescriptionTabs from '@/components/ProductDescriptionTabs';
import ProductsCarousel from '@/components/ProductsCarousel';
import ProductInfo from '@/components/ProductInfo';
import ProductShippingInfo from '@/components/ProductShippingInfo';
import productsLifts from '@/data/products-lifts.json';

const LiftProductPage = ({ slug }) => {
  const product = productsLifts.find((p) => p.slug === slug);
  const { setHeaderTheme } = useAppContext();

  useEffect(() => {
    setHeaderTheme('light');
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page">
      {product ? (
        <>
          <div className="section-main">
            <ProductImagesCarousel productId={product.id} productImages={product.images} />
            <ProductInfo
              productName={product.name}
              productPrice={product.price}
              productToOrder={product.to_order}
              isLift={true}
            />
          </div>
          <div className="section-secondary">
            <ProductDescriptionTabs product={product} />
            <ProductShippingInfo />
          </div>
          <p className="finish-text">
            З радістю прорахуємо та виконаємо індивідуальне замовлення під вас.
          </p>
          <h2 className="product-carousel-title">Інші підйомники</h2>
          <ProductsCarousel currentProductSlug={slug} productsSectionId="products-lifts" />
        </>
      ) : (
        <div className="product-not-found">
          <p>Товар не знайдено</p>
        </div>
      )}
    </div>
  );
};

export default LiftProductPage;
