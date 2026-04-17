import { notFound } from 'next/navigation';
import productsLifts from '@/data/products-lifts.json';
import LiftProductPage from '@/components/LiftProductPage';

export async function generateStaticParams() {
  return productsLifts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productsLifts.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Товар не знайдено', robots: { index: false } };
  }

  const description = product.description[0]?.substring(0, 160) + '...';
  const canonicalUrl = `https://helplift.com.ua/products/lifts/${product.slug}`;

  return {
    title: `${product.name} — купити підйомник для інвалідів`,
    description,
    keywords: [
      product.name,
      'підйомник для інвалідів',
      'вертикальний підйомник',
      'купити підйомник',
      'підйомник ціна',
      'HelpLift',
    ],
    openGraph: {
      title: `${product.name} | HelpLift`,
      description,
      url: canonicalUrl,
      locale: 'uk_UA',
      siteName: 'HelpLift',
      images: product.images[0]
        ? [{ url: product.images[0], width: 1200, height: 630, alt: product.name }]
        : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | HelpLift`,
      description,
      images: product.images[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = productsLifts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://helplift.com.ua' },
              { '@type': 'ListItem', position: 2, name: 'Підйомники', item: 'https://helplift.com.ua/' },
              { '@type': 'ListItem', position: 3, name: product.name },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description[0],
            image: product.images.map(
              (img) => `https://helplift.com.ua${img}`
            ),
            brand: {
              '@type': 'Brand',
              name: 'HelpLift',
            },
            manufacturer: {
              '@type': 'Organization',
              name: 'HelpLift',
              url: 'https://helplift.com.ua',
            },
            offers: {
              '@type': 'Offer',
              url: `https://helplift.com.ua/products/lifts/${product.slug}`,
              priceCurrency: 'UAH',
              price: product.price.replace(/\s/g, ''),
              priceValidUntil: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              )
                .toISOString()
                .split('T')[0],
              availability: 'https://schema.org/PreOrder',
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'HelpLift',
              },
            },
            countryOfOrigin: {
              '@type': 'Country',
              name: 'Україна',
            },
          }),
        }}
      />
      <LiftProductPage slug={slug} />
    </>
  );
}
