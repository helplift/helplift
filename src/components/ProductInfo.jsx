'use client';

import { useAppContext } from '@/context/AppContext';
import ButtonCircle from '@/components/ButtonCircle';
import LiftsCharacteristics from '@/components/LiftsCharacteristics';
import LightingCharacteristics from '@/components/LightingCharacteristics';

const ProductInfo = ({ productName, productPrice, productToOrder, isLift, isLighting }) => {
  const { setContactFormVisible } = useAppContext();

  return (
    <div className="product-info">
      <h1 className="product-name">{productName}</h1>
      <div className="product-price-wrapper">
        <p className="product-price">
          від <span className="font-grotesque">{productPrice}</span> ₴
        </p>
        {productToOrder && (
          <div className="product-to-order">
            <img src="/images/check.svg" className="check-icon" alt="" aria-hidden="true" />
            <p>Під замовлення</p>
          </div>
        )}
      </div>
      <hr className="input-line input-line--top" />
      {isLift && <LiftsCharacteristics />}
      {isLighting && <LightingCharacteristics />}
      <hr className="input-line input-line--bottom" />
      <button className="btn-order" onClick={() => setContactFormVisible(true)}>
        <p className="btn-order btn-circle-sibling">Замовити</p>
        <ButtonCircle />
      </button>
    </div>
  );
};

export default ProductInfo;
