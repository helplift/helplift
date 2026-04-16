'use client';

import { useAppContext } from '@/context/AppContext';
import ButtonCircle from '@/components/ButtonCircle';

const SkipAnimation = () => {
  const { animationDisabled, setAnimationDisabled } = useAppContext();

  const skipAnimation = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      setAnimationDisabled(true);
      document.body.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
      setTimeout(() => setAnimationDisabled(false), 500);
    }
  };

  return (
    <div className="skip-animation_btns-wrapper">
      <div className="skip-animation_btns">
        <button
          className={`skip-animation_btns_btn btn-up ${animationDisabled ? 'disabled' : ''}`}
          onClick={() => skipAnimation('section-about-us')}
          aria-label="Пропустити анімацію вгору"
        >
          <ButtonCircle backgroundColor="#9f9f9fad" arrowColor="#151517" />
        </button>
        <p className="skip-animation_btns_text">Пропустити анімацію</p>
        <button
          className={`skip-animation_btns_btn btn-down ${animationDisabled ? 'disabled' : ''}`}
          onClick={() => skipAnimation('products-lifts')}
          aria-label="Пропустити анімацію вниз"
        >
          <ButtonCircle backgroundColor="#9f9f9fad" arrowColor="#151517" />
        </button>
      </div>
    </div>
  );
};

export default SkipAnimation;
