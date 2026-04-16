import t from '@/data/text-content.json';

const AboutUsSection = () => {
  return (
    <section className="section-about-us" id="section-about-us" aria-label="Про нас">
      <div className="section-about-us_content">
        <h2 className="section-about-us_content_title">{t['about-us']['heading']}</h2>
        <p className="section-about-us_content_text">{t['about-us']['text-1']}</p>
        <p className="section-about-us_content_text">{t['about-us']['text-2']}</p>
        <p className="section-about-us_content_text">{t['about-us']['text-3']}</p>
        <p className="section-about-us_content_text">{t['about-us']['text-4']}</p>
      </div>
    </section>
  );
};

export default AboutUsSection;
