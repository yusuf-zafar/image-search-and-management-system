// Tags.js
import React from 'react';

function Tags({ availableTags, selectedTags, handleTagChange }) {
  return (
    <div>
      {availableTags.map((tag) => (
        <label key={tag}>
          <input
            type="checkbox"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          />
          {tag}
        </label>
      ))}
    </div>
  );
}

export default Tags;
