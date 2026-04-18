import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/normalize.css';
import '@/styles/App.css';
import '@/styles/HomePage.css';
import '@/styles/ProductPage.css';
import '@/styles/PrivacyPolicyPage.css';
import '@/styles/globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CornerButtons from '@/components/CornerButtons';
import JsonLdOrganization from '@/components/JsonLdOrganization';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://helplift.com.ua'),
  title: {
    default: 'HelpLift — Виробництво підйомників для людей з інвалідністю та вуличного освітлення',
    template: '%s | HelpLift',
  },
  description:
    'HelpLift — український виробник вертикальних електропідйомників для людей з інвалідністю та вуличного LED-освітлення. Індивідуальне виготовлення, сертифікована якість, доставка по всій Україні.',
  keywords: [
    'підйомники для інвалідів',
    'вертикальний підйомник',
    'електропідйомник',
    'підйомник для людей з інвалідністю',
    'вуличне освітлення',
    'LED освітлення',
    'ліхтарний стовп',
    'HelpLift',
    'підйомники Україна',
    'купити підйомник',
    'підйомник для коляски',
    'безбар\'єрність',
    'інклюзивність',
    'підйомник Сарни',
    'підйомник Рівне',
    'освітлення Рівненська область',
    'купити підйомник для інвалідів',
    'підйомник для інвалідного візка',
    'підйомник для маломобільних груп',
    'ціна підйомник для інвалідів',
    'вертикальний платформний підйомник',
    'підйомник для сходів',
    'підйомна платформа для інвалідів',
    'ліфт для інвалідів',
    'підйомник для будинку',
    'підйомник для лікарні',
    'підйомник для школи',
    'безбарʼєрний доступ',
    'інклюзивне середовище',
    'вуличний ліхтар купити',
    'LED ліхтарний стовп',
    'вуличне освітлення Україна',
    'освітлення для парку',
    'виробник підйомників Україна',
    'підйомники від виробника',
    'індивідуальне виготовлення підйомників',
  ],
  authors: [{ name: 'HelpLift' }],
  creator: 'HelpLift',
  publisher: 'HelpLift',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://helplift.com.ua',
    siteName: 'HelpLift',
    title: 'HelpLift — Виробництво підйомників та вуличного освітлення',
    description:
      'Український виробник вертикальних електропідйомників для людей з інвалідністю та вуличного LED-освітлення. Індивідуальне виготовлення, доставка по Україні.',
    images: [
      {
        url: '/images/products/1/101.jpg',
        width: 1200,
        height: 630,
        alt: 'HelpLift — підйомники для людей з інвалідністю',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelpLift — Виробництво підйомників та вуличного освітлення',
    description:
      'Український виробник вертикальних електропідйомників та вуличного LED-освітлення.',
    images: ['/images/products/1/101.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://helplift.com.ua',
  },
  verification: {
    google: 'MlTCBLVUotgj2A9fwVeTXPdxKN20ITV-SShp-jA-sbc',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <JsonLdOrganization />
          <Header />
          <main>{children}</main>
          <ContactForm />
          <CornerButtons />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
