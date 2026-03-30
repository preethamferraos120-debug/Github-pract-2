import FoodCard from './FoodCard';

function FoodList({ products }) {
  return (
    <section className="results-grid" aria-live="polite">
      {products.map((product, index) => (
        <FoodCard
          key={product?.id || product?._id || product?.code || `${product?.product_name}-${index}`}
          product={product}
        />
      ))}
    </section>
  );
}

export default FoodList;
