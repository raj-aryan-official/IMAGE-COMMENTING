import React from "react";
import "./App.css";
import ImageComment from "./ImageComment";

const App = () => {
  const images = [
    { key: "image1", url: "https://picsum.photos/400/300?random=1" },
    { key: "image2", url: "https://picsum.photos/400/300?random=2" },
    { key: "image3", url: "https://picsum.photos/400/300?random=3" }
  ];

  return (
    <div className="app">
      <header>
        <h1>Image Commenting App</h1>
      </header>
      <main className="image-grid">
        {images.map((image) => (
          <ImageComment 
            key={image.key}
            imageKey={image.key} 
            imageUrl={image.url} 
          />
        ))}
      </main>
    </div>
  );
};

export default App;