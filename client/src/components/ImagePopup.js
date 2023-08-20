import React from "react";
import "./ImagePopup.css";

function ImagePopup({ image, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <img
          src={"http://localhost:5000/uploads/" + image.name}
          alt={image.title}
          className="popup-image"
        />
        <p className="popup-title ">Image: {image.name}</p>

        <p className="popup-title ">Title: {image.title}</p>
        <p className="popup-description ">Description: {image.description}</p>
        <p className="popup-keywords">
        Keywords:
          {image.keywords.map((keyword) => (
            <span> {keyword}, </span>
          ))}
        </p>
        <p className="popup-tags">
        Tags:
          {image.tags.map((tag) => (
            <span> {tag}, </span>
          ))}
        </p>
        <p className="popup-upload-date">Upload date: {new Date(image.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
