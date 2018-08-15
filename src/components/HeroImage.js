import React from 'react';

const HeroImage = (props) => (
  <div className="heroImage">
    <div style={{backgroundImage: `url(${props.imageUrl})`}} className="heroImage__hero-image">
      <div className="cont-text">
        <h1>{props.title}</h1>
      </div>
    </div>
  </div>
);

export default HeroImage;
