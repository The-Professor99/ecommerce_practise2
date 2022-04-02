import React from 'react';

import { InProgress } from '@/_components';
import { useStateValue } from '@/_helpers';

import './UserOrders.css';
import { DisplayOrders } from '@/_components';

function UserOrders() {
  const [{ user }] = useStateValue();
  console.log(user.orders, 'orders11')
  return (
    false ? (
      <>
      <h3 className='txt-dark-blue'>Completed Orders</h3>
      <DisplayOrders  />
      </>
    ) 
    : (
    <InProgress />
    )
  )
}

export { UserOrders }