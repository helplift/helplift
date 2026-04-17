'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function AutoPlaySilentVideo({ video, videoRef, className, poster }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoading(true);
    videoElement.load();

    const handleCanPlayThrough = () => {
      videoElement.play().then(() => {
        videoElement.pause();
      }).catch(() => {
        // Autoplay blocked on mobile — continue without pre-playing
      });
      videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      setIsLoading(false);
    };

    videoElement.addEventListener('canplaythrough', handleCanPlayThrough);

    // Fallback: if canplaythrough never fires (mobile), stop loading after 5s
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(fallbackTimeout);
      if (videoElement) {
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, [video]);

  return (
    <>
      {isLoading && <Loader style={{ zIndex: 50 }} />}
      <video className={className} ref={videoRef} muted playsInline poster={poster}>
        <source src={video} type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
    </>
  );
}
