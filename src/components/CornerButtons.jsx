'use client';

import { useEffect, useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import IconBigArrow from '@/components/IconBigArrow';

const CornerButtons = () => {
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  const tgLink = 'tg://resolve?domain=+380507857996';
  const fallbackTgLink = 'https://t.me/+380507857996';

  const handleTgClick = () => {
    window.location.href = tgLink;
    setTimeout(() => {
      window.location.href = fallbackTgLink;
    }, 1000);
  };

  useEffect(() => {
    const offset = 50;
    const handleScroll = () => {
      const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
      setAreButtonsVisible(currentScroll > offset);
    };

    document.body.addEventListener('scroll', handleScroll);
    return () => document.body.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`corner-btns ${areButtonsVisible ? 'btns-visible' : 'btns-hidden'}`}
    >
      <IconBigArrow className="corner-btns_big-arrow" />
      <div className="corner-btns_all">
        <a
          href="viber://chat/?number=%2B380507857996"
          className="corner-btns_btn corner-btns_btn--viber"
          title="Viber"
          aria-label="Написати у Viber"
        />
        <button
          onClick={handleTgClick}
          className="corner-btns_btn corner-btns_btn--telegram"
          title="Telegram"
          aria-label="Написати у Telegram"
        />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default CornerButtons;
