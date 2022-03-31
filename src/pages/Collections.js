import { Link, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import useFetch from "react-fetch-hook";

import { InputBar, SelectBar, DisplayItems, ErrorPage, Spinner, AdBanner } from '@/_components';

import './Collections.css';

const dataUrl = 'https://fakestoreapi.com';



function Collections() {
    const { isLoading, data, error } = useFetch(`${dataUrl}/products`);
    let [searchParams, setSearchParams] = useSearchParams();

    if (error) {
      return (
        <ErrorPage />
      )
    }
    return (
        <>
        <AdBanner />
        <h2 className='txt-dark-blue'>All Collections</h2>
        <div className='search-bar input-group'>
          <InputBar />
          <SelectBar />
        </div>
        <div className='data-container' >
        {isLoading ? ( 
        <Spinner />) : 
          (data
          .filter((item) => {
            let filter = searchParams.get("filter");
            let category = searchParams.get("category");
            if (category == 'all') {
              category = null;
            }
            if (!filter && !category) return true;
            let title = item.title.toLowerCase();
            let cate = item.category.toLowerCase();
            if (!filter) {
              return cate == category;
            } else if (!category) {
              return title.startsWith(filter.toLowerCase())
            }
            return title.startsWith(filter.toLowerCase()) && cate == category ;
          }).map((item) => (
            <DisplayItems key={item.id} value={item}/>
            )))}
        </div>
        </>
    )
}


export { Collections };