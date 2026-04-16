'use client';

import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const ScrollToTop = () => {
  const { animationDisabled, setAnimationDisabled } = useAppContext();

  const setupProgress = () => {
    const progressPath = document.querySelector('.progress-wrap path');
    if (!progressPath) return;
    const pathLength = progressPath.getTotalLength();
    const { style } = progressPath;

    const updateProgress = () => {
      const scroll = document.body.scrollTop;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      style.strokeDashoffset = progress;
    };

    style.transition = style.WebkitTransition = 'none';
    style.strokeDasharray = pathLength + ' ' + pathLength;
    style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    style.transition = style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    updateProgress();
    document.body.addEventListener('scroll', updateProgress);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnimationDisabled(true);
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setAnimationDisabled(false), 500);
  };

  useEffect(() => setupProgress(), []);

  return (
    <button
      className={`progress-wrap ${animationDisabled ? 'disabled' : ''}`}
      title="Нагору"
      onClick={handleClick}
      aria-label="Прокрутити нагору"
    >
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
