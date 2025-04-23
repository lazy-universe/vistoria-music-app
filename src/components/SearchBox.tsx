import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500); // 500ms debounce

  useEffect(() => {
    if (debouncedInput.trim()) {
      onSearch(debouncedInput.trim());
    }
  }, [debouncedInput]);

  return (
    <div style={{ margin: '1rem' }}>
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default SearchBox;