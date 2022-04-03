import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "react-fetch-hook";

import {
  DisplayItem,
  ErrorPage,
  Spinner,
  AdBanner,
  Alert,
} from "@/_components";

import "./Item.css";

const dataUrl = "https://fakestoreapi.com";
function Item() {
  let params = useParams();
  // let itemNo = 10;
  let itemNo = parseInt(params.itemId, 10);

  const { isLoading, data, error } = useFetch(`${dataUrl}/products/${itemNo}`);

  if (error) {
    return (
      <>
        <AdBanner />
        <Alert />
        <ErrorPage />
      </>
    );
  }

  return (
    <>
      <AdBanner />
      <Alert />
      <div className="Item">
        {isLoading ? <Spinner /> : <DisplayItem value={data} />}
      </div>
    </>
  );
}

export { Item };
