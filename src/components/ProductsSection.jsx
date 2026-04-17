import ProductsCarousel from '@/components/ProductsCarousel';

const ProductsSection = ({ title, productsSectionId }) => {
  return (
    <section className="section-products" id={productsSectionId} aria-label={title}>
      <h2 className="section-products_title">{title}</h2>
      <ProductsCarousel productsSectionId={productsSectionId} />
    </section>
  );
};

export default ProductsSection;
