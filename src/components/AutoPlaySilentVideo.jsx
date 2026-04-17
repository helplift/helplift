'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function AutoPlaySilentVideo({ video, videoRef, className, poster }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.load();
    if (videoElement) {
      const handleCanPlayThrough = () => {
        videoElement.play();
        videoElement.pause();
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        setIsLoading(false);
      };

      videoElement.addEventListener('canplaythrough', handleCanPlayThrough);

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
      };
    }
  }, []);

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
