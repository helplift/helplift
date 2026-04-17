export default function JsonLdOrganization() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HelpLift',
    url: 'https://helplift.com.ua',
    logo: 'https://helplift.com.ua/images/logo-black.png',
    description:
      'Український виробник вертикальних електропідйомників для людей з інвалідністю та вуличного LED-освітлення.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Сарни',
      addressRegion: 'Рівненська область',
      addressCountry: 'UA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380507857996',
      contactType: 'sales',
      areaServed: 'UA',
      availableLanguage: 'Ukrainian',
    },
    email: 'helplift@gmail.com',
    sameAs: [
      'https://t.me/+380507857996',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
