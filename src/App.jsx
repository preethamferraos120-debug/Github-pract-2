import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FoodList from './components/FoodList';

const OPEN_FOOD_FACTS_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const encodedQuery = encodeURIComponent(query.trim());
      const response = await fetch(
        `${OPEN_FOOD_FACTS_URL}?search_terms=${encodedQuery}&search_simple=1&action=process&json=1&page_size=24`
      );
      const data = await response.json();

      const validProducts =
        data.products?.filter((product) => product?.product_name?.trim()) ?? [];

      setProducts(validProducts);
    } catch (error) {
      console.error('Error fetching food products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="container">
        <h1>Food Nutrition Search</h1>
        <p className="subtitle">Search products and check nutrition details from Open Food Facts.</p>

        <SearchBar onSearch={handleSearch} />

        {!hasSearched && !loading && (
          <p className="state-message">Start by searching for a food (try: peanut butter).</p>
        )}

        {loading && <p className="state-message">Loading products...</p>}

        {!loading && hasSearched && products.length > 0 && <FoodList products={products} />}

        {!loading && hasSearched && products.length === 0 && (
          <p className="state-message">No matching products found. Try another search term.</p>
        )}
      </div>
    </main>
  );
}

export default App;
