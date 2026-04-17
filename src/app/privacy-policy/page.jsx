import PrivacyPolicyPage from '@/components/PrivacyPolicyPage';

export const metadata = {
  title: 'Політика конфіденційності',
  description:
    'Політика конфіденційності HelpLift — інформація про збір, обробку та захист персональних даних.',
  keywords: [
    'політика конфіденційності',
    'захист персональних даних',
    'обробка даних',
    'HelpLift',
  ],
  openGraph: {
    title: 'Політика конфіденційності | HelpLift',
    description:
      'Політика конфіденційності HelpLift — інформація про збір, обробку та захист персональних даних.',
    type: 'website',
    url: 'https://helplift.com.ua/privacy-policy',
    siteName: 'HelpLift',
    locale: 'uk_UA',
  },
  twitter: {
    card: 'summary',
    title: 'Політика конфіденційності | HelpLift',
    description:
      'Політика конфіденційності HelpLift — інформація про збір, обробку та захист персональних даних.',
  },
  alternates: {
    canonical: 'https://helplift.com.ua/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
