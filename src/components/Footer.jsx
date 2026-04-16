import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_top">
        <img className="footer_logo" src="/images/logo-black.png" alt="HelpLift логотип" />
        <div className="footer_contacts">
          <div className="footer_contacts_item">
            <img src="/images/phone-call.svg" alt="" aria-hidden="true" />
            <h6>Телефон</h6>
            <p className="footer_contacts_item_phone font-grotesque">
              <a href="tel:+380507857996" style={{ color: 'inherit', textDecoration: 'none' }}>
                +380 (50) 785 79 96
              </a>
            </p>
          </div>
          <div className="footer_contacts_item">
            <img src="/images/envelope.svg" alt="" aria-hidden="true" />
            <h6>Email</h6>
            <p>
              <a href="mailto:helplift@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                helplift@gmail.com
              </a>
            </p>
          </div>
          <div className="footer_contacts_item">
            <img src="/images/marker.svg" alt="" aria-hidden="true" />
            <h6>Адреса</h6>
            <p>Україна, Рівненська область, м. Сарни</p>
          </div>
        </div>
      </div>
      <hr className="input-line" />
      <div className="footer_bottom">
        <Link href="/privacy-policy" className="footer_bottom_text">
          Політика Конфіденційності
        </Link>
        <p className="footer_bottom_text">
          @<span className="font-grotesque">2025 </span>
          Helplift. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
