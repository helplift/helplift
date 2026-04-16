'use client';

import { useState, useEffect, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import Loader from '@/components/Loader';

const ImageTextSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackImage, setFallbackImage] = useState('/images/scene.png');
  const [isMounted, setIsMounted] = useState(false);

  const isTabletHorizontal = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)',
  });
  const isTabletVertical = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)',
  });
  const isMobHorizontal = useMediaQuery({
    query: '(max-width: 767px) and (orientation: landscape)',
  });
  const isMobVertical = useMediaQuery({
    query: '(max-width: 767px) and (orientation: portrait)',
  });

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    if (isTabletHorizontal) {
      setFallbackImage('/images/scene-tablet-horizontal.png');
    } else if (isTabletVertical) {
      setFallbackImage('/images/scene-tablet-vertical.png');
    } else if (isMobHorizontal) {
      setFallbackImage('/images/scene-mob-horizontal.png');
    } else if (isMobVertical) {
      setFallbackImage('/images/scene-mob-vertical.png');
    } else {
      setFallbackImage('/images/scene.png');
    }
    setIsLoading(false);
  }, [isMounted, isTabletHorizontal, isTabletVertical, isMobHorizontal, isMobVertical]);

  return (
    <section className="section-image-text" aria-label="Головний банер">
      {isLoading ? (
        <Loader />
      ) : (
        <img
          src={fallbackImage}
          className="section-image-text_bg-img"
          alt="Підйомник HelpLift для людей з інвалідністю"
          loading="eager"
        />
      )}
      <div className="section-image-text_content">
        <h1 className="section-image-text_content_title">
          Виробництво підйомників
        </h1>
        <p className="section-image-text_content_subtitle">
          для людей з інвалідністю <br /> та вуличного освітлення
        </p>
      </div>
    </section>
  );
};

export default memo(ImageTextSection);
