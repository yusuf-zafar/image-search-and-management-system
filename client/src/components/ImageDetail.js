
import React from 'react';

function ImageDetail({ image }) {
  return (
    <div>
       <img src={ 'http://localhost:5000/uploads/' + image.name} alt={image.title} />
      <h2>{image.title}</h2>
      <p>{image.description}</p>
    </div>
  );
}

export default ImageDetail;
