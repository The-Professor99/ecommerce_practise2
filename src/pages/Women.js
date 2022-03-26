import { Link, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import useFetch from "react-fetch-hook";

import { InputBar, DisplayItems, ErrorPage, Spinner } from '@/_components';

import './Women.css';

const dataUrl = 'https://fakestoreapi.com';



function Women() {
    const { isLoading, data, error } = useFetch(`${dataUrl}/products/category/women's clothing`);
    let [searchParams, setSearchParams] = useSearchParams();
    // const myRef = useRef(null)
    // const executeScroll = () => myRef.current.scrollIntoView()    
   
  
    // useEffect(() => {
    //   executeScroll();
    // });
    
    if (error) {
      return (
        <ErrorPage />
      )
    }
    
    return (
        <>
        <h2 className='txt-dark-blue'>Women's Clothing</h2>
        <div className='search-bar'>
          <InputBar />
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


export { Women };