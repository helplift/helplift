'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppContext } from '@/context/AppContext';
import throttle from 'lodash.throttle';
import SkipAnimation from '@/components/SkipAnimation';
import AutoPlaySilentVideo from '@/components/AutoPlaySilentVideo';
import ScrollSequenceText from '@/components/ScrollSequenceText';
import { hideAllVisibleText, makeTextVisible } from '@/helpers/animationText';

const ScrollSequenceVideo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mediaQuery = useMediaQuery({
    query: '(max-width: 700px) and (orientation: portrait)',
  });
  const isTabletOrMobileVertical = isMounted && mediaQuery;

  useEffect(() => setIsMounted(true), []);

  const [isForward, setIsForward] = useState(true);
  const isForwardRef = useRef(isForward);
  const [textStage, setTextStage] = useState(-1);
  const textStageRef = useRef(textStage);
  const { animationDisabled, setAnimationDisabled } = useAppContext();
  const animationDisabledRef = useRef(animationDisabled);

  const currentStageRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const forwardVideoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const sectionRef = useRef(null);
  const currentControllerRef = useRef(null);
  const prevScrollRef = useRef(0);

  useEffect(() => {
    animationDisabledRef.current = animationDisabled;
  }, [animationDisabled]);

  const stopPointsForward = [0, 2200, 4300, 6640];
  const stopPointsReverse = [6640, 4300, 2200, 0];
  const totalStages = stopPointsForward.length;

  const scrollPoints = useMemo(() => {
    if (!sectionRef.current) return [];
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionTop = sectionRef.current.offsetTop;
    const stageHeight = (sectionHeight - window.innerHeight) / (totalStages - 1);
    return Array.from({ length: totalStages }, (_, index) => {
      return sectionTop + index * stageHeight;
    });
  }, [sectionRef.current?.offsetHeight, sectionRef.current?.offsetTop]);

  const preventDefault = (e) => {
    e = e || document.body.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  };

  function wheel(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  const scrollTo = (pointY) => {
    document.body.scrollTo(0, pointY);
  };

  function disableScroll(scrollToY) {
    isAnimatingRef.current = true;
    setAnimationDisabled(true);

    currentControllerRef.current = new AbortController();
    const { signal } = currentControllerRef.current;

    document.body.addEventListener('wheel', wheel, { signal, passive: false });
    document.body.addEventListener('mousewheel', wheel, { signal, passive: false });
    document.body.addEventListener('DOMMouseScroll', wheel, { signal, passive: false });
    document.body.addEventListener('touchmove', preventDefault, { signal, passive: false });
    document.addEventListener('mousewheel', wheel, { signal, passive: false });
    document.body.removeEventListener('scroll', handleScroll, { signal, passive: false });

    scrollTo(scrollToY);
    prevScrollRef.current = scrollToY;
    document.body.addEventListener('scroll', () => scrollTo(prevScrollRef.current), {
      signal,
      passive: false,
    });
  }

  function enableScroll() {
    document.body.removeEventListener('wheel', wheel);
    document.body.removeEventListener('mousewheel', wheel);
    document.body.removeEventListener('DOMMouseScroll', wheel);
    document.body.removeEventListener('touchmove', preventDefault);
    if (currentControllerRef.current) {
      currentControllerRef.current.abort();
      currentControllerRef.current = null;
    }
    document.body.addEventListener('scroll', handleScroll, { passive: false });
    setTimeout(() => {
      isAnimatingRef.current = false;
      setAnimationDisabled(false);
    }, 500);
  }

  const stopAnimation = (video) => {
    video.pause();
    enableScroll();
  };

  const animate = (isScrollDown) => {
    const firstStageTopPoint = scrollPoints[0];
    const lastStageTopPoint = scrollPoints[totalStages - 1];
    const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const inSection = currentScroll >= firstStageTopPoint && currentScroll <= lastStageTopPoint;
    if (inSection) {
      disableScroll(scrollPoints[currentStageRef.current]);

      const outOfAnimationUp = currentStageRef.current === 0 && !isScrollDown;
      const outOfAnimationDown = currentStageRef.current === totalStages - 1 && isScrollDown;

      if (outOfAnimationUp || outOfAnimationDown) {
        if (textStageRef.current >= 0 || textStage >= 0) {
          textStageRef.current = -1;
          setTextStage(-1);
          hideAllVisibleText();
        }
        enableScroll();
        return;
      }

      const video = isScrollDown ? forwardVideoRef.current : reverseVideoRef.current;

      if (isForwardRef.current !== isScrollDown) {
        setIsForward((prevIsForward) => {
          isForwardRef.current = !prevIsForward;
          return !prevIsForward;
        });
      }

      const newStage = isScrollDown
        ? currentStageRef.current + 1
        : currentStageRef.current - 1;

      const stopPoints = isScrollDown ? stopPointsForward : stopPointsReverse;
      const stopPointsHiddenVideo = isScrollDown ? stopPointsReverse : stopPointsForward;

      const currentStopPoint = stopPoints[currentStageRef.current];
      const newStopPoint = stopPoints[newStage];
      const newStopPointHiddenVideo = stopPointsHiddenVideo[newStage];

      const stopTimeoutTime = Math.abs(newStopPoint - currentStopPoint);

      const newScrollPoint = scrollPoints[newStage];
      scrollTo(newScrollPoint);
      prevScrollRef.current = newScrollPoint;

      video.play();

      let newTextStage = textStageRef.current;

      if (isScrollDown && currentStageRef.current !== textStageRef.current) {
        newTextStage = currentStageRef.current;
      } else if (!isScrollDown && currentStageRef.current - 1 !== textStageRef.current) {
        newTextStage = currentStageRef.current - 1;
      }

      textStageRef.current = newTextStage;
      setTextStage(newTextStage);
      makeTextVisible(newTextStage);

      const hiddenVideo = isScrollDown ? reverseVideoRef.current : forwardVideoRef.current;
      hiddenVideo.currentTime = newStopPointHiddenVideo / 1000;
      currentStageRef.current = newStage;

      setTimeout(() => {
        stopAnimation(video);
      }, stopTimeoutTime);
    } else {
      if (textStageRef.current >= 0 || textStage >= 0) {
        textStageRef.current = -1;
        setTextStage(-1);
        hideAllVisibleText();
      }

      const shouldResetUp =
        currentScroll <= firstStageTopPoint - window.innerHeight &&
        currentStageRef.current !== 0;

      if (shouldResetUp) {
        currentStageRef.current = 0;
        forwardVideoRef.current.currentTime = stopPointsForward[0];
        setIsForward(true);
        isForwardRef.current = true;
      } else if (
        currentScroll >= lastStageTopPoint &&
        currentStageRef.current !== totalStages - 1
      ) {
        const reverseVideo = reverseVideoRef.current;
        if (reverseVideo) {
          currentStageRef.current = totalStages - 1;
          reverseVideo.currentTime = stopPointsReverse[totalStages - 1];
          setIsForward(false);
          isForwardRef.current = false;
        }
      }
    }
  };

  const handleScroll = throttle(() => {
    const scrollY = document.body.scrollTop;

    const flooredPrevScroll = Math.floor(prevScrollRef.current);
    if (
      flooredPrevScroll === scrollY ||
      isAnimatingRef.current ||
      animationDisabledRef.current
    ) {
      prevScrollRef.current = scrollY;
      return;
    }

    const isScrollDown = flooredPrevScroll < scrollY;
    prevScrollRef.current = scrollY;
    animate(isScrollDown);
  }, 200);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.body.addEventListener('scroll', handleScroll, { passive: false });
      document.body.addEventListener('wheel', handleScroll, { passive: false });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      document.body.removeEventListener('scroll', handleScroll, { passive: false });
      document.body.removeEventListener('wheel', handleScroll, { passive: false });
    };
  }, [scrollPoints]);

  return (
    <div className="png__sequence" ref={sectionRef}>
      <div className="wrapper">
        <div className="wrapper-relative">
          <AutoPlaySilentVideo
            video={isTabletOrMobileVertical ? '/videos/video-original-mob.mp4' : '/videos/video-original.mp4'}
            videoRef={forwardVideoRef}
            className={`png__sequence__video ${isForward ? 'visible' : 'hidden'}`}
            poster={isTabletOrMobileVertical ? '/images/poster-original-mob.webp' : '/images/poster-original.jpg'}
          />
          <AutoPlaySilentVideo
            video={isTabletOrMobileVertical ? '/videos/video-reverse-mob.mp4' : '/videos/video-reverse.mp4'}
            videoRef={reverseVideoRef}
            className={`png__sequence__video ${isForward ? 'hidden' : 'visible'}`}
            poster={isTabletOrMobileVertical ? '/images/poster-reverse-mob.webp' : '/images/poster-reverse.jpg'}
          />
          <SkipAnimation stopAnimation={stopAnimation} />
          <ScrollSequenceText />
        </div>
      </div>
    </div>
  );
};

export default ScrollSequenceVideo;
