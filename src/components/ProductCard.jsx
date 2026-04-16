'use client';

import { useState } from 'react';
import Link from 'next/link';
import ButtonCircle from '@/components/ButtonCircle';

const ProductCard = ({ product, route }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const image = product.images[0] || '/images/img-placeholder.webp';

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCirclePosition({ x: offsetX, y: offsetY });
  };

  return (
    <Link className="product-card-link" href={`${route}${product.slug}`}>
      <article
        className={`product-card ${isHovered ? 'hovered' : ''} btn-circle-parent`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <h3 className="product-card_title">{product.name}</h3>
        <img
          className="product-card_img"
          src={image}
          alt={product.name}
          loading="lazy"
        />
        <ButtonCircle
          backgroundColor="transparent"
          arrowColor="#ffffff"
          arrowColorHover="#151517"
          isHovered={isHovered}
          isLong={true}
        />
        {isHovered && (
          <div
            className="hover-circle"
            style={{ left: circlePosition.x, top: circlePosition.y }}
          />
        )}
      </article>
    </Link>
  );
};

export default ProductCard;
