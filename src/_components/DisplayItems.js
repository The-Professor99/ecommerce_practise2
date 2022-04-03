import React from "react";
import { Link } from "react-router-dom";

import "./DisplayItems.css";

function ellipsify(str, len) {
  if (str.length > len) {
    return str.substring(0, len) + "...";
  } else {
    return str;
  }
}

function DisplayItems(props) {
  return (
    <div className="DisplayItems flex-container">
      <div className="card">
        <img
          className="card-img-top"
          width="110"
          height="150"
          src={props.value.image}
          alt="Produce Image"
        />
        <div className="card-block">
          <h4 className="card-title">{props.value.title.toUpperCase()}</h4>
          <p className="card-text">{props.value.description.toLowerCase()}</p>
          <Link to={`/items/${props.value.id}`} className="btn btn-primary">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export { DisplayItems };
