const FALLBACK_IMAGE = 'https://via.placeholder.com/120?text=No+Image';

function FoodCard({ product }) {
  const nutrition = product?.nutriments;

  return (
    <article className="food-card">
      <img
        src={product?.image_front_small_url || product?.image_small_url || FALLBACK_IMAGE}
        alt={product?.product_name || 'Food product'}
      />
      <div>
        <h2>{product?.product_name || 'Unnamed product'}</h2>
        <p className="brand">Brand: {product?.brands || 'Unknown'}</p>

        <ul>
          <li>Calories: {nutrition?.['energy-kcal_100g'] ?? 'N/A'} kcal / 100g</li>
          <li>Protein: {nutrition?.proteins_100g ?? 'N/A'} g / 100g</li>
          <li>Fat: {nutrition?.fat_100g ?? 'N/A'} g / 100g</li>
          <li>Carbs: {nutrition?.carbohydrates_100g ?? 'N/A'} g / 100g</li>
        </ul>
      </div>
    </article>
  );
}

export default FoodCard;
