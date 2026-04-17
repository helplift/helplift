'use client';

import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import AboutUsSection from '@/components/AboutUsSection';
import AnimatedSection from '@/components/AnimatedSection';
import ProductsSection from '@/components/ProductsSection';
import ImageTextSection from '@/components/ImageTextSection';

const HomePage = () => {
  const {
    headerTheme,
    setHeaderTheme,
    setAnimationDisabled,
  } = useAppContext();
  const imageTextSectionRef = useRef(null);
  const aboutUsSectionRef = useRef(null);
  const animatedSectionRef = useRef(null);
  const productsSectionRef = useRef(null);

  const toggleHeaderTheme = () => {
    const currentScroll = document.body.scrollTop;
    const aboutUs = aboutUsSectionRef.current;
    const products = productsSectionRef.current;
    const imageText = imageTextSectionRef.current;
    const animated = animatedSectionRef.current;

    if (!aboutUs || !products || !imageText || !animated) return;

    if (headerTheme === 'dark') {
      if (
        (currentScroll >= aboutUs.offsetTop &&
          currentScroll < aboutUs.offsetTop + aboutUs.offsetHeight) ||
        (currentScroll >= products.offsetTop &&
          currentScroll < products.offsetTop + products.offsetHeight)
      ) {
        setHeaderTheme('light');
      }
    }

    if (headerTheme === 'light') {
      if (
        (currentScroll >= imageText.offsetTop &&
          currentScroll < imageText.offsetTop + imageText.offsetHeight) ||
        (currentScroll >= animated.offsetTop &&
          currentScroll < animated.offsetTop + animated.offsetHeight)
      ) {
        setHeaderTheme('dark');
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('scroll', toggleHeaderTheme);
    document.body.addEventListener('wheel', toggleHeaderTheme);

    return () => {
      document.body.removeEventListener('scroll', toggleHeaderTheme);
      document.body.removeEventListener('wheel', toggleHeaderTheme);
    };
  }, [toggleHeaderTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const elementId = window.location.hash.substring(1);
      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          setAnimationDisabled(true);
          document.body.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
          setTimeout(() => setAnimationDisabled(false), 500);
        }
      };
      const timeoutId = setTimeout(scrollToElement, 50);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => setHeaderTheme('dark'), []);

  return (
    <div className="home-page">
      <div ref={imageTextSectionRef}>
        <ImageTextSection />
      </div>
      <div ref={aboutUsSectionRef}>
        <AboutUsSection />
      </div>
      <div ref={animatedSectionRef}>
        <AnimatedSection />
      </div>
      <div ref={productsSectionRef}>
        <ProductsSection title="Підйомники" productsSectionId="products-lifts" />
        <ProductsSection title="Освітлення" productsSectionId="products-lighting" />
      </div>
    </div>
  );
};

export default HomePage;
