import React from "react";
import "./AdBanner.css";

import carousel1 from "../images/carousel1.gif";
import carousel2 from "../images/carousel2.png";
import carousel3 from "../images/carousel3.jpg";

function AdBanner() {
  return (
    <div
      id="carouselAds"
      className="carousel slide AdBanner"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselAds"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselAds" data-slide-to="1"></li>
        <li data-target="#carouselAds" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <a
            href="https://www.linkedin.com/in/ihechi-festus-5b5121190/"
            target="_blank"
          >
            <img
              className="d-block w-100"
              src={carousel1}
              alt="First Ad"
              title="This link actually leads to my LinkedIn account"
            />
          </a>
        </div>
        <div className="carousel-item">
          <a
            href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fihechifestus9.web.app%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EFestusIhechi&region=follow_link&screen_name=FestusIhechi"
            target="_blank"
          >
            <img
              className="d-block w-100"
              src={carousel2}
              alt="Second Ad"
              title="This link actually leads to my Twitter account"
            />
          </a>
        </div>
        <div className="carousel-item">
          <a href="https://www.jumia.com.ng/" target="_blank">
            <img
              className="d-block w-100"
              src={carousel3}
              alt="Third Ad"
              title="This link actually leads to Jumia's website."
            />
          </a>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselAds"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselAds"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export { AdBanner };
