import React from 'react';

import noData from '../images/undraw_no_data.svg';
import './NoOrder.css';

function NoOrder() {
  return (
    <div className='NoOrder mt-2 text-center'>
    <img src={noData} alt='No data' />

    <div  className='txt-dark-blue mt-4 text-container'>
        <h3>You have not Completed any order!</h3>
    </div>
    </div>
  )
}

export { NoOrder }