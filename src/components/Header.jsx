'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import ButtonCircle from '@/components/ButtonCircle';
import ButtonGradient from '@/components/ButtonGradient';

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const {
    headerTheme,
    setContactFormVisible,
    animationDisabled,
    setAnimationDisabled,
  } = useAppContext();

  const handleClick = (elementId) => {
    if (mobileMenuIsVisible) {
      setMobileMenuIsVisible(false);
    }

    if (elementId) {
      if (pathname !== '/') {
        window.location.href = `/#${elementId}`;
      } else {
        const element = document.getElementById(elementId);
        if (element) {
          setAnimationDisabled(true);
          document.body.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
          setTimeout(() => setAnimationDisabled(false), 500);
        }
      }
    }
  };

  return (
    <header className={`header header--${headerTheme}`}>
      <Link href="/" title="На головну">
        <div className="logo-container">
          <img
            key={headerTheme}
            className="header_logo"
            src={headerTheme === 'light' ? '/images/logo-white.png' : '/images/logo-black.png'}
            alt="HelpLift — виробництво підйомників"
          />
        </div>
      </Link>
      <div className={`header_nav-wrap ${mobileMenuIsVisible ? 'visible' : 'hidden'}`}>
        <div className="header_nav-blur"></div>
        <nav className="header_nav" aria-label="Основна навігація">
          <button
            onClick={() => setMobileMenuIsVisible(false)}
            className="header_nav-close button-gradient"
            aria-label="Закрити меню"
          >
            <ButtonGradient>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8.13065" y1="0.353553" x2="0.352479" y2="8.13173" stroke="#ffffff" />
                <line y1="-0.5" x2="11" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.7771 0)" stroke="#ffffff" />
              </svg>
            </ButtonGradient>
          </button>
          <button
            className={`header_nav_link ${animationDisabled ? 'disabled' : ''}`}
            onClick={() => handleClick('section-about-us')}
          >
            Про нас
            <div className="location-dot" />
          </button>
          <button
            className={`header_nav_link ${animationDisabled ? 'disabled' : ''}`}
            onClick={() => handleClick('products-lifts')}
          >
            Підйомники
            <div className="location-dot" />
          </button>
          <button
            className={`header_nav_link ${animationDisabled ? 'disabled' : ''}`}
            onClick={() => handleClick('products-lighting')}
          >
            Освітлення
            <div className="location-dot" />
          </button>
          <hr id="nav-input-line" className="input-line" />
          <button
            className="header_contact"
            onClick={() => {
              handleClick();
              setContactFormVisible(true);
            }}
          >
            <p className="header_contact_text btn-circle-sibling">
              {"Зв'язатися"}
            </p>
            <ButtonCircle backgroundColor="#ffffff" arrowColor="#151517" />
          </button>
        </nav>
      </div>
      <button
        onClick={() => setMobileMenuIsVisible(true)}
        className="header_nav-toggle button-gradient"
        aria-label="Відкрити меню"
      >
        <ButtonGradient>
          <img className="header_nav-toggle_icon" src="/images/hamburger.svg" alt="" />
        </ButtonGradient>
      </button>
    </header>
  );
};

export default Header;
