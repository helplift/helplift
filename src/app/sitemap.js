import productsLifts from '@/data/products-lifts.json';
import productsLighting from '@/data/products-lighting.json';

export default function sitemap() {
  const baseUrl = 'https://helplift.com.ua';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const liftPages = productsLifts.map((product) => ({
    url: `${baseUrl}/products/lifts/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const lightingPages = productsLighting.map((product) => ({
    url: `${baseUrl}/products/lighting/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...liftPages, ...lightingPages];
}
