import React from "react";
import "./imageCarousel.css";


export default function ImageReel({ images }) {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true
  };

  console.log("images:", images);

  return (
    <div>
      <div className="imagesContainer">
        {images.map((item)=> (
          <img className="previewContent" src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  );
}