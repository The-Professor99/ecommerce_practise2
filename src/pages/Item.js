import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "react-fetch-hook";

import { DisplayItem, ErrorPage, Spinner, AdBanner } from '@/_components';

import './Item.css'

const dataUrl = 'https://fakestoreapi.com';
function Item() {
  let params = useParams();
  // let itemNo = 10;
  let itemNo = parseInt(params.itemId, 10)

  const { isLoading, data, error } = useFetch(`${dataUrl}/products/${itemNo}`);

  if (error) {
    return (
      <ErrorPage />
      )
  }

  return (
    <>
    <AdBanner />
    <div className='Item'>
    {isLoading ? (
      <Spinner />) : (
      <DisplayItem value={data} />
      )}
    </div>
    </>
  )
}

export { Item }
