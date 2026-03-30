import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search foods (e.g., peanut butter)"
        aria-label="Search foods"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
